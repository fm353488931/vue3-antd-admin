import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router, { setupRouter } from './router'
import api from '@/api'
import './utils/init'
import './styles/index.less'

//第三方库
import AntD from 'ant-design-vue'
import { message } from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

import { create, NNumberAnimation } from 'naive-ui'
const naive = create({
  components: [NNumberAnimation], //数字动效
})

import * as dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')

async function bootstrap() {
  const app = createApp(App)
  app.use(createPinia()) // 挂载状态管理
  await setupRouter(app) // 挂载路由
  await router.isReady() // 路由准备就绪

  app.use(AntD)
  app.use(naive)

  window.$api = api
  window.$message = message
  window.$dayjs = dayjs

  app.mount('#app', true)
}
bootstrap()
