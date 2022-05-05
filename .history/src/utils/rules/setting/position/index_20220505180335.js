/*
 * @Author: gongnan
 * @Date: 2022-05-05 18:02:08
 * @LastEditors: gongnan
 * @LastEditTime: 2022-05-05 18:03:35
 * @Description: file content
 * @FilePath: \front\src\utils\rules\setting\position\index.js
 */
import {
	validaNum
} from '@/utils/rules/index.js'
const position_rules = {
	name: [{
		required: true,
		message: '请填写岗位名称',
		trigger: ['change', 'blur']
	}, {
		max: 10,
		message: '角色名称最多10个字',
		trigger: ['change', 'blur']
	}],
	code: [{
		required: true,
		message: '请填写岗位编码',
		trigger: ['change', 'blur']
	}, {
		max: 15,
		message: '岗位编码最多15个字',
		trigger: ['change', 'blur']
	}],
	sort: [{
		required: true,
		validator: validaNum,
		trigger: ['change', 'blur']
	}]
}

export {
	position_rules
}
