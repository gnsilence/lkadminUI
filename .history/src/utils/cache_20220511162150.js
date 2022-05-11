/*
 * @Author: gongnan
 * @Date: 2022-05-11 15:50:17
 * @LastEditors: gongnan
 * @LastEditTime: 2022-05-11 16:21:50
 * @Description: file content
 * @FilePath: \front\src\utils\cache.js
 */
import WebStorageCache from 'web-storage-cache'

const wscache = new WebStorageCache({
	exp: 10 // 默认一个月,单位秒
})
export default wscache
