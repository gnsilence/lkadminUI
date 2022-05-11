/*
 * @Author: gongnan
 * @Date: 2022-05-11 15:50:17
 * @LastEditors: gongnan
 * @LastEditTime: 2022-05-11 16:23:32
 * @Description: file content
 * @FilePath: \front\src\utils\cache.js
 */
import WebStorageCache from 'web-storage-cache'

export default {
	// 设置缓存值及过期时间
	set(key, value, exp) {
		var cache = new WebStorageCache()
		cache.set(key, value, {
			exp: exp
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
	removeAll() {
		var cache = new WebStorageCache()
		cache.clear()
	},
	touch(key, exp) {
		var cache = new WebStorageCache()
		cache.touch(key, exp)
	}
}
// // 设置缓存值及过期时间
// export function
// // 获取缓存的值
// export function
// // 删除指定的可以
// export function
// // 手动删除所有超时的存储
// export function
// // 清除所有缓存
// export function
// // 手动为未设置超时的存储，设置超时时间
// export function
