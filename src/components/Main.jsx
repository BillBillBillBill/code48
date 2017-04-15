import React from 'react';
import { hashHistory } from 'react-router';
import { Button, NavBar, WhiteSpace, Flex, WingBlank, Icon, Tag, Switch } from 'antd-mobile';
import './Main.css';


import { List } from 'antd-mobile';

const Item = List.Item;
const Brief = Item.Brief;

export default class Main extends React.Component{
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
          <CommentList></CommentList>
        </WingBlank>        

      </div>
    );
  }
}


class CommentList extends React.Component {
  render() {
    const count = 3;
    return (
      <div>
        <Comment></Comment>
        <Comment></Comment>
        <Comment></Comment>
        <Comment></Comment>
      </div>
    );
  }
}

class Comment extends React.Component {
  render() {
    return (
      <div className="comment">
        <Flex
          align="start"
        >
          <Flex.Item className="username">
            <img className="avatar" src="http://happy960.oss-cn-shenzhen.aliyuncs.com/bb934ed95d384b40b07cde3a4fca850e.JPEG?x-oss-process=image/resize,w_100" alt=""/>
            手机用户xxx
          </Flex.Item>
            
          <Flex.Item className="time">
            <i className="fa fa-clock-o"></i> 04-02 17:58
          </Flex.Item>
        </Flex>
        <div className="comment-img">
          <img src="http://happy960.oss-cn-shenzhen.aliyuncs.com/00c47e17a62d422a84dd9764610b8230.JPEG?x-oss-process=image/resize,w_800" alt=""/>
        </div>
        <div className="title">潭村马场路 <Tag className="tag red">美食</Tag></div>
        <div className="content">广州雾霾很严重哦</div>
        <div className="location"><i className="fa fa-location-arrow mr1 font gray"></i>广州番禺</div>
        <div className="replys">
          <div className="reply">
            <div className="user">
              <img src="http://happy960.oss-cn-shenzhen.aliyuncs.com/00c47e17a62d422a84dd9764610b8230.JPEG?x-oss-process=image/resize,w_800" alt="" className="avatar"/>
              1345678
            </div>
            <div className="message">: 为啥？</div>
          </div>
          <div className="reply">
            <div className="user">
              <img src="http://happy960.oss-cn-shenzhen.aliyuncs.com/00c47e17a62d422a84dd9764610b8230.JPEG?x-oss-process=image/resize,w_800" alt="" className="avatar"/>
              1345678
            </div>
            <div className="message">: 为啥？</div>
          </div>
        </div>
        <div className="foot-button">
          <div className="vote">
            <i className="fa fa-thumbs-up icon font green"></i>4
          </div>
          <div className="messages">
            <i className="fa fa-comment icon font gray"></i>5
          </div>
        </div>
      </div>
      
    );
  }
}
