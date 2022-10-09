import {
  createRouter,
  createWebHistory
} from 'vue-router'

import store from '../store'

import common from './routers/common'
import template from './routers/template'

import NProgress from 'nprogress'
NProgress.configure({
  showSpinner: false
}); // NProgress Configuration


let routes = [
  ...common,
  ...template
]

const router = createRouter({
  history: createWebHistory(
    import.meta.env.VITE_APP_NAME),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return {
      top: 0
    }
  },
})

router.beforeEach((to, from, next) => {
  NProgress.start()

  // 当前未登录
  if (!store.state.common.token && to.name != 'Login') {
    next({
      name: 'Login',
      query: {
        ...to.query,
        redirect: to.name
      },
    })
  }

  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router