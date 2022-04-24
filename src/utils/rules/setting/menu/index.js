const menu_rules = {
  'meta.title': [{
    required: true,
    message: '请填写显示名称',
    trigger: ['change', 'blur']
  }],
  'meta.type': [{
    required: true,
    message: '请选择类型',
    trigger: ['change', 'blur']
  }],
  'name': [{
    required: true,
    message: '请填写别名',
    trigger: ['change', 'blur']
  }],
  'path': [{
    required: true,
    message: '请填写路由地址',
    trigger: ['change', 'blur']
  }],
  'component': [{
    required: true,
    message: '请填写视图',
    trigger: ['change', 'blur']
  }],
  'permission': [{
    required: true,
    message: '请填权限标识',
    trigger: ['change', 'blur']
  }]
}

export {
  menu_rules
}
