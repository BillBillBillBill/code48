import React from 'react';
import ReactDOM from 'react-dom';
import { hashHistory } from 'react-router';
import { Button, NavBar, WhiteSpace, WingBlank, Icon } from 'antd-mobile';
import { ImagePicker } from 'antd-mobile';
import { List, InputItem, TextareaItem, Radio, Flex, Switch } from 'antd-mobile';
import { createForm } from 'rc-form';
import { Toast, Tag } from 'antd-mobile'
import './Create.css';


const RadioItem = Radio.RadioItem;

const data = [];


export class CreateInner extends React.Component{
  state = {
    files: data,
    type: true,
    title: 'title',
    descript: 'descript',
    posDesc: '地理信息获取中。。',
    topics: ['未分类']
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
  getPolarity = (cb) => {
    let self = this;
    let values = this.props.form.getFieldsValue();
    fetch('http://139.199.229.97:8000/api/problems/get_polarity/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "content" : values.descript,
        "title" : values.title,
      })
    }).then(res => {
      res.json().then(function(j) {
        console.log('getPolarity', j);
        var t = false;
        if (j.data.positive >= j.data.negative) {
          t = true;
        }
        self.props.form.setFieldsValue({'type': t});
      })
    });
  }
  getTopics = (cb) => {
    let self = this;
    let values = this.props.form.getFieldsValue();
    fetch('http://139.199.229.97:8000/api/problems/get_topics/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "content" : values.descript,
        "title" : values.title,
      })
    }).then(res => {
      res.json().then(function(j) {
        console.log('getTopics', j);
        self.setState(
          {
            topics: [j.data[0].class]
          }
        );
      })
    });
  }
  save = () => {
    let self = this;
    let values = this.state;
    let images = this.state.files;
    let imgURLlist = [];

    if (images.length === 0) {
      Toast.fail('至少选择一张图片', 1);
    } else if ( !values.title ) {
      Toast.fail('请输入标题', 1);
    } else if ( ! values.descript ) {
      Toast.fail('请输入描述', 1);
    } else {

      for (var i = 0 ; i < images.length; i++) {
        var fd = new FormData();
        fd.append('picture', images[i].file);
        fetch('http://139.199.229.97:8000/api/picture/', {
          method: 'POST',
          body: fd
        }).then(res => {
          res.json().then(function(j) {
            console.log(j);
            imgURLlist.push(j.data.picture_url);
            if (imgURLlist.length == images.length) {
              // 上传完成 提交
              fetch('http://139.199.229.97:8000/api/problems/', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  "content" : values.descript,
                  "location": {
                    "latitude" : values.posPoint.lat,
                    "longitude" : values.posPoint.lng,
                    "address" : values.posDesc
                  },
                  "pictures": imgURLlist,
                  "title" : values.title,
                  "polarity": values.type ? 1 : 2 ,
                  "topics": values.topics
                })
              }).then(res => {
                res.json().then(function(j) {
                  console.log(j);
                  if (j.result === true) {
                    Toast.success('发布成功', 1);
                  } else {
                    Toast.fail('发布失败', 1);
                  }
                })
              });
            }
          });
        });
      }

    }

  }
  submit = () => {
    let values = this.state;
    values['title'] = this.props.form.getFieldsValue()['title'];
    values['descript'] = this.props.form.getFieldsValue()['descript']
    this.save();
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
            posPoint: r.point,
            posDesc: posDesc,
          });
				});
			}
			else {
				alert('获取定位失败，请检查是否开启定位');
			}        
		},{enableHighAccuracy: true});
	}
  componentDidMount() {
    let self = this;
    console.log('component loaded');
    this.getCurrentPosition();
    setInterval(function() {
      let values = this.props.form.getFieldsValue();
      let lastValues = this.state;
      self.setState(
        {
          lastTitle: values.title,
          lastDescript: values.descript
        }
      );
      if (values.title != lastValues.lastTitle || values.descript != lastValues.lastDescript) {
        console.log('title or descript change!');
        this.getPolarity();
        this.getTopics();
      }
      
    }.bind(this), 2000);
  }
  render() {
    const { getFieldProps } = this.props.form;
    const history = hashHistory;
    const { files, type, posDesc, topics } = this.state;
    return (
      <div style={{minHeight:480}}>
        <NavBar mode="light" iconName={false}>发布</NavBar>
        <ImagePicker
          files={files}
          onChange={this.onImageChange}
          onImageClick={(index, fs) => console.log(index, fs)}
          selectable={files.length < 4}
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
        <p><i className="fa fa-map-marker mr1 font gray"></i>{posDesc}</p>
        <WingBlank size="md"><span>分类：<Tag className="tag class">{ topics[0] }</Tag></span></WingBlank>

        <div style={{ textAlign: "center", margin: "2em 0" }}>
            <span style={{ paddingRight: '1em' }}>吐槽</span>
            <Switch
              {...getFieldProps('type', {
                initialValue: true,
                valuePropName: 'checked',
              })}
              platform="android"
            />
            <span style={{ paddingLeft: '1em' }}>闪光</span>
        </div>


        <WhiteSpace size="l" />
        <Button style={{ marginBottom: '3em' }} className="btn" type="primary" onClick={() => this.submit()}>发布</Button>
      </div>
    );
  }
}


const Create = createForm()(CreateInner);
export default Create;
