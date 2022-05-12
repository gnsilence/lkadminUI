/*
 * @Author: gongnan
 * @Date: 2022-05-12 16:21:00
 * @LastEditors: gongnan
 * @LastEditTime: 2022-05-12 16:32:06
 * @Description: file content
 * @FilePath: \front\src\utils\recorderror.js
 */
import {
	record
} from 'rrweb'
import {
	useIntervalFn
} from '@vueuse/core'
export function save() {
	const {
		pause,
		resume,
		isActive
	} = useIntervalFn(() => {
		let stopFn = record({
			emit(event) {
				console.log('%c⧭', 'color: #7f7700', event)
				// 用任意方式存储 event
			},
		});
	}, 1000)
}
