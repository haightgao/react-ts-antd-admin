import { Button, Space } from 'antd'
import Table, { ColumnsType, TablePaginationConfig } from 'antd/lib/table'
import { useEffect, useState } from 'react'
import { getUserList } from '../../api/user'
import Auth from '../../components/Auth'
import AddUser from './components/AddUser'
import DeleteUser from './components/DeleteUser'
import EditUser from './components/EditUser'

const Index = () => {
  const [list, setList] = useState<User[]>([])
  const [currentUser, setCurrentUser] = useState<User>({} as User)
  const [editUserVisible, setEditUserVisible] = useState(false)
  const [addUserVisible, setAddUserVisible] = useState(false)
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    position: ['bottomCenter'],
    showSizeChanger: false,
  })

  useEffect(() => {
    loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const columns: ColumnsType<User> = [
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '电子邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '操作',
      render(value, record, index) {
        return (
          <Space>
            <Button
              type='primary'
              onClick={() => {
                setCurrentUser(record)
                setEditUserVisible(true)
              }}
            >
              编辑
            </Button>
            <DeleteUser
              id={record.id}
              onDeleted={() => {
                loadData()
              }}
            />
          </Space>
        )
      },
    },
  ]

  function loadData(pageNo: number = 1) {
    getUserList(pageNo).then((res) => {
      setList(res.data.list)
      setPagination({
        ...pagination,
        ...res.data,
      })
    })
  }

  const handleChange = (page: TablePaginationConfig) => {
    loadData(page.current)
  }

  return (
    <>
      <Auth permission='addUser'>
        <Button
          type='primary'
          onClick={() => {
            setAddUserVisible(true)
          }}
        >
          新增
        </Button>
      </Auth>

      <Table<User> rowKey={'id'} dataSource={list} columns={columns} pagination={pagination} onChange={handleChange} />
      <AddUser
        visible={addUserVisible}
        onCancelHandle={(refresh) => {
          if (refresh) {
            loadData()
          }
          setAddUserVisible(false)
        }}
      />
      <EditUser
        user={currentUser}
        visible={editUserVisible}
        onCancel={(refresh: boolean) => {
          if (refresh) {
            loadData()
          }
          setEditUserVisible(false)
        }}
      />
    </>
  )
}

export default Index
