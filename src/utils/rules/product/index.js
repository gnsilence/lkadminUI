import { validaNum } from '@/utils/rules/index.js'
const product_rules = {
  NAME: [{
    required: true,
    message: '请输入产品名称',
    trigger: ['change', 'blur']
  }, {
    max: 20,
    message: '最多20汉字字符',
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

function validaNumPrice(rule, value, callback) {
  if (value) {
    if (/^(?:[1-9]\d*)$/.test(value) === false) {
      callback(new Error('请输入正整数'))
    } else {
      callback()
    }
  } else {
    if (rule.fullField === 'TIME_LIMIT') {
      callback(new Error('请输入期限'))
    } else if (rule.fullField === 'PRICE') {
      callback(new Error('请输入价格'))
    } else if (rule.fullField === 'SORT') {
      callback(new Error('请输入排序'))
    }
  }
}

export {
  product_rules
}
