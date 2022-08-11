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
        component: () => import('@/views/index.vue'),
        meta: {
          title: '首页',
        },
      },
      {
        path: '/banner',
        name: 'banner',
        component: () => import('@/views/banner/index.vue'),
        meta: {
          title: 'banner管理',
        },
      },
      {
        path: '/user',
        name: 'user',
        meta: {
          title: '用户管理',
        },
        children: [
          {
            path: 'performance',
            name: 'user_performance',
            meta: {
              title: '群演管理',
            },
            component: () => import('@/views/user/performance/index.vue'),
          },
          {
            path: 'head',
            name: 'user_head',
            meta: {
              title: '群头管理',
            },
            component: () => import('@/views/user/head/index.vue'),
          },
          {
            path: 'role',
            name: 'user_role',
            meta: {
              title: '选角公司',
            },
            component: () => import('@/views/user/role/index.vue'),
          },
          {
            path: 'crew',
            name: 'user_crew',
            meta: {
              title: '剧组管理',
            },
            component: () => import('@/views/user/crew/index.vue'),
          },
          {
            path: 'tourist',
            name: 'user_tourist',
            meta: {
              title: '游客管理',
            },
            component: () => import('@/views/user/tourist/index.vue'),
          },
          {
            path: 'auth',
            name: 'user_auth',
            meta: {
              title: '实名认证',
            },
            component: () => import('@/views/user/auth/index.vue'),
          },
        ],
      },
      {
        path: '/content',
        name: 'content',
        // component: () => import('@/views/content/index.vue'),
        meta: {
          title: '内容管理',
        },
        children: [
          {
            path: 'group',
            name: 'content_group',
            meta: {
              title: '跑组发布',
            },
            component: () => import('@/views/content/group/index.vue'),
          },
          {
            path: 'announce',
            name: 'content_announce',
            meta: {
              title: '通告发布',
            },
            component: () => import('@/views/content/announce/index.vue'),
          },
          {
            path: 'circle',
            name: 'content_circle',
            meta: {
              title: '圈子发布',
            },
            component: () => import('@/views/content/circle/index.vue'),
          },
        ],
      },
      {
        path: '/sensitive',
        name: 'sensitive',
        component: () => import('@/views/sensitive/index.vue'),
        meta: {
          title: '脱敏管理',
        },
      },
      {
        path: '/member',
        name: 'member',
        meta: {
          title: '会员管理',
        },
        children: [
          {
            path: 'bill',
            name: 'member_bill',
            meta: {
              title: '支付账单',
            },
            component: () => import('@/views/member/bill/index.vue'),
          },
          {
            path: 'config',
            name: 'member_config',
            meta: {
              title: '会员配置',
            },
            component: () => import('@/views/member/config/index.vue'),
          },
          {
            path: 'list',
            name: 'member_list',
            meta: {
              title: '会员列表',
            },
            component: () => import('@/views/member/list/index.vue'),
          },
        ],
      },
      {
        path: '/dicts',
        name: 'dicts',
        component: () => import('@/views/dicts/index.vue'),
        meta: {
          title: '数据字典',
        },
      },
      {
        path: '/system',
        name: 'system',
        // component: () => import('@/views/system/index.vue'),
        meta: {
          title: '系统管理',
        },
        children: [
          {
            path: 'role',
            name: 'system_list',
            meta: {
              title: '角色管理',
            },
            component: () => import('@/views/system/role/index.vue'),
          },
          {
            path: 'role',
            name: 'system_staff',
            meta: {
              title: '员工管理',
            },
            component: () => import('@/views/system/staff/index.vue'),
          },
        ],
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
