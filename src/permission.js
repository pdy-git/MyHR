import router from '@/router' // 引入路由实例
import store from '@/store' // 引入store实例

const whiteList = ['/404', '/login']

// 全局前置守卫
router.beforeEach(async(to, from, next) => {
  // 判断是否有无token
  if (store.getters.token) {
    // 如果有token 则视为已登录
    if (!store.getters.userId) {
      // 如果没有id这个值 才会调用 vuex的获取资料的action
      await store.dispatch('user/getUesrInfo')
      // 为什么要写await 因为我们想获取完资料再去放行
    }
    // 如果有token 继续判断是不是登录页
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    if (whiteList.includes(to.path)) {
      // 如果找到了 表示在白名单 正常跳转

      next()
    } else {
      next('/login')
      console.log(to.path)
    }
  }
})

