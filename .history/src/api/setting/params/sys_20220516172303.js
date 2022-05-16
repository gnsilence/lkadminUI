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

// 获取系统参数设置
export function getValPage(params) {
	return http.get(`${resquest}/sysParam/detail`, params)
}

// 保存系统参数设置
export function addBusVal(params) {
	return http.post(`${resquest}/sysParam/save`, params)
}
