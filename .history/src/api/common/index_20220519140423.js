/*
 * @Author: gongnan
 * @Date: 2022-05-19 14:03:06
 * @LastEditors: gongnan
 * @LastEditTime: 2022-05-19 14:04:23
 * @Description: file content
 * @FilePath: \front\src\api\common\index.js
 */
import config from '@/config'
import http from '@/utils/request'

const resquest = config.API_URL

// 合并文件上传
export function Compose(params) {
	return http.post(`${resquest}/oss/Minio/Compose`, params)
}
