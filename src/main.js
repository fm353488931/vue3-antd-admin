import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { message } from 'ant-design-vue'
import App from './App.vue'
import router, { setupRouter } from './router'
import './utils/init'

import 'ant-design-vue/dist/antd.css'
import './styles/index.less'

async function bootstrap() {
  const app = createApp(App)

  // 挂载状态管理
  app.use(createPinia())

  // 挂载路由
  await setupRouter(app)
  // 路由准备就绪
  await router.isReady()

  app.provide('$message', message)
  app.mount('#app', true)
  // app.config.globalProperties.$message = message
}
bootstrap()
