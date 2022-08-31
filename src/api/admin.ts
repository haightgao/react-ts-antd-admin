import request from '../utils/request'

export function getCurrentUser() {
  return request.get<any, ResponseSuccess<{ admin: User; permissionList: Permission[] }>>('/admin/admin/admin/current')
}
