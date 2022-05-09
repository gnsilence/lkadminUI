/*
 * @Author: gongnan
 * @Date: 2022-05-05 14:17:08
 * @LastEditors: gongnan
 * @LastEditTime: 2022-05-05 15:19:27
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
	account: [{
		required: true,
		message: '请输入账号信息',
		trigger: ['change', 'blur']
	}, {
		max: 20,
		message: '最多15个英文字符',
		trigger: ['change', 'blur']
	}, {
		pattern: /^[A-Za-z]*(\s[A-Za-z]*)*$/,
		message: '请输入英文字符',
		trigger: ['change', 'blur']
	}],
	password: [{
		required: true,
		trigger: ['change', 'blur']
	}, {
		message: '请输入密码',
		trigger: ['blur', 'change']
	}],
	confirmpwd: [{
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
const user_emp_rules = {
	jobNum: [{
		required: true,
		message: '请输入工号',
		trigger: ['change', 'blur']
	}, {
		max: 20,
		message: '最多20个字',
		trigger: ['change', 'blur']
	}],
	orgId: [{
		required: true,
		message: '请选择直属部门',
		trigger: ['change', 'blur']
	}]
}
function validaPassword(rule, value, callback) {
	if (!value.cpwd) {
		callback(new Error('请再次输入密码!'))
	} else {
		if (value.pwd !== value.cpwd) {
			callback(new Error('两次密码输入不一致'))
		} else {
			callback()
		}
	}
}

export {
	user_rules,
	user_emp_rules
}
