const contract_rules = {
  customerName: [{
    required: true,
    message: '请选择客户名称',
    trigger: 'blur'
  }],
  isStandard: [{
    required: true,
    message: '请选择是否标准合同',
    trigger: 'blur'
  }],
  receLinkman: [{
    required: true,
    message: '请输入回款联系人',
    trigger: 'blur'
  }],
  signType: [{
    required: true,
    message: '请选择签约类型',
    trigger: 'blur'
  }],
  signDate: [{
    required: true,
    message: '请选择签约日期',
    trigger: 'blur'
  }],
  contractLimit: [{
    required: true,
    message: '请输入合同期限',
    trigger: 'blur'
  }],
  paytMentType: [{
    required: true,
    message: '请选择付款方式',
    trigger: 'blur'
  }],
  signCompanyValue: [{
    required: true,
    message: '请选择签约主体公司',
    trigger: 'blur'
  }],
  cost: [{
    required: true,
    message: '请输入数字',
    trigger: 'blur'
  }],
  costRemark: [{
    required: true,
    message: '请输入成本说明',
    trigger: 'blur'
  }],
  productValue: [{
    required: true,
    message: '请选择产品名称',
    trigger: 'blur'
  }],
  payMentTypeValue: [{
    required: true,
    message: '请选择付款方式',
    trigger: 'blur'
  }],
  price: [{
    required: true,
    message: '请输入金额',
    trigger: 'blur'
  }],
  expectPayDate: [{
    required: true,
    message: '请选择日期',
    trigger: 'blur'
  }]

}

const contract_edit_rules = {
  // customerName: [{
  //   required: true,
  //   message: '请选择客户名称',
  //   trigger: 'blur'
  // }],
  isStandard: [{
    required: true,
    message: '请选择是否标准合同',
    trigger: 'blur'
  }],
  receLinkman: [{
    required: true,
    message: '请输入回款联系人',
    trigger: 'blur'
  }],
  signType: [{
    required: true,
    message: '请选择签约类型',
    trigger: 'blur'
  }],
  signDate: [{
    required: true,
    message: '请选择签约日期',
    trigger: 'blur'
  }],
  contractLimit: [{
    required: true,
    message: '请输入合同期限',
    trigger: 'blur'
  }],
  paytMentTypeVal: [{
    required: true,
    message: '请选择付款方式',
    trigger: 'blur'
  }],
  signCompanyValue: [{
    required: true,
    message: '请选择签约主体公司',
    trigger: 'blur'
  }],
  cost: [{
    required: true,
    message: '请输入数字',
    trigger: 'blur'
  }],
  costRemark: [{
    required: true,
    message: '请输入成本说明',
    trigger: 'blur'
  }],
  payMentTypeVal: [{
    required: true,
    message: '请选择付款方式',
    trigger: 'blur'
  }],
  price: [{
    required: true,
    message: '请输入金额',
    trigger: 'blur'
  }],
  expectPayDate: [{
    required: true,
    message: '请选择日期',
    trigger: 'blur'
  }]

}

const filtrate_rules={
  contractLimit:[
    {
      validator: function (rule, value, callback) {

        if (value) {
          if (value.contractLimitMin >= 0 && value.contractLimitMax >= 0) {
            if (value.contractLimitMin > value.contractLimitMax){
              callback(new Error('后置条件需大于前置条件'))
            }
          }
        }
        callback()
      },
      trigger: ['change', 'blur']
    }
  ],
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
  }]
}
export {
  contract_rules,
  filtrate_rules,
  contract_edit_rules
}
