import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';

import Main from './components/Main';
import Map from './components/Map';
import Create from './components/Create';
import User from './components/User';
import { TabBar, Icon } from 'antd-mobile';

import 'font-awesome/css/font-awesome.min.css'

class Base extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'redTab',
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
          selected={this.state.selectedTab === 'blueTab'}
          badge={1}
          onPress={() => {
            this.setState({
              selectedTab: 'blueTab',
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
          selected={this.state.selectedTab === 'redTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'redTab',
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
          selected={this.state.selectedTab === 'greenTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'greenTab',
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
          selected={this.state.selectedTab === 'yellowTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'yellowTab',
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
    </Route>
  </Router>
), document.getElementById('example'));
