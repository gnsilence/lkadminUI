import config from '@/config'
import http from '@/utils/request'

const resquest = config.API_URL

// 系统设置/组织结构

// 系统设置-组织结构-组织结构目录
export function tree(params) {
  return http.get(`${resquest}/sysOrg/tree`, params)
}
// 获取组织机构，无权限过滤
export function alltree(params) {
	return http.get(`${resquest}/sysOrg/alltree`, params)
}
// 系统设置-组织结构-人员列表
export function userPage(params) {
  return http.get(`${resquest}/sysUser/page`, params)
}

// 系统设置-组织结构-同步企业微信
export function asyncWeiChat(params) {
  return http.get(`${resquest}/sysOrg/asyncWeiChat`, params)
}

// 系统设置-组织结构-角色下拉（用于授权角色时选择）
export function roleDropDown(params) {
  return http.get(`${resquest}/sysRole/dropDown`, params)
}

// 系统设置-组织结构-设置角色（授权用户角色）
export function grantRole(params) {
  return http.post(`${resquest}/sysUser/grantRole`, params)
}

