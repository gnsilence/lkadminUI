/*
 * @Author: gongnan
 * @Date: 2022-05-12 16:21:00
 * @LastEditors: gongnan
 * @LastEditTime: 2022-05-12 16:41:06
 * @Description: file content
 * @FilePath: \front\src\utils\recorderror.js
 */
import {
	record
} from 'rrweb'
export function save() {
	let stopFn = record({
		emit(event) {
			console.log('%c⧭', 'color: #7f7700', JSON.stringify(event))
			// 用任意方式存储 event
			stopFn()
		},
	});
}
