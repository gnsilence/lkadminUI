/*
 * @Author: gongnan
 * @Date: 2022-05-11 15:50:17
 * @LastEditors: gongnan
 * @LastEditTime: 2022-05-11 15:50:18
 * @Description: file content
 * @FilePath: \front\src\utils\cache.js
 */
import WebStorageCache from 'web-storage-cache'

// 设置缓存值及过期时间
export function set(key,value,exp) {
	var cache = new WebStorageCache()
	cache.set(key, value, {
		exp: exp
	})
}
// 获取缓存的值
export function get(key) {
	var cache = new WebStorageCache()
	cache.get(key)
}
// 删除指定的可以
export function remove (key) {
	var cache = new WebStorageCache()
	cache.delete(key)
}
// 手动删除所有超时的存储
export function removeAllExpires() {
	var cache = new WebStorageCache()
	cache.deleteAllExpires()
}
// 清除所有缓存
export function removeAll() {
	var cache = new WebStorageCache()
	cache.clear()
}
// 手动为未设置超时的存储，设置超时时间
export function touch(key,exp) {
	var cache = new WebStorageCache()
	cache.touch(key,exp)
}
