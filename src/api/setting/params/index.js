import config from '@/config'
import http from '@/utils/request'

const resquest = config.API_URL

// 系统设置/业务参数
// 系统设置-业务参数-标签页（获取业务参数左侧数据）
export function getBusVal(params) {
  return http.get(`${resquest}/BusinessValue/getBusVal`, params)
}

// 系统设置-业务参数-参数列表（分页获取右侧列表）
export function getValPage(params) {
  return http.get(`${resquest}/BusinessValue/valPage`, params)
}

// 系统设置-业务参数-新增业务参数
export function addBusVal(params) {
  return http.post(`${resquest}/BusinessValue/addBusVal`, params)
}

// 系统设置-业务参数-修改业务参数
export function updateBusVal(params) {
  return http.post(`${resquest}/BusinessValue/updateBusVal`, params)
}

// 系统设置-业务参数-删除业务参数
export function deleteBugVal(params) {
  return http.post(`${resquest}/BusinessValue/delete`, params)
}

// 系统设置-业务参数-获取业务参数
export function detail(params) {
  return http.get(`${resquest}/BusinessValue/detail`, params)
}

// 系统设置-业务参数-获取业务参数默认排序号
export function defSort(params) {
  return http.get(`${resquest}/BusinessValue/defSort`, params)
}

