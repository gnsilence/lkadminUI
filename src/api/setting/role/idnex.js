import config from '@/config'
import http from '@/utils/request'

const resquest = config.API_URL

// 系统设置/角色权限

// 系统设置-角色权限-列表、搜索接口
export function page(params) {
  return http.get(`${resquest}/sysRole/page`, params)
}

// 系统设置-角色权限-新增
export function addPro(params) {
  return http.post(`${resquest}/sysRole/add`, params)
}

// 系统设置-角色权限-编辑
export function editPro(params) {
  return http.post(`${resquest}/sysRole/edit`, params)
}

// 系统设置-角色权限-增加授权菜单接口
export function grantMenuAdd(params) {
  return http.post(`${resquest}/sysRole/grantMenu`, params)
}

// 系统设置-角色权限-获取授权菜单接口
export function menuList(params) {
  return http.get(`${resquest}/sysMenu/list`, params)
}

// 系统设置-角色权限-获取授权菜单接口
export function ownMenu(params) {
  return http.get(`${resquest}/sysRole/ownMenu`, params)
}

// 系统设置-角色权限-授权数据接口
export function grantData(params) {
  return http.post(`${resquest}/sysRole/grantData`, params)
}

// 删除角色权限列表
export function deleterRole(params) {
  return http.post(`${resquest}/sysRole/delete`, params)
}

// 获取默认排序
export function defSort(params) {
  return http.get(`${resquest}/sysRole/defSort`, params)
}
