import { validaPrice } from '@/utils/rules/index.js'
// 退款验证
const refund_rules = {
  refundAmount: [{
    required: true,
    validator: validaPrice,
    message: '请正确填写退款金额',
    trigger: ['change', 'blur']
  }]
}
const dispatch_rules = {
  planTime: [{
    required: true,
    message: '请选择预期上门时间',
    trigger: ['change', 'blur']
  }],
  limitTime: [{
    required: true,
    message: '请选择交单截止时间',
    trigger: ['change', 'blur']
  }],
  leaderId: [{
    required: true,
    message: '请选择接单人',
    trigger: ['change', 'blur']
  }]
}

const edit_rules = {
  photoRealityUrl: [
  {
    required: true,
    message: '请填写照片实景地址',
    trigger: ['change', 'blur']
  },
  {
    validator: function (rule, value, callback) {
        if (value) {
          if(value.length>200){
            callback(new Error('照片实景地址最多200个字符'))
          }
          if (!value.startsWith('https://720yun.com/t/')) {
            callback(new Error(`请填写以"https://720yun.com/t/"开头的地址`))
          }
        }
        callback()
      },
      trigger: ['change', 'blur']
  }],
  videoRealityUrl: [{
    validator: function (rule, value, callback) {
      if(value){
        if(value.length>200){
          callback(new Error('视频实景地址最多200个字符'))
        }
        if (!value.startsWith('https://720yun.com/video/')) {
          callback(new Error(`请填写以"https://720yun.com/video/"开头的地址`))
        }
      }
      callback()
    },
    trigger: ['change', 'blur']
  },]
  // enterpriseEnvironmentId: [{
  //   required: true,
  //   message: '请上传企业环境视频',
  //   trigger: ['change', 'blur']
  // }]
}

export {
  refund_rules,
  dispatch_rules,
  edit_rules
}
