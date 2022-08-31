import { Spin } from 'antd'
import { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import './App.css'
import router from './router'

function App() {
  return (
    <>
      {/* 静态路由 */}
      {/* <Routes>
        <Route path='/' element={<AppLayout />}>
          <Route path='/user/list' element={<User />} />
          <Route path='/role/list' element={<Role />} />
        </Route>
        <Route path='/login' element={<Login />} />
      </Routes> */}

      {/* 动态路由 */}
      <Suspense fallback={<Spin />}> {useRoutes(router)}</Suspense>
    </>
  )
}

export default App
