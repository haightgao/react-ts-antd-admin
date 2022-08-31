import { Button, message, Popconfirm } from 'antd'
import React from 'react'
import { doDelete } from '../../../api/user'

interface Props {
  id: number
  onDeleted(): void
}
const DeleteUser = ({ id, onDeleted }: Props) => {
  const handleDelete = () => {
    console.log('id: ', id)
    doDelete(id)
      .then((res) => {
        if (res.success) {
          message.success('删除成功')
          onDeleted()
        } else {
          message.error(res.errorMessage)
        }
      })
      .catch((err) => {
        message.error(err.message)
      })
  }

  return (
    <>
      <Popconfirm title='确定删除当前用户吗？' cancelText='取消' okText='确定' onConfirm={handleDelete}>
        <Button type='primary' danger>
          删除
        </Button>
      </Popconfirm>
    </>
  )
}

export default DeleteUser
