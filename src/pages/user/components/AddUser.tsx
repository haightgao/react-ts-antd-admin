import { Form, Input, message, Modal } from 'antd'
import React, { useEffect } from 'react'
import { doCreate } from '../../../api/user'

interface IProps {
  visible: boolean
  onCancelHandle(refresh: boolean): void
}
const AddUser = ({ visible, onCancelHandle }: IProps) => {
  const [form] = Form.useForm()

  useEffect(() => {
    if (visible) {
      form.resetFields()
    }
  }, [form, visible])

  const saveData = (user: User) => {
    doCreate(user)
      .then((res) => {
        if (res.success) {
          message.success('新增用户成功')
          onCancelHandle(true)
        } else {
          message.error(res.errorMessage)
        }
      })
      .catch((err) => {
        console.error(err)
        message.error(err.response.data.errorMessage || err.message)
      })
  }
  return (
    <Modal
      title='新增用户'
      cancelText='取消'
      okText='确定'
      visible={visible}
      onCancel={() => {
        onCancelHandle(false)
      }}
      onOk={() => {
        form.submit()
      }}
    >
      <Form
        form={form}
        initialValues={{ username: '', email: '', password: '' }}
        onFinish={saveData}
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item
          name={'username'}
          label='用户名'
          rules={[
            {
              required: true,
              type: 'string',
              message: '请输入用户名',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={'email'}
          label='邮箱'
          rules={[
            {
              required: true,
              type: 'email',
              message: '邮箱格式不正确',
            },
          ]}
        >
          <Input type={'email'} />
        </Form.Item>
        <Form.Item
          name={'password'}
          label='密码'
          rules={[
            {
              required: true,
              type: 'string',
              min: 6,
              message: '密码长度最小为6位',
            },
          ]}
        >
          <Input type={'password'} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AddUser
