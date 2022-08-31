import { UserOutlined, SettingOutlined, TeamOutlined, DashboardOutlined, HomeOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import React from 'react'
import { ReactNode, Suspense } from 'react'
import { Navigate, RouteObject } from 'react-router-dom'
import AppLayout from '../components/AppLayout'
import Dashboard from '../pages/dashboard'
import Login from '../pages/login'

const Role = React.lazy(() => import('../pages/role'))
const User = React.lazy(() => import('../pages/user'))
// const Dashboard = React.lazy(() => import('../pages/dashboard'))

export interface IRouter extends RouteObject {
  path: string
  label?: string
  hide?: boolean
  icon?: ReactNode
  children?: IRouter[]
}

const lazyLoad = (children: ReactNode) => {
  return <Suspense fallback={<Spin />}>{children}</Suspense>
}
const router: IRouter[] = [
  {
    path: '/',
    label: '首页',
    hide: true,
    icon: <HomeOutlined />,
    element: <Navigate to='/dashboard' replace={true} />,
  },
  {
    path: '/dashboard',
    label: '仪表盘',
    icon: <DashboardOutlined />,
    element: <AppLayout>{lazyLoad(<Dashboard />)}</AppLayout>,
  },
  {
    path: '/system',
    label: '系统管理',
    icon: <SettingOutlined />,
    element: <AppLayout />,
    children: [
      {
        path: 'user/list',
        label: '用户管理',
        icon: React.createElement(UserOutlined),
        element: lazyLoad(<User />),
      },
      {
        path: 'role/list',
        icon: <TeamOutlined />,
        label: '角色管理',
        element: lazyLoad(<Role />),
      },
    ],
  },
  {
    path: '/login',
    element: lazyLoad(<Login />),
  },
]

export default router
