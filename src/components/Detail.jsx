import React from 'react';
import { hashHistory } from 'react-router';
import { Button, NavBar, WhiteSpace, Flex, WingBlank, Icon, Tag, Switch } from 'antd-mobile';
import './Main.css';

const HOST = 'http://139.199.229.97:8000';
const ProblemUrl =  function(problemId) {
  return `${HOST}/api/problems/${problemId}`;
};
const CommentsUrl = function(problemId) {
  return `${HOST}/api/problems/${problemId}/comments`;
}
const VoteUrl = function(problemId) {
  return `${HOST}/api/problems/${problemId}/votes/`;
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

class Problem extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      topics: this.props.topics || [],
      author: this.props.author || {},
      name: this.props.author ? this.props.author.nickname : '',
      publish_time: this.props.publish_time || '',
      title: this.props.title || '',
      content: this.props.content || '',
      address: this.props.location ? this.props.location.address: '',
      pictures: this.props.pictures || [],
    }
  }
  update(data) {
    const problemInfo = Object.assign({}, data);
    this.setState({
      topics: problemInfo.topics || [],
      author: problemInfo.author || {},
      name: problemInfo.author ? problemInfo.author.nickname: '',
      publish_time: problemInfo.publish_time || '',
      title: problemInfo.title || '',
      content: problemInfo.content || '',
      address: problemInfo.location ? problemInfo.location.address: '',
      pictures: problemInfo.pictures || [],
    });
  }
  render() {
    const {topics, author, name, pictures, publish_time, title, content, address} = this.state;
    const time = toDateFomat(publish_time);
    const tags = topics.map(item => {
      return (
        <Tag className="tag red float-right mr1">{item}</Tag>
      );
    });
    
    const imgs = pictures.map(picture => {
      return (
        <CommentImg pictures={[picture]}></CommentImg>
      );
    });
    
    return (
      <div className="problem">
        <Flex
          align="start"
        >
          <Flex.Item className="username">
            <img className="avatar" src={author.headimgurl} alt=""/>
            <span> {name} </span>
          </Flex.Item>
            
          <Flex.Item className="time">
            <i className="fa fa-clock-o"></i> {time}
          </Flex.Item>
        </Flex>
        {imgs}
        <div className="title"> {title} {tags} </div>
        <div className="content"> {content} </div>
        <div className="location"><i className="fa fa-location-arrow mr1 font gray"></i> {address} </div>
      </div>
    );
  }
}

export default class Main extends React.Component{
  constructor(props, context) {
    super(props, context);
    const id = this.props.routeParams.id;
    this.state = {
      id: id
    };    
    this.initState();
  }
  initState() {
    const problemId = this.state.id;
    console.log(this.state);
    const pPromise = Request(ProblemUrl(problemId), 'Get');
    const cPromise = Request(CommentsUrl(problemId), 'Get');
    Promise.all([pPromise, cPromise]).then(res => {
      this.update(res[0].data, res[1].data);
    }).catch(err => {

    });
  }
  update(problemInfo, replysInfo) {
    this.refs.Problem.update(problemInfo);
    this.refs.Replys.update(replysInfo);
  }
  render() {
    const {topics, author, pictures, publish_time, title, content, location} = this.state.problemInfo || {};
    const replysInfo = this.state.replysInfo || [];
    return (
      <div className="comment">
        <Problem
          ref='Problem'
          topics={topics}
          author={author}
          pictures={pictures}
          publish_time={publish_time}
          title={title}
          content={content}
          location={location}
          ></Problem>
        <Replys ref='Replys' replys={replysInfo}></Replys>
      </div>
    );
  }
}