import { Breadcrumb, Layout, Menu, Spin } from 'antd'
import { ItemType } from 'antd/lib/menu/hooks/useItems'
import React, { ReactNode, useEffect, useState } from 'react'
import { matchRoutes, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { MenuInfo } from 'rc-menu/lib/interface'
import router, { IRouter } from '../router'
import './AppLayout.scss'
import { AppDispatch, RootState } from '../store'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUserInfo } from '../store/reducer/userReducer'

const { Header, Content, Sider } = Layout

const AppLayout = ({ children }: { children?: ReactNode }) => {
  const { loading, user, permissionList } = useSelector((state: RootState) => state.userReducer)
  const dispatch: AppDispatch = useDispatch()

  const [defaultSelectedKeys, setDefaultSelectedKeys] = useState<string[]>([])
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    window.logout = () => {
      localStorage.clear()
      navigate('/login')
    }

    checkToken()
    dispatch(getCurrentUserInfo())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    checkToken()
    const routerList = matchRoutes(router, location.pathname)
    if (routerList) {
      setDefaultSelectedKeys(routerList.map((item) => item.pathname))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  function checkToken() {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
    }
  }
  // 静态菜单
  // const menuList: ItemType[] = [
  //   {
  //     key: '/system',
  //     icon: <SettingOutlined />, // <==> React.createElement(SettingOutlined),
  //     label: '系统设置',
  //     children: [
  //       {
  //         key: '/system/user/list',
  //         icon: React.createElement(UserOutlined),
  //         label: '用户管理',
  //       },
  //       {
  //         key: 'role/list',
  //         icon: <TeamOutlined />,
  //         label: '角色管理',
  //       },
  //     ],
  //   },
  // ]

  const getMenuList = (routes: IRouter[], parent?: ItemType): ItemType[] => {
    console.log(permissionList)
    let permissionSet = new Set(permissionList.map((p) => p.uniqueKey))
    let result: ItemType[] = []
    for (let item of routes) {
      if (!permissionSet.has(item.path)) {
        continue
      }

      if (!item.hide && item.label && item.path) {
        let menu: ItemType = {
          key: parent ? `${parent.key}/${item.path}` : item.path,
          icon: item.icon,
          label: item.label,
        }

        if (item.children && item.children.length > 0) {
          // @ts-ignore
          menu['children'] = getMenuList(item.children, menu)
        }
        result.push(menu)
      }
    }
    // console.log(result)
    return result
  }

  const gotoPage = (info: MenuInfo) => {
    // console.log(info)

    navigate(info.key)
  }

  if (loading) {
    return (
      <div className='loading'>
        {' '}
        <Spin />
      </div>
    )
  }

  if (defaultSelectedKeys.length === 0) {
    return null
  }

  return (
    <Layout className='appLayout'>
      <Header className='header'>
        <div className='logo'>Logo</div>
        <div className='userInfo'>{user.name}</div>
      </Header>
      <Layout>
        <Sider width={200} className='site-layout-background'>
          <Menu
            onClick={gotoPage}
            mode='inline'
            defaultSelectedKeys={defaultSelectedKeys}
            defaultOpenKeys={defaultSelectedKeys}
            style={{
              height: '100%',
              borderRight: 0,
            }}
            items={getMenuList(router)}
          />
        </Sider>
        <Layout
          style={{
            padding: '0 24px 24px',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className='site-layout-background'
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            {children}
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default AppLayout
