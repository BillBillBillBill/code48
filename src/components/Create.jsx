import React from 'react';
import ReactDOM from 'react-dom';
import { hashHistory } from 'react-router';
import { Button, NavBar, WhiteSpace, WingBlank, Icon } from 'antd-mobile';
import { ImagePicker } from 'antd-mobile';
import { List, InputItem, TextareaItem, Radio } from 'antd-mobile';
import { createForm } from 'rc-form';


const RadioItem = Radio.RadioItem;

const data = [{
  url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
  id: '2121',
}, {
  url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
  id: '2122',
}];


export class CreateInner extends React.Component{
  state = {
    files: data,
    type: 'good',
    title: 'title',
    descript: 'descript',
    posDesc: '地理信息获取中。。',
  }
  onImageChange = (files, type, index) => {
    console.log(files, type, index);
    this.setState({
      files,
    });
  }
  onChangeType = (type) => {
    console.log('type changed');
    this.setState({
      type,
    });
  }
  submit = () => {
    let values = this.state;
    values['title'] = this.props.form.getFieldsValue()['title'];
    values['descript'] = this.props.form.getFieldsValue()['descript']
    console.log(values);
  }
  getCurrentPosition = () => {
    let self = this;
		let geolocation = new BMap.Geolocation();
		let geoc = new BMap.Geocoder();
		geolocation.getCurrentPosition(function(r){
			if(this.getStatus() == BMAP_STATUS_SUCCESS){
				geoc.getLocation(r.point, function(rs){
					let addComp = rs.addressComponents;
          let posDesc = addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber;
          console.log(posDesc);
          self.setState({
            posDesc,
          });
				});
			}
			else {
				alert('获取定位失败，请检查是否开启定位');
			}        
		},{enableHighAccuracy: true});
	}
  componentDidMount() {
    console.log('component loaded');
    this.getCurrentPosition();
  }
  render() {
    const { getFieldProps } = this.props.form;
    const history = hashHistory;
    const { files, type, posDesc } = this.state;
    return (
      <div style={{minHeight:480}}>
        <NavBar mode="light" iconName={false}>发布</NavBar>
        <ImagePicker
          files={files}
          onChange={this.onImageChange}
          onImageClick={(index, fs) => console.log(index, fs)}
          selectable={files.length < 5}
        />
         <List renderHeader={() => '问题描述'}>
          <InputItem
            {...getFieldProps('title')}
            clear
            placeholder="*标题（10个字以内）"
            autoFocus
          ></InputItem>
        </List>
        <List>
          <TextareaItem
            {...getFieldProps('descript')}
            autoHeight
            rows={5}
            placeholder="说说你发现了什么问题？"
          />
        </List>
        <WingBlank size="lg"><Icon type="environment" /><p>{posDesc}</p></WingBlank>
        
        <List renderHeader={() => '分类识别'}>
          <RadioItem key='good' checked={type === 'good'} onChange={() => this.onChangeType('good')}>
            闪光
          </RadioItem>
          <RadioItem key='bad' checked={type === 'bad'} onChange={() => this.onChangeType('bad')}>
            吐槽
          </RadioItem>
        </List>
        <WhiteSpace size="xl" />
        <WhiteSpace size="xl" />
        <WhiteSpace size="l" />
        <Button className="btn" type="primary" onClick={() => this.submit()}>发布</Button>
      </div>
    );
  }
}


const Create = createForm()(CreateInner);
export default Create;
