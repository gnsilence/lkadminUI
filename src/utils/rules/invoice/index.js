import {
  checkInvoiceNo
} from '@/utils/rules/index'
const billing_rules = {
  invoiceNo: [{
    required: true,
    message: '请填写发票号',
    trigger: 'blur'
  }, {
    type: 'number',
    validator: checkInvoiceNo,
    message: '请正确输入发票号',
    trigger: ['blur', 'change']
  }],
  invoiceDate: [{
    required: true,
    message: '请选择开票日期',
    trigger: 'blur'
  }],

}
const tieMoney_rules = {
  hasPrice: [{
    required: true,
    message: '请填写已收金额',
    trigger: 'blur'
  }],
  hasDate: [{
    required: true,
    message: '请选择已收日期',
    trigger: 'blur'
  }],

}

const filtrate_rules = {
  signPrice: [{
    validator: function (rule, value, callback) {
      if (value) {
        if (value.signPriceMin >= 0 && value.signPriceMax >= 0) {
          if (value.signPriceMin > value.signPriceMax) {
            callback(new Error('后置条件需大于前置条件'))
          }
        }
      }
      callback()
    },
    trigger: ['change', 'blur']
  }],
  receivablePrice: [{
    validator: function (rule, value, callback) {

      if (value) {
        if (value.receivablePriceMin >= 0 && value.receivablePriceMax >= 0) {
          if (value.receivablePriceMin > value.receivablePriceMax) {
            callback(new Error('后置条件需大于前置条件'))
          }
        }
      }
      callback()
    },
    trigger: ['change', 'blur']
  }],
  hasPrice: [{
    validator: function (rule, value, callback) {

      if (value) {
        if (value.hasPriceMin >= 0 && value.hasPriceMax >= 0) {
          if (value.hasPriceMin > value.hasPriceMax) {
            callback(new Error('后置条件需大于前置条件'))
          }
        }
      }
      callback()
    },
    trigger: ['change', 'blur']
  }],
}

export {
  billing_rules,
  tieMoney_rules,
  filtrate_rules
}
