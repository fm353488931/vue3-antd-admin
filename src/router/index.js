import { createRouter, createWebHashHistory } from 'vue-router'
import { createRouterGuards } from './routerGuards'
import exceptionRoutes from './route.exception'
import Layout from '@/layout/index.vue'
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录',
    },
  },
  {
    path: '/',
    redirect: '/dashboard',
    component: Layout,
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: {
          title: '首页',
        },
      },
      {
        path: '/ExampleList',
        name: 'ExampleList',
        component: () => import('@/views/example/ExampleList.vue'),
        meta: {
          title: '表格示例',
        },
      },
      ...exceptionRoutes,
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

export function setupRouter(app) {
  app.use(router)
  // 创建路由守卫
  createRouterGuards(router)
}

export default router
