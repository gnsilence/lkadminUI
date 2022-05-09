/*
 * @Author: gongnan
 * @Date: 2022-05-09 16:11:46
 * @LastEditors: gongnan
 * @LastEditTime: 2022-05-09 16:13:03
 * @Description: file content
 * @FilePath: \front\src\api\setting\structure\user.js
 */
import config from '@/config'
import http from '@/utils/request'

const resquest = config.API_URL

// 用户管理-新增用户
export function Adduser(params) {
	return http.post(`${resquest}/sysUser/add`, params)
}
