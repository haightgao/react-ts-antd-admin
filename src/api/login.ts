import request from '../utils/request'

export function doLogin(data: Login) {
  return request.post<Login, ResponseSuccess<{ token: string }>>('/admin/admin/login', data)
}
