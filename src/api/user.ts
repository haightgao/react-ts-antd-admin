import request from '../utils/request'

export function getUserList(current = 1, pageSize = 15) {
  return request.get<any, IPagination<User>>('/admin/user', { params: { current, pageSize } })
}

export function getUserDetail(id: number) {
  return request.get<any, ResponseSuccess>(`/admin/user/${id}`)
}

export function doDelete(id: number) {
  return request.delete<any, ResponseSuccess>('/admin/user/' + id)
}

export function doEdit(id: number, user: User) {
  if (!user.password) {
    delete user.password
  }
  return request.patch<any, ResponseSuccess>('/admin/user/' + id, user)
}

export function doCreate(user: User) {
  return request.post<any, ResponseSuccess>(`/admin/user`, user)
}
