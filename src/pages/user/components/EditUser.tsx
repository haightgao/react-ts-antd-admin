import { Modal, Form, Input, message } from 'antd'
import React, { useEffect } from 'react'
import { doEdit } from '../../../api/user'

interface IProps {
  user: User
  visible: boolean
  onCancel(refresh: boolean): void
}
const EditUser = ({ user, visible, onCancel }: IProps) => {
  const [form] = Form.useForm()

  useEffect(() => {
    visible && form.resetFields()
  }, [form, visible])

  const saveUser = (data: User) => {
    doEdit(user.id, data)
      .then((res) => {
        if (res.success) {
          message.success('保存成功')
          onCancel(true)
        } else {
          message.error(res.errorMessage)
        }
      })
      .catch((err) => {
        console.error(err)
        message.error(err.message)
      })
  }
  return (
    <Modal
      title={user && user.id ? '编辑用户信息' : '新增用户信息'}
      visible={visible}
      onCancel={() => {
        onCancel(false)
      }}
      onOk={() => {
        form.submit()
      }}
      cancelText='取消'
      okText='确定'
    >
      <Form
        form={form}
        initialValues={{
          ...user,
          password: '',
        }}
        onFinish={saveUser}
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item label='id' name={'id'} hidden>
          <Input />
        </Form.Item>
        <Form.Item
          label='用户名'
          name={'username'}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label='邮箱' name={'email'} rules={[{ required: true }]}>
          <Input type={'email'} />
        </Form.Item>
        <Form.Item label='密码' name={'password'}>
          <Input type={'password'} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default EditUser
