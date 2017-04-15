import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';

import Main from './components/Main';
import Map from './components/Map';
import Create from './components/Create';
import User from './components/User';
import Login from './components/Login';
import { TabBar, Icon } from 'antd-mobile';

import 'font-awesome/css/font-awesome.min.css'

class Base extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'mainTab',
      hidden: false,
    };
  }

  render() {
    return (
      <TabBar
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="white"
        hidden={this.state.hidden}
      >
        <TabBar.Item
          title="列表"
          key="列表"
          icon={<div style={{
            width: '0.44rem',
            height: '0.44rem',
            background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  0.42rem 0.42rem no-repeat' }}
          />
          }
          selectedIcon={<div style={{
            width: '0.44rem',
            height: '0.44rem',
            background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  0.42rem 0.42rem no-repeat' }}
          />
          }
          selected={this.state.selectedTab === 'mainTab'}
          badge={1}
          onPress={() => {
            this.setState({
              selectedTab: 'mainTab',
            });
            hashHistory.push("/main");
          }}
          data-seed="logId"
        >
          {this.props.children}
        </TabBar.Item>
        <TabBar.Item
          icon={<Icon type="koubei-o" size="md" />}
          selectedIcon={<Icon type="koubei" size="md" />}
          title="地图"
          key="地图"
          badge={'new'}
          selected={this.state.selectedTab === 'mapTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'mapTab',
            });
            hashHistory.push("/map");
          }}
          data-seed="logId1"
        >
          {this.props.children}
        </TabBar.Item>
        <TabBar.Item
          icon={
            <div style={{
              width: '0.44rem',
              height: '0.44rem',
              background: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  0.42rem 0.42rem no-repeat' }}
            />
          }
          selectedIcon={
            <div style={{
              width: '0.44rem',
              height: '0.44rem',
              background: 'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  0.42rem 0.42rem no-repeat' }}
            />
          }
          title="发布"
          key="发布"
          dot
          selected={this.state.selectedTab === 'createTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'createTab',
            });
            hashHistory.push("/create");
          }}
        >
          {this.props.children}
        </TabBar.Item>
        <TabBar.Item
          icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg' }}
          selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg' }}
          title="我的"
          key="我的"
          selected={this.state.selectedTab === 'userTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'userTab',
            });
            hashHistory.push("/user");
          }}
        >
          {this.props.children}
        </TabBar.Item>
      </TabBar>
    );
  }
}

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={Base}>
      <IndexRoute component={Main}/>
      <Route path="main" component={Main}></Route>
      <Route path="map" component={Map}></Route>
      <Route path="create" component={Create}></Route>
      <Route path="user" component={User}></Route>
      <Route path="login" component={Login}></Route>
    </Route>
  </Router>
), document.getElementById('example'));
