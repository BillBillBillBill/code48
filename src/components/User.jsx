import React from 'react';
import { hashHistory } from 'react-router';
import { Button, NavBar, WhiteSpace } from 'antd-mobile';

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

        <WhiteSpace size="lg"/>
        <Button onClick={(e) => {
          e.preventDefault();
          alert('触发了第二界面的【Button】按钮');
        }}>
          用户页面
        </Button>

      </div>
    );
  }
}

