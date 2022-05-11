/*
 * @Author: gongnan
 * @Date: 2022-05-11 15:50:17
 * @LastEditors: gongnan
 * @LastEditTime: 2022-05-11 16:12:22
 * @Description: file content
 * @FilePath: \front\src\utils\cache.js
 */
import WebStorageCache from 'web-storage-cache'

export default {
	// 设置缓存值及过期时间
	set(key, value, expvalue) {
		var cache = new WebStorageCache()
		cache.set(key, value, {
			exp: expvalue
		})
	},
	// 获取缓存的值
	get(key) {
		var cache = new WebStorageCache()
		cache.get(key)
	},
	// 删除指定的缓存
	remove(key) {
		var cache = new WebStorageCache()
		cache.delete(key)
	},
	// 手动删除所有超时的存储
	removeAllExpires() {
		var cache = new WebStorageCache()
		cache.deleteAllExpires()
	},
	// 清除所有缓存
	removeAll() {
		var cache = new WebStorageCache()
		cache.clear()
	},
	// 手动为未设置超时的存储，设置超时时间
	touch(key, exp) {
		var cache = new WebStorageCache()
		cache.touch(key, exp)
	}
}
