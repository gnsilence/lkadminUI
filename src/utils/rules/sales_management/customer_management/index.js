/*
 * @Author: gongnan
 * @Date: 2022-03-03 14:50:50
 * @LastEditors: gongnan
 * @LastEditTime: 2022-03-04 09:46:31
 * @Description: file content
 * @FilePath: \scrm_front\src\utils\rules\sales_management\customer_management\index.js
 */
import {
  checkPhoneTel
} from '@/utils/rules/index'
const customer_rules = {
  name: [{
    required: true,
    message: '请填写客户名称',
    trigger: ['change', 'blur']
  }, {
    max: 30,
    message: '客户名称最多30个字',
    trigger: ['change', 'blur']
  }],
  linkMan: [{
    required: true,
    message: '请填写联系人',
    trigger: ['change', 'blur']
  }],
  linkManPhone: [{
    required: true,
    message: '请填写联系人电话',
    trigger: ['change', 'blur']
  }, {
    type: 'number',
    validator: checkPhoneTel,
    message: '请正确的联系人电话',
    trigger: ['blur', 'change']
  }],
  linkManPosition: [{
    required: true,
    message: '请填写职位',
    trigger: ['change', 'blur']
  }, {
    max: 30,
    message: '职位名称最多30个字',
    trigger: ['change', 'blur']
  }],
  level: [{
    required: true,
    message: '请填选择客户级别',
    trigger: ['change', 'blur']
  }],
  isCoop: [{
    required: true,
    message: '请选择合作状态',
    trigger: ['change', 'blur']
  }],
  addRess: [{
    max: 50,
    message: '详细地址最多可输入50个字',
    trigger: ['change', 'blur']
  }]
}

export {
  customer_rules
}
