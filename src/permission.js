import router from './router'
import store from './store'
// import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
// import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import { constantRoutes, asyncRoutes } from '@/router/index'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

// const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()
  // 判断要去的页面
  if (to.path === '/login') {
    // 如果要去的是登录页  放行
    if (store.getters.token) {
      next('/')
    } else {
      next()
    }
  } else {
    // 如果是去除了登录页以外的页面 :
    // 1.判断是否有token值 :
    // a) 如果有 :判断是否vuex已经有个人信息,如果没有 要先获取用户的资料存在vuex中
    // b)如果没有,则不准用户进去这个页面 应该要跳转到登录页
    if (store.getters.token) {
      if (!store.state.user.userInfo) {
        await store.dispatch('user/getUser')

        const { menus } = store.state.user.permission
        console.log(menus)
        const routes = []
        // 找到符合权限列表 对应的 路由名字
        menus.forEach(item => {
          const route = asyncRoutes.find(obj => obj.name === item.substr(3))
          if (route) {
            routes.push(route)
          }
        })
        // 动态添加路由
        router.options.routes = [...constantRoutes, ...routes]
        router.addRoutes([...routes, { path: '*', redirect: '/404', hidden: true }])
        next(to.path)
      } else {
        next()
      }
    } else {
      next('/login')
    }
  }
  NProgress.done()
  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  // const hasToken = getToken()

  // if (hasToken) {
  //   if (to.path === '/login') {
  //     // if is logged in, redirect to the home page
  //     next({ path: '/' })
  //     NProgress.done()
  //   } else {
  //     const hasGetUserInfo = store.getters.name
  //     if (hasGetUserInfo) {
  //       next()
  //     } else {
  //       try {
  //         // get user info
  //         await store.dispatch('user/getInfo')

  //         next()
  //       } catch (error) {
  //         // remove token and go to login page to re-login
  //         await store.dispatch('user/resetToken')
  //         Message.error(error || 'Has Error')
  //         next(`/login?redirect=${to.path}`)
  //         NProgress.done()
  //       }
  //     }
  //   }
  // } else {
  //   /* has no token*/

  //   if (whiteList.indexOf(to.path) !== -1) {
  //     // in the free login whitelist, go directly
  //     next()
  //   } else {
  //     // other pages that do not have permission to access are redirected to the login page.
  //     next(`/login?redirect=${to.path}`)
  //     NProgress.done()
  //   }
  // }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
