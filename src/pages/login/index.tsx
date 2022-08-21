import { Button, Form, Input, message, Space } from 'antd'
import React from 'react'
import { doLogin } from '../../api/login'
import './login.scss'

const Index = () => {
  function login(data: Login) {
    console.log(data)
    doLogin(data).then((res) => {
      if (res.success) {
        console.log(res.data)
        localStorage.setItem('token', res.data.token)
      } else {
        message.error(res.errorMessage)
      }
    })
  }

  return (
    <div className='login-container'>
      <Form
        initialValues={{
          username: '最爱白菜吖',
          password: '123456',
        }}
        onFinish={login}
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item
          label='用户名'
          name='username'
          rules={[
            {
              required: true,
              message: '请填写用户名',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='密码'
          name='password'
          rules={[
            {
              required: true,
              message: '请填写密码',
            },
            {
              min: 6,
              message: '密码长度不能小于6位',
            },
          ]}
        >
          <Input type='password' />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Space>
            <Button type='primary' htmlType='submit'>
              登录
            </Button>
            <Button htmlType='reset'>重置</Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Index
