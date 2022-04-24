import { validaNum } from '@/utils/rules/index.js'
const params_rules = {
  value: [{
    required: true,
    message: '请填写参数值',
    trigger: ['change', 'blur']
  }, {
    max: 30,
    message: '参数值最多只能输入30个汉字字符',
    trigger: ['change', 'blur']
  }],
  sort: [{
    required: true,
    message: '请输入排序号',
    trigger: ['change', 'blur']
  }, {
    validator: validaNum,
    message: '请正确输入排序号',
    trigger: ['change', 'blur']
  }]
}

export {
  params_rules
}
