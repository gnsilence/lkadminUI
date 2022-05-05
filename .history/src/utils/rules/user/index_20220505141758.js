/*
 * @Author: gongnan
 * @Date: 2022-05-05 14:17:08
 * @LastEditors: gongnan
 * @LastEditTime: 2022-05-05 14:17:58
 * @Description: file content
 * @FilePath: \front\src\utils\rules\user\index.js
 */
const user_rules = {
	name: [{
		required: true,
		message: '请输入用户名称',
		trigger: ['change', 'blur']
	}, {
		max: 20,
		message: '最多15汉字字符',
		trigger: ['change', 'blur']
	}],
	PRICE: [{
		required: true,
		validator: validaNumPrice,
		trigger: ['change', 'blur']
	}],
	TIME_LIMIT: [{
		required: true,
		validator: validaNumPrice,
		trigger: ['change', 'blur']
	}],
	SORT: [{
		required: true,
		message: '请输入排序号',
		trigger: ['change', 'blur']
	}, {
		validator: validaNum,
		message: '请正确输入排序号',
		trigger: ['change', 'blur']
	}]
}
