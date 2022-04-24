const logs_rules = {
  name: [{
    required: true,
    message: '请选择操作人',
    trigger: ['change', 'blur']
  }],
  typeId: [{
    required: true,
    message: '请选择操作类型',
    trigger: ['change', 'blur']
  }],
  operationStartTime: [{
    required: true,
    message: '请选择开始时间',
    trigger: ['change', 'blur']
  }],
  operationEndTime: [{
    required: true,
    message: '请选择结束时间',
    trigger: ['change', 'blur']
  }]
}

export {
  logs_rules
}
