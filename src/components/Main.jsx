import React from 'react';
import { hashHistory } from 'react-router';
import { Button, NavBar, WhiteSpace, Flex, WingBlank, Icon, Tag, Switch } from 'antd-mobile';
import './Main.css';

const HOST = 'http://139.199.229.97:8000';
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
    this.initState();
  }
  initState() {
    fetch(ProblemsUrl).then(res => {
      res.json().then(data => {
        this.state = {
          commentList: data.data
        };
        this.updateCommentList(data.data);
        console.log(this.state);
      });
    })
    .catch(err => {
      console.log(err);
    });
  }
  updateCommentList(list) {
    this.refs.CommentList.update(list);
  }
  render() {
    const history=hashHistory;
    return (
      <div style={{minHeight:480}}>
        <NavBar mode="light" iconName={false}>我的社区
          <div className="float-right">
            <Switch defaultChecked={true} />
          </div>
        </NavBar>
        
        <WhiteSpace size="lg"/>
        <WingBlank>
          <CommentList ref='CommentList' commentlist={this.commentList} ></CommentList>
        </WingBlank>        

      </div>
    );
  }
}


class CommentList extends React.Component {
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
    for (var i = 0; i < this.state.list.length; i++) {
      comments.push(<Comment commentDetail={this.state.list[i]}></Comment>);
    }
    return (
      <div className="comment-list">
        {comments}
      </div>
    );
  }
}


class CommentImg extends React.Component {
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

class Comment extends React.Component {
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
  render() {
    const {author, comments_preview, has_voted, id, content, comment_count, location, pictures, publish_time, title, topics, vote_count} = this.state.detail;
    const time = toDateFomat((publish_time+8 * 3600) * 1000);
    const replys = comments_preview.map(item => {
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
        <div className="content">{content}</div>
        <div className="location"><i className="fa fa-location-arrow mr1 font gray"></i>{location.address}</div>
        <div className="replys">
          {replys}
        </div>
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
