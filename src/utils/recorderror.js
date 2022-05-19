/*
 * @Author: gongnan
 * @Date: 2022-05-12 16:21:00
 * @LastEditors: gongnan
 * @LastEditTime: 2022-05-12 18:22:55
 * @Description: file content
 * @FilePath: \front\src\utils\recorderror.js
 */
import {
	record
} from 'rrweb'
export function save() {
	console.log('开始写日志')
	var events = []
	let stopFn = record({
		emit(event) {
			events.push(event)
			if (events.length == 15) {
				console.log('%c⧭', 'color: #7f7700', 1111111)
				localStorage.setItem('rrweb', JSON.stringify(events))
				// 用任意方式存储 event
				stopFn()
			}

		},
	});
}