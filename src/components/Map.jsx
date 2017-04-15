import React from 'react';
import { hashHistory } from 'react-router';
import { Button, NavBar, WhiteSpace } from 'antd-mobile';

export default class Map extends React.Component{
  state = {
    id: `itminus_bmap${parseInt(Math.random()*10000000)}`
  }
  componentDidMount() {
    console.log('component loaded, map id: ' + this.state.id);
    let map = new BMap.Map(this.state.id);
    var bs = map.getBounds();   //获取可视区域
    var bssw = bs.getSouthWest();   //可视区域左下角
    var bsne = bs.getNorthEast();   //可视区域右上角
  }
  render() {
    const history=hashHistory;
    const {id} = this.state;
    return (
      <div style={{minHeight:480}}>
        <NavBar mode="light" iconName={false}>地图界面</NavBar>
        <div id={id}  style={{ width: "100%", height: "36em" }}></div>
      </div>
    );
  }
}
