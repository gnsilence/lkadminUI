const release_rules = {
  leaderId: [{
    required: true,
    message: '请选择负责人姓名',
    trigger: 'blur'
  }],
  reason: [{
    required: true,
    message: '请输入原因',
    trigger: 'blur'
  }],

}

export default release_rules

