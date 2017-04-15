import React from 'react';
import { hashHistory } from 'react-router';
import { Button, NavBar, WhiteSpace } from 'antd-mobile';
import { Accordion, List, Tabs } from 'antd-mobile';


const TabPane = Tabs.TabPane;


export default class User extends React.Component{
  constructor(props){
    super(props);
    this.state={
      current: 'User',
    };
  }
  render() {
    const history = hashHistory;
    return (
      <div style={{minHeight:480}}>
        <NavBar mode="light" onLeftClick={() => history.push("/")}>用户界面</NavBar>
        <div style={{ width: '60%', float: "left" }}>
          <p>用户名</p>
          <p><i className="fa fa-map-marker mr1 font gray"></i>地址位置</p>
        </div>
        <div style={{ width: '40%', float: "right" }}>
          <img style={{ float: "right", width: '5em', height: '5em' }} src="https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg"></img>
        </div>
        <hr/>
        <div className="am-tabs am-tabs-top">
        <div className="am-tabs-bar">
          <div className="am-tabs-tab">被赞数 50</div>
          <div className="am-tabs-tab">我的点赞 50</div>
          <div className="am-tabs-tab">我的评论 50</div>
        </div>
        </div>
        <WhiteSpace size="l" />
        <hr/>
        <Accordion defaultActiveKey="0" className="my-accordion">
          <Accordion.Panel header="动态">
            <List className="my-list">
              <List.Item>xxx评论了你的</List.Item>
              <List.Item>xxxx给你点了赞</List.Item>
              <List.Item>撒旦撒旦按时的撒</List.Item>
            </List>
          </Accordion.Panel>
        </Accordion>

        <WhiteSpace size="l" />
        <Button onClick={() => history.push("/login")} style={{ marginRight: '0.1rem', backgroundColor: '#F4333C', color: 'white' }}>注销</Button>
      </div>
    );
  }
}

