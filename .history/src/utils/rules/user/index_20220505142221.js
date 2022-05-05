/*
 * @Author: gongnan
 * @Date: 2022-05-05 14:17:08
 * @LastEditors: gongnan
 * @LastEditTime: 2022-05-05 14:22:21
 * @Description: file content
 * @FilePath: \front\src\utils\rules\user\index.js
 */
import {
	checkEmail
} from '@/utils/rules/index.js'
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
	password: [{
		required: true,
		validator: validaNumPrice,
		trigger: ['change', 'blur']
	}],
	email: [{
			required: false,
			message: '请输入邮箱地址',
			trigger: 'blur'
		},
		{
			validator: checkEmail,
			message: '请正确输入邮箱地址',
			trigger: ['blur', 'change']
		}
	]
}
