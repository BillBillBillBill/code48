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
          title="动态"
          key="动态"
          icon={<div style={{
            width: '0.44rem',
            height: '0.44rem',
            background: 'url(https://3.bp.blogspot.com/-KpUiG-pfL1Q/WPLdpZEiJ3I/AAAAAAAAAO8/2GqsVUqDNmAAQwVxB5oCVVLjgMWJsIs-gCLcB/s1600/list_dark.png) center center /  0.42rem 0.42rem no-repeat' }}
          />
          }
          selectedIcon={<div style={{
            width: '0.44rem',
            height: '0.44rem',
            background: 'url(https://4.bp.blogspot.com/-FPWHaRGfNEk/WPLdp1ZydtI/AAAAAAAAAPA/aEZR6jbQaM0l1yI629matForUJYlsorhgCLcB/s1600/list_light.png) center center /  0.42rem 0.42rem no-repeat' }}
          />
          }
          selected={this.state.selectedTab === 'mainTab'}
          //badge={1}
          badge={'new'}
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
          icon={<div style={{
            width: '0.44rem',
            height: '0.44rem',
            background: 'url(https://1.bp.blogspot.com/-n01OAAYoyv8/WPLdqY5u8HI/AAAAAAAAAPM/Qx5B9f5kX64nbt3A_Y7t55wD_295fbrWgCLcB/s1600/map_dark.png) center center /  0.42rem 0.42rem no-repeat' }}
          />}
          selectedIcon={<div style={{
            width: '0.44rem',
            height: '0.44rem',
            background: 'url(https://3.bp.blogspot.com/-4ppSrZiJ3mk/WPLdqmzppeI/AAAAAAAAAPQ/pmTEMhnD7sksd4TgY-3_vkyo08sr2wyZACLcB/s1600/map_light.png) center center /  0.42rem 0.42rem no-repeat' }}
          />}
          title="地图"
          key="地图"
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
              background: 'url(https://3.bp.blogspot.com/-Dg9k6GlDHvw/WPLdpfodv8I/AAAAAAAAAO4/xXec6jQq-AsrTADbu97qZGaRvFDqcw1qwCLcB/s1600/camera_dark.png) center center /  0.42rem 0.42rem no-repeat' }}
            />
          }
          selectedIcon={
            <div style={{
              width: '0.44rem',
              height: '0.44rem',
              background: 'url(https://3.bp.blogspot.com/-1TAR_aTmP7c/WPLdpXCrZEI/AAAAAAAAAO0/RV-uQ2_HNyAHKuWebPjIZ4rgz08u26rmQCLcB/s1600/camera_light.png) center center /  0.42rem 0.42rem no-repeat' }}
            />
          }
          title="发布"
          key="发布"
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
          icon={{ uri: 'https://2.bp.blogspot.com/--ksxFTy5NJ4/WPLdqj7l3aI/AAAAAAAAAPU/1yfvT5U2yccofg7nHqdS9Ow1jfX3YKJJQCLcB/s1600/profile_dark.png' }}
          selectedIcon={{ uri: 'https://2.bp.blogspot.com/-Bb3RUcI77h4/WPLdrF18K_I/AAAAAAAAAPY/2G2jiyUbhic5jHOehJhLb6h0K-kfRR1DACLcB/s1600/profile_light.png' }}
          title="我的"
          key="我的"
          dot
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
