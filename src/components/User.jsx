import React from 'react';
import { hashHistory } from 'react-router';
import { Button, NavBar, WhiteSpace, WingBlank } from 'antd-mobile';
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
        <NavBar mode="light" onLeftClick={() => history.push("/")}>用户</NavBar>
        
        <WingBlank>
        <div style={{ width: '60%', float: "left" }}>
          <p>市委王书记</p>
          <p><i className="fa fa-map-marker mr1 font gray"></i>外环东路 中山大学</p>
        </div>
        <div style={{ width: '40%', float: "right" }}>
          <img style={{ float: "right", width: '5em', height: '5em' }} src="https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg"></img>
        </div>
        </WingBlank>
        <hr/>
        <div className="am-tabs am-tabs-top">
        <div className="am-tabs-bar">
          <div className="am-tabs-tab">被赞数 66</div>
          <div className="am-tabs-tab">我的点赞 23</div>
          <div className="am-tabs-tab">我的评论 35</div>
        </div>
        </div>
        <WhiteSpace size="l" />
        <hr/>
        <Accordion defaultActiveKey="0" className="my-accordion">
          <Accordion.Panel header="动态">
            <List className="my-list">
              <List.Item>Nightonke评论了你的文章</List.Item>
              <List.Item>Bill给你点了赞</List.Item>
              <List.Item>CaesarMing给你点了赞</List.Item>
              <List.Item>你的文章已被置顶</List.Item>
            </List>
          </Accordion.Panel>
        </Accordion>

        <WhiteSpace size="lg" />
        <Button onClick={() => history.push("/login")} style={{ marginRight: '0.1rem', backgroundColor: '#F4333C', color: 'white' }}>注销</Button>
      </div>
    );
  }
}

