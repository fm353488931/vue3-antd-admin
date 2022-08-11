// 跟鉴权无关的特殊路由
const exceptionRoutes = [
  {
    path: '/403',
    name: '403',
    component: () => import('@/views/exception/403.vue'),
    meta: {
      title: '403',
    },
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/exception/404.vue'),
    meta: {
      title: '404',
    },
  },
  {
    path: '/500',
    name: '500',
    component: () => import('@/views/exception/500.vue'),
    meta: {
      title: '500',
    },
  },
  {
    path: '/:pathMatch(.*)',
    meta: {},
    redirect: '/404',
  },
]

export default exceptionRoutes
