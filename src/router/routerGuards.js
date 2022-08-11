import storage from '@/utils/storage'
import global from '@/enums/global'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({ showSpinner: false })

export function createRouterGuards(router) {
  const whitePathList = ['/login'] //白名单放行

  router.beforeEach((to, from, next) => {
    if (import.meta.env.DEV) {
      next()
    }

    if (!NProgress.isStarted()) {
      NProgress.start()
    }

    if (whitePathList.includes(to.path)) {
      next()
      return
    }

    const token = storage.get('ACCESS_TOKEN')
    if (!token) {
      //如果meta忽略权限
      if (to.meta.ignoreAuth) {
        next()
        return
      }
      //登录之后重定向
      const redirectData = {
        path: '/login',
        replace: true,
      }
      if (to.path) {
        redirectData.query = {
          ...redirectData.query,
          redirect: to.path,
        }
      }
      next(redirectData)
      return
    }
    const redirectPath = from.query.redirect || to.path
    const redirect = decodeURIComponent(redirectPath)
    const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect }
    next(nextData)
  })

  router.afterEach((to, from) => {
    document.title = to.meta.title || global.DOCUMENT_TITLE
    NProgress.done()
  })

  router.onError((error) => {
    console.log(error, '路由错误')
  })
}
