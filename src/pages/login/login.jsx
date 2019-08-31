import React, {Component} from 'react'
import {
  Form,
  Input,
  Icon,
  Button,
  message
} from 'antd'
import {Redirect} from 'react-router-dom'



import memoryUtils from '../../util/memoryUtils';
import { reqLogin } from "../../api/index";
import logo from "../images/logo.png"
import './login.less'

const Item = Form.Item

/*
登陆路由组件
 */
class Login extends Component {
  handleSubmit = e => {
    e.preventDefault();
    const form=this.props.form
    form.validateFields(async (err, {username,password}) => {
      if (!err) {
        const result = await reqLogin(username, password);
          if (result.status===0) {
            const user=result.data

            //保存
            localStorage.setItem('user_key',JSON.stringify(user))
            memoryUtils.user=user

            this.props.history.replace('/')
          }else{
            message.error(result.msg)
          }


      }else{
        console.log('前台表单验证失败');
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const user=memoryUtils.user
  if (user._id) {
    return <Redirect to="/"></Redirect>
}

    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="logo" />
          <h1>React项目: 后台管理系统</h1>
        </header>

        <section className="login-content">
          <h3>用户登陆</h3>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Item>
              {getFieldDecorator("username", {
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: "请输入用户名!"
                  },
                  { max: 12, message: "最大为12位" },
                  { min: 4, message: "最小为4位" },
                  {
                    pattern: /^[a-zA-Z0-9]+$/,
                    message: "只能包含英文，数字，下划线"
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="用户名"
                />
              )}
            </Item>
            <Item>
              {getFieldDecorator("password", {
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: "请输入用户名!"
                  },
                  { max: 12, message: "最大为12位" },
                  { min: 4, message: "最小为4位" },
                  {
                    pattern: /^[a-zA-Z0-9]+$/,
                    message: "只能包含英文，数字，下划线"
                  }
                ]
              })(
                <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="密码"
              />
              )}
              
            </Item>
            <Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                登录
              </Button>
            </Item>
          </Form>
        </section>
      </div>
    );
  }
}

const WrapLogin = Form.create()(Login)
export default WrapLogin

