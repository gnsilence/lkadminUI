/*
 * @Author: gongnan
 * @Date: 2022-05-05 14:17:08
 * @LastEditors: gongnan
 * @LastEditTime: 2022-05-05 14:25:30
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
		trigger: ['change', 'blur']
	}, {
		message: '请输入密码',
		trigger: ['blur', 'change']
	}],
	confirm: [{
		required: true,
		validator: validaPassword,
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

function validaPassword(rule, value, callback) {
	console.log('%c⧭', 'color: #ace2e6', value)
	if (!value.confirm) {
		callback(new Error('请再次输入密码!'))
	} else {
		if (value.password !== value.confirm) {
			callback(new Error('两次密码输入不一致'))
		} else {
			callback()
		}
	}
}
