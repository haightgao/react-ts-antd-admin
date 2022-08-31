import { ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store'

interface IProps {
  permission: string
  children?: ReactNode
}

const Auth = ({ permission, children }: IProps) => {
  const { loading, permissionList } = useSelector((state: RootState) => state.userReducer)

  if (loading) {
    return null
  }
  let permissionSet = new Set(permissionList.map((item) => item.uniqueKey))
  return <>{permissionSet.has(permission) ? children : null}</>
}

export default Auth
