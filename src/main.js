import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

import mqtt from 'mqtt'
var client = mqtt.connect('ws://13.210.107.17:8083/mqtt')
// const client = mqtt.connect('')
// mqtt连接
client.on('connect', (e) => {
  // console.log('连接成功:')
})

// 断开发起重连
client.on('reconnect', (error) => {
  // console.log('正在重连:', error)
})
// 链接异常处理
client.on('error', (error) => {
  // console.log('连接失败:', error)
})

Vue.prototype.$mqttClient = client

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
