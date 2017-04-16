import React from 'react';
import { hashHistory } from 'react-router';
import { Button, NavBar, WhiteSpace } from 'antd-mobile';
import { List, InputItem, Toast } from 'antd-mobile'
import { createForm } from 'rc-form';
import './Login.css';


class LoginInner extends React.Component{
  getCode = () => {
    Toast.success('验证码已发送到你手机', 2);
  }
  login = () => {
    console.log(this.props.form.getFieldsValue());
    Toast.success('登陆成功', 1);
    hashHistory.push('/user');
  }
  render() {
    const { getFieldProps } = this.props.form;
    const history = hashHistory;
    return (
      <div className="fuck" style={{minHeight:617}}>
        <h1 style={{ margin: '0 auto', height: 300 }}></h1>
        <List>
          <InputItem
            {...getFieldProps('phone')}
            type="phone"
            placeholder="请输入手机号"
          >手机号码</InputItem>
          <InputItem
            {...getFieldProps('number')}
            type="number"
            placeholder="6位的验证码"
          >短信验证码</InputItem>
        </List>

        <WhiteSpace size="lg"/>
        <Button onClick={() => {
          this.getCode()
        }}>
          获取验证码
        </Button>
        <WhiteSpace size="md"/>
        <Button type="primary" onClick={() => {
          this.login()
        }}>
          登录
        </Button>

      </div>
    );
  }
}


const Login = createForm()(LoginInner);
export default Login;
