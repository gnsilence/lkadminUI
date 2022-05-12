/*
 * @Author: gongnan
 * @Date: 2022-04-24 10:29:59
 * @LastEditors: gongnan
 * @LastEditTime: 2022-05-12 16:18:37
 * @Description: file content
 * @FilePath: \front\src\utils\errorHandler.js
 */
/*
 * 全局代码错误捕捉
 * 比如 null.length 就会被捕捉到
 */
import {
	record
} from 'rrweb'

export default (error, vm) => {
	console.log('%c⧭', 'color: #f279ca', error);
	record({
		emit(event) {
			console.log('%c⧭', 'color: #7f7700', event)
			// 用任意方式存储 event
		},
	});
	//过滤HTTP请求错误
	if (error.status) {
		return false
	}

	var errorMap = {
		InternalError: "Javascript引擎内部错误",
		ReferenceError: "未找到对象",
		TypeError: "使用了错误的类型或对象",
		RangeError: "使用内置对象时，参数超范围",
		SyntaxError: "语法错误",
		EvalError: "错误的使用了Eval",
		URIError: "URI错误"
	}
	var errorName = errorMap[error.name] || "未知错误"

	console.warn(`[lkadmin error]: ${error}`);
	console.error(error);
	//throw error;

	vm.$nextTick(() => {
		vm.$notify.error({
			title: errorName,
			message: error
		});
	})
}
