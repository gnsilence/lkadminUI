import { validaNum } from '@/utils/rules/index.js'
const role_rules = {
  Name: [{
    required: true,
    message: '请填写角色名称',
    trigger: ['change', 'blur']
  }, {
    max: 10,
    message: '角色名称最多15个字',
    trigger: ['change', 'blur']
  }],
  Sort: [{
    required: true,
    validator: validaNum,
    trigger: ['change', 'blur']
  }]
}

export {
  role_rules
}
