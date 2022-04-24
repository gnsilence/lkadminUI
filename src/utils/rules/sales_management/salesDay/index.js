// import { validaNum } from '@/utils/rules/index.js'
const filtrate_rules = {
  CustomerName: [{
    max: 30,
    message: '参数值最多只能输入30个汉字字符',
    trigger: ['change', 'blur']
  }]
}

export {
  filtrate_rules
}
