import mitter from '@/utils/mitter'

 // 全局定时器,每1秒向外面广播时间更新事件
const timer = setInterval(() => {
  mitter.emit('time_update')
}, 1000)

export default timer
