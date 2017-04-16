import React from 'react';
import { hashHistory } from 'react-router';
import { Button, NavBar, WhiteSpace, Flex, WingBlank, Icon, Tag, Switch } from 'antd-mobile';
import './Main.css';

const HOST = 'http://139.199.229.97:8000';

const PositiveUrl = `${HOST}/api/problems/?sortby=create_time&polarity=positive`;
const NegativeUrl = `${HOST}/api/problems/?sortby=create_time&polarity=negative`;

const ProblemsUrl = `${HOST}/api/problems/?sortby=create_time&polarity=positive`;
const VoteUrl = function(id) {
  return `${HOST}/api/problems/${id}/votes/`;
}

const Request = function(url, method) {
  return fetch(url, {method: method}).then(res => {
    if (res.status >= 400) {
      throw('');
    } else {
      return res.json();
    }
  });
}

function toDateFomat(timestamp) {
  function formatNumber(number) {
      return number< 10 ? '0' + number : number;
  }
  const date = new Date(timestamp);
  const m = formatNumber(date.getMonth() + 1),
    d = formatNumber(date.getDate()),
    h = formatNumber(date.getHours()),
    min = formatNumber(date.getMinutes());
  
  return `${m}-${d} ${h}:${min}`;
}
export default class Main extends React.Component{
  constructor(props, context) {
    super(props, context);
    this.state = {
      type: false
    }
    this.initState(PositiveUrl);
  }
  initState(url) {
    Request(url, 'Get').then(data => {
      /*
      this.state = {
        commentList: data.data
      };
      */
      this.setState({
        commentList: data.data
      })
      this.updateCommentList(data.data);
      console.log(this.state);
    }).catch(err => {
      console.log(err);
    });
  }
  changeType(flag) {
    this.setState({
      type: flag
    });
    if (flag) {
      this.initState(NegativeUrl);
    } else {
      this.initState(PositiveUrl);
    }
  }
  updateCommentList(list) {
    this.refs.CommentList.update(list);
  }
  render() {
    const history=hashHistory;
    const {commentList} = this.state;
    return (
      <div style={{minHeight:480}}>
        <NavBar mode="light" iconName={false}>我的社区
          <div className="float-right">
            <Switch checked={this.state.type} onChange={this.changeType.bind(this)}/>
          </div>
        </NavBar>
        
        <WhiteSpace size="lg"/>
        <WingBlank>
          <CommentList ref='CommentList' commentlist={commentList} ></CommentList>
        </WingBlank>        

      </div>
    );
  }
}


export class CommentList extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      list: this.props.commentlist || []
    }
  }
  update(list) {
    this.setState({
      list
    });
  }
  render() {
    const comments = [];
    const {list} = this.state;
    for (var i = 0; i < list.length; i++) {
      comments.push(<Comment commentDetail={list[i]}></Comment>);
    }
    return (
      <div className="comment-list">
        {comments}
      </div>
    );
  }
}


export class CommentImg extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      imgs: this.props.pictures || []
    }
  }
  render() {
    const length = this.state.imgs.length;
    console.log(length);
    const imgs = this.state.imgs.map(img => {
      return <img src={img} alt=""/>
    });
    switch(length) {
      case 1:
       return (
         <div className="comment-img">{imgs}</div>
       );
      case 2:
        return (
          <div className="comment-img two">{imgs}</div>
        );
      case 3:
        return (
          <div className="comment-img three">{imgs}</div>
        );
      case 4:
        return (
          <div className="comment-img four">{imgs}</div>
        );
      default:
        return (
          <div></div>
        );
    }
  }
}

export class Replys extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      replys: this.props.replys || []
    }
  }
  update(replys) {
    this.setState({
      replys: replys
    });
  }
  render() {
    const replys = this.state.replys.map(item => {
      return (
        <div className="reply">
          <div className="user">
            <img src={item.author.headimgurl} alt="" className="avatar"/>
            {item.author.nickname}:&nbsp;
          </div>
          <div className="message">{item.content}</div>
        </div>
      );
    });
    return (
      <div className="replys">
        {replys}
      </div>
    );
  }
}

export class Comment extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      detail: this.props.commentDetail || {}
    }
  }
  update(detail) {

  }
  vote() {
    const {id, has_voted} = this.state.detail;
    if (has_voted) {
      Request(VoteUrl(id), 'Delete').then(res => {
        const detail = this.state.detail;
        detail.vote_count--;
        detail.has_voted = false;
        this.setState({
          detail
        })
      }).catch(err => {
        
      });
    } else {
      Request(VoteUrl(id), 'Post').then(res => {
        const detail = this.state.detail;
        detail.vote_count++;
        detail.has_voted = true;
        this.setState({
          detail
        })
      }).catch(err => {
        
      });
    }
    
  }
  routeToDetail(id) {
    const url = `detail/${id}`
    hashHistory.push(url);
  }
  render() {
    const {author, comments_preview, has_voted, id, content, comment_count, location, pictures, publish_time, title, topics, vote_count} = this.state.detail;
    const time = toDateFomat((publish_time+8 * 3600) * 1000);
    const tags = topics.map(item => {
      return (
        <Tag className="tag red float-right mr1">{item}</Tag>
      );
    });
    return (
      <div className="comment">
        <Flex
          align="start"
        >
          <Flex.Item className="username">
            <img className="avatar" src={author.headimgurl} alt=""/>
            {author.nickname}
          </Flex.Item>
            
          <Flex.Item className="time">
            <i className="fa fa-clock-o"></i> {time}
          </Flex.Item>
        </Flex>
        <CommentImg pictures={pictures}></CommentImg>
        <div className="title">{title} {tags}</div>
        <div className="content" onTouchStart={this.routeToDetail.bind(this, id)}>{content}</div>
        <div className="location"><i className="fa fa-location-arrow mr1 font gray"></i>{location.address}</div>
        <Replys replys={comments_preview}></Replys>
        <div className="foot-button">
          <div className="vote" onTouchEnd={this.vote.bind(this)}>
            <i className={"fa fa-thumbs-up icon font " + (has_voted ? "green" : "gray")}></i>{vote_count}
          </div>
          <div className="messages">
            <i className="fa fa-comment icon font gray"></i>{comment_count}
          </div>
        </div>
      </div>
      
    );
  }
}


