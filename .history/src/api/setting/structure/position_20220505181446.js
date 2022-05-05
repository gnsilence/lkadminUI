/*
 * @Author: gongnan
 * @Date: 2022-05-05 17:32:40
 * @LastEditors: gongnan
 * @LastEditTime: 2022-05-05 18:14:46
 * @Description: file content
 * @FilePath: \front\src\api\setting\structure\position.js
 */
import config from '@/config'
import http from '@/utils/request'

const resquest = config.API_URL

// 获取岗位分页列表
export function sysPosPage(params) {
	return http.get(`${resquest}/sysPos/page`, params)
}

// 获取所有岗位列表
export function sysPosList(params) {
	return http.get(`${resquest}/sysPos/list`, params)
}
// 增加岗位
export function sysPosAdd(params) {
	return http.post(`${resquest}/sysPos/add`, params)
}
// 编辑岗位
export function sysPosEdit(params) {
	return http.post(`${resquest}/sysPos/edit`, params)
}
// 删除岗位
export function sysPosDelete(params) {
	return http.post(`${resquest}/sysPos/delete`, params)
}
