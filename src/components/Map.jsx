import React from 'react';
import { hashHistory } from 'react-router';
import { Button, NavBar, WhiteSpace, Switch } from 'antd-mobile';
import { createForm } from 'rc-form';


class MapInner extends React.Component{
  state = {
    type: false,
    id: `itminus_bmap${parseInt(Math.random()*10000000)}`
  }
  componentDidMount() {
    console.log('component loaded, map id: ' + this.state.id);
    let mp = new BMap.Map(this.state.id, {enableMapClick:false});
    this.setState(
      {
        mp
      }
    );
var data = [
    {
      "publish_time": 1492215632,
      "topics": [
        "美食"
      ],
      "comments_preview": [
        {
          "reply_user": null,
          "author": {
            "headimgurl": "http://happy960.oss-cn-shenzhen.aliyuncs.com/59761545505153073.png",
            "nickname": "班委吴书记",
            "id": 1
          },
          "content": "确实好吃！",
          "create_time": 1492234902,
          "has_deleted": false,
          "id": 7
        }
      ],
      "id": 1,
      "polarity": "positive",
      "author": {
        "headimgurl": "http://happy960.oss-cn-shenzhen.aliyuncs.com/59761545505153073.png",
        "nickname": "班委吴书记",
        "id": 1
      },
      "pictures": [
        "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1628530400,2186611262&fm=23&gp=0.jpg",
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1492271998157&di=0b41d419e2b56922f0edb659c947c433&imgtype=0&src=http%3A%2F%2Fupload.chinamac.com%2F2011%2F0523%2F20110523104514178.jpg",
        "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1628530400,2186611262&fm=23&gp=0.jpg",
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1492271998157&di=0b41d419e2b56922f0edb659c947c433&i"
      ],
      "title": "贝岗RC炸鸡非常好吃",
      "comment_count": 1,
      "content": "新天地旁边秦人美食巷子里，有一个RC炸鸡，诚心推荐！尤其推荐蒜香味！",
      "vote_count": 3,
      "location": {
        "latitude": 23.0683212,
        "longitude": 113.3986083,
        "address": "广州大学城高高新天地后巷"
      },
      "has_voted": false
    },
    {
      "publish_time": 1492233470,
      "topics": [],
      "comments_preview": [],
      "id": 9,
      "polarity": "positive",
      "author": {
        "headimgurl": "http://happy960.oss-cn-shenzhen.aliyuncs.com/59761545505153073.png",
        "nickname": "班委吴书记",
        "id": 1
      },
      "pictures": [
        "http://happy960.oss-cn-shenzhen.aliyuncs.com/e701576a34c94962819806c3c830d0b3.JPEG"
      ],
      "title": "啊",
      "comment_count": 0,
      "content": "阿斯顿",
      "vote_count": 3,
      "location": {
        "latitude": 23.072354,
        "longitude": 113.392721,
        "address": "广东省, 广州市, 番禺区, 外环东路, 298号"
      },
      "has_voted": true
    },
    {
      "publish_time": 1492224983,
      "topics": [
        "旅行"
      ],
      "comments_preview": [
        {
          "reply_user": null,
          "author": {
            "headimgurl": "http://i.shangc.net/2017/0404/20170404101236377.jpg",
            "nickname": "高小琴",
            "id": 6
          },
          "content": "真可惜，这块地是我们的了",
          "create_time": 1492230784,
          "has_deleted": false,
          "id": 1
        }
      ],
      "id": 2,
      "polarity": "positive",
      "author": {
        "headimgurl": "http://happy960.oss-cn-shenzhen.aliyuncs.com/59761545505153073.png",
        "nickname": "市委王书记",
        "id": 2
      },
      "pictures": [
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1492264184375&di=406858a344bc95b47947efb022111b8b&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fpic%2Fitem%2Fb90e7bec54e736d16681814c9b504fc2d46269e7.jpg"
      ],
      "title": "中大牌坊风景好赞啊！",
      "comment_count": 1,
      "content": "中大外环的那个门，可以看到仿建的中大牌坊，很适合拍照。",
      "vote_count": 1,
      "location": {
        "latitude": 23.077174,
        "longitude": 113.398047,
        "address": "汉东大学北门"
      },
      "has_voted": true
    },
    {
      "publish_time": 1492234210,
      "topics": [],
      "comments_preview": [],
      "id": 10,
      "polarity": "positive",
      "author": {
        "headimgurl": "http://happy960.oss-cn-shenzhen.aliyuncs.com/59761545505153073.png",
        "nickname": "班委吴书记",
        "id": 1
      },
      "pictures": [
        "http://happy960.oss-cn-shenzhen.aliyuncs.com/35ecf7e397644545876e7e052abeb962.JPEG"
      ],
      "title": "啊",
      "comment_count": 0,
      "content": "啊",
      "vote_count": 1,
      "location": {
        "latitude": 23.1200491,
        "longitude": 113.30764968,
        "address": "广东省, 广州市, 越秀区, 美华北路, "
      },
      "has_voted": true
    },
    {
      "publish_time": 1492234318,
      "topics": [],
      "comments_preview": [],
      "id": 11,
      "polarity": "positive",
      "author": {
        "headimgurl": "http://happy960.oss-cn-shenzhen.aliyuncs.com/59761545505153073.png",
        "nickname": "班委吴书记",
        "id": 1
      },
      "pictures": [
        "http://happy960.oss-cn-shenzhen.aliyuncs.com/f6c4fa0994de454aaa3c93bc5c986b39.JPEG"
      ],
      "title": "1",
      "comment_count": 0,
      "content": "1",
      "vote_count": 1,
      "location": {
        "latitude": 23.072363,
        "longitude": 113.392743,
        "address": "广东省, 广州市, 番禺区, 外环东路, 298号"
      },
      "has_voted": true
    },
    {
      "publish_time": 1492229973,
      "topics": [
        "体育"
      ],
      "comments_preview": [
        {
          "reply_user": null,
          "author": {
            "headimgurl": "http://2.im.guokr.com/kdhPovJFHG43bsxESyjzKRNmenwbHfpxZv6lnCFL4vCAAgAA-gAAAEpQ.jpg",
            "nickname": "爱哭的毛毛虫",
            "id": 7
          },
          "content": "明年正好要去中大上学 XD",
          "create_time": 1492234798,
          "has_deleted": false,
          "id": 6
        }
      ],
      "id": 7,
      "polarity": "positive",
      "author": {
        "headimgurl": "http://i.shangc.net/2017/0404/20170404101236377.jpg",
        "nickname": "高小琴",
        "id": 6
      },
      "pictures": [
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1492269147594&di=022fc44616c70de92a35fc3771c05909&imgtype=0&src=http%3A%2F%2Fs10.sinaimg.cn%2Fbmiddle%2F5d8ce493g6bfc48e5c8e9%26690"
      ],
      "title": "划龙舟的队员们好帅啊！",
      "comment_count": 1,
      "content": "",
      "vote_count": 0,
      "location": {
        "latitude": 23.07163,
        "longitude": 113.39405,
        "address": "中山大学内河"
      },
      "has_voted": false
    },
    {
      "publish_time": 1492238911,
      "topics": [
        "未分类"
      ],
      "comments_preview": [],
      "id": 12,
      "polarity": "positive",
      "author": {
        "headimgurl": "http://happy960.oss-cn-shenzhen.aliyuncs.com/59761545505153073.png",
        "nickname": "班委吴书记",
        "id": 1
      },
      "pictures": [
        "http://happy960.oss-cn-shenzhen.aliyuncs.com/a72bf9f457284b15b01b79664b0cdb55.JPEG"
      ],
      "title": "喵喵喵",
      "comment_count": 0,
      "content": "asd",
      "vote_count": 0,
      "location": {
        "latitude": 23.072407,
        "longitude": 113.392752,
        "address": "广东省, 广州市, 番禺区, 外环东路, 298号"
      },
      "has_voted": false
    }
];

    // 百度地图API功能
  	mp.centerAndZoom(new BMap.Point(116.3964,39.9093), 15);
  	mp.enableScrollWheelZoom();

    // 设置主题
    mp.setMapStyle({style: 'dark'});        // 负
    mp.setMapStyle({style: 'normal'});  // 正

    var geolocation = new BMap.Geolocation();
  	geolocation.getCurrentPosition(function(r) {
		if(this.getStatus() == BMAP_STATUS_SUCCESS){
  			var mk = new BMap.Marker(r.point);
  			mp.addOverlay(mk);
  			mp.panTo(r.point);
  			console.log('您的位置：' + r.point.lng + ',' + r.point.lat);
		}
		else {
			   console.log('获取位置失败' + this.getStatus());
		}
	}, {enableHighAccuracy: true})


	 // 复杂的自定义覆盖物
    function ComplexCustomOverlay(point, text, clickText){
      this._point = point;
      this._text = text;
      this._clickText = clickText;
    }
    ComplexCustomOverlay.prototype = new BMap.Overlay();
    ComplexCustomOverlay.prototype.initialize = function(map){
      this._map = map;
      var div = this._div = document.createElement("div");
      div.style.position = "absolute";
      div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
      div.style.backgroundColor = "#EE5D5B";
      div.style.border = "1px solid #BC3B3A";
      div.style.color = "white";
      div.style.height = "18px";
      div.style.padding = "2px";
      div.style.lineHeight = "18px";
      div.style.whiteSpace = "nowrap";
      div.style.MozUserSelect = "none";
      div.style.fontSize = "12px"
      var span = this._span = document.createElement("span");
      div.appendChild(span);
      span.appendChild(document.createTextNode(this._text));
      var that = this;

      var arrow = this._arrow = document.createElement("div");
      arrow.style.background = "url(http://map.baidu.com/fwmap/upload/r/map/fwmap/static/house/images/label.png) no-repeat";
      arrow.style.position = "absolute";
      arrow.style.width = "11px";
      arrow.style.height = "10px";
      arrow.style.top = "22px";
      arrow.style.left = "10px";
      arrow.style.overflow = "hidden";
      div.appendChild(arrow);

      div.onclick = function(){
        this.style.backgroundColor = "#6BADCA";
        this.style.borderColor = "#0000ff";
        this.getElementsByTagName("span")[0].innerHTML = that._clickText;
        arrow.style.backgroundPosition = "0px -20px";
      }

      div.onblur = function(){
        this.style.backgroundColor = "#EE5D5B";
        this.style.borderColor = "#BC3B3A";
        this.getElementsByTagName("span")[0].innerHTML = that._text;
        arrow.style.backgroundPosition = "0px 0px";
      }

      mp.getPanes().labelPane.appendChild(div);

      return div;
    }
    ComplexCustomOverlay.prototype.draw = function(){
      var map = this._map;
      var pixel = map.pointToOverlayPixel(this._point);
      this._div.style.left = pixel.x - parseInt(this._arrow.style.left) + "px";
      this._div.style.top  = pixel.y - 30 + "px";
    }

    for (var i in data) {
      var point = new BMap.Point(data[i].location.longitude, data[i].location.latitude);
      var overText = data[i].author.nickname + ": " + data[i].title + '&nbsp;&nbsp;<a href="javascript:;">查看详情</a>';
      //  + "<br>" + "点赞：" + data[i].vote_count + " 评论：" + data[i].comment_count;
      var myCompOverlay = new ComplexCustomOverlay(point, data[i].title, overText);
      mp.addOverlay(myCompOverlay);
    }


    navigator.geolocation.getCurrentPosition(
      function(x) {
        var point = new BMap.Point(x.coords.longitude, x.coords.latitude);  // 创建点坐标  
        mp.centerAndZoom(point, 15); 
      }
    );
   
  }
  switchType(type) {
    this.setState(
      {
        type
      }
    );
    if (type) {
      this.state.mp.setMapStyle({style: 'dark'});
    } else {
      this.state.mp.setMapStyle({style: 'normal'});
    }
  }
  render() {
    const history=hashHistory;
    const { id, type } = this.state;
    const { getFieldProps } = this.props.form;
    return (
      <div style={{minHeight:480}}>
        <NavBar mode="light" iconName={false}>地图
          <div className="float-right">
            <Switch
              checked={type}
              onChange={(checked) => this.switchType(checked)}
               platform="ios"
            />
          </div>
        </NavBar>
        <div id={id}  style={{ width: "100%", height: "36em" }}></div>
      </div>
    );
  }
}


const Map = createForm()(MapInner);
export default Map;
