// import router from '@/router' // 引入路由实例
// import store from '@/store' // 引入store实例

// // 全局前置守卫
// router.beforeEach((to, from, next) => {
//   const whiteList = ['/404', '/login']
//   // 判断是否有无token
//   if (store.getters.token) {
//     // 如果有token 继续判断是不是登录页
//     if (to.path === '/login') {
//       next('/')
//       console.log(111)
//     } else {
//       next()
//     }
//   } else {
//     if (whiteList.indexOf(to.path) > -1) {
//       next()
//     } else {
//       next('/login')
//     }
//   }
// })

// // 后置守卫
// router.afterEach(() => {})

