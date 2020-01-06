import createApp from './create-app'
import bus from './bus/bus'
const { app, router } = createApp()

bus.$on('warning', () => {
  console.log('接收消息')
})
router.onReady(() => {
  app.$mount('#root')
})
