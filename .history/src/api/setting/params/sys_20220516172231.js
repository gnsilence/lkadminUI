/*
 * @Author: gongnan
 * @Date: 2022-05-16 15:10:09
 * @LastEditors: gongnan
 * @LastEditTime: 2022-05-16 17:22:31
 * @Description: file content
 * @FilePath: \front\src\api\setting\params\sys.js
 */
import config from '@/config'
import http from '@/utils/request'

const resquest = config.API_URL

// 系统设置-业务参数-参数列表（分页获取右侧列表）
export function getValPage(params) {
	return http.get(`${resquest}/sysParam/detail`, params)
}

// 系统设置-业务参数-新增业务参数
export function addBusVal(params) {
	return http.post(`${resquest}/BusinessValue/addBusVal`, params)
}
