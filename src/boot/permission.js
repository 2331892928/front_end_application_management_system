import { setBreadcrumbs } from 'components/Breadcrumbs/BreadcrumbsUtils'
import LoadingBar from '../components/LoadingBar/LoadingBar'
import constantRoutes from '../router/constantRoutes'
import { addTagView, setTagView } from 'components/TagView/TagViewUtils'
import {Cookies, Notify} from "quasar";
import {isToken, out} from "src/api/UserApi";
import router from "src/router";
import {getConfig} from "src/api/ConfigApi";

/**
 * Navigation guard and permission verification
 * @param app
 * @param router
 * @param Vue
 * @param store
 * @returns {Promise<void>}
 */
export default async ({ app, router, Vue, store }) => {
  router.beforeEach((to, from, next) => {
    // Process TAGVIEW and breadcrumbs after successful login
    handleTagViewAndBreadcrumbsAndKeepAlive(from, to, store, Vue, next)

    //先查询网站配置
    // Simulate obtaining token
    sessionStorage.setItem('access_token',9898)
    const token = sessionStorage.getItem('access_token')
    // const token = Cookies.get('token')
    const userRole = sessionStorage.getItem('user_role')
    // There is a token indicating that you have logged in

    if (token) {
      //如果是公告路由，不进入,除开logon
      if (constantRoutes.some((item) => { return item.path === to.path })) {
        if (to.path !== '/logon'){
          next()
          return
        }

      }
      // 检测token是否有效
      isToken(token).then((e)=>{
        if (e.data.code === 200 ){
          // You cannot access the login interface after logging in
          if (to.path === '/logon') {
            next({ path: '/console' })
          }
          // There is user authority, and the route is not empty, then let go
          if (userRole && store.getters.getRoutes.length) {
            next()
          } else {
            // Simulate when user permissions do not exist, obtain user permissions
            const userRole = sessionStorage.getItem('user_role')
            if (userRole === null){
              console.log(111)
              out().then((e)=>{
                next({path:'/logon'})
              }).catch((e)=>{
                next({path:'/NoFound500'})
              })
            }
            // And set the corresponding route according to the permissions
            store.commit('SET_ROLES_AND_ROUTES', userRole)
            // If you are prompted that addRoutes is deprecated, use the spread operator to complete the operation
            // router.addRoute(...store.getters.getRoutes)
            router.addRoutes(store.getters.getRoutes)
            // If addRoutes is not completed, the guard will execute it again
            next({ ...to, replace: true })
          }
        } else {
          // 跳转回登陆页面
          // if (to.path !== '/login') {
          //   next({ path: '/login' })
          // }

          if (constantRoutes.some((item) => { return item.path === to.path })) {
            next()
          } else {
            next({ path: '/logon' })
          }
          Notify.create({
            icon: 'announcement',
            message: e.data.msg,
            color: 'green',
            position: 'top',
            timeout: 1500
          })
        }
      })
    } else {
      // go to a route that does not require authorization
      if (constantRoutes.some((item) => { return item.path === to.path })) {
        next()
      } else {
        next({ path: '/logon' })
      }
    }
  })
  router.afterEach(() => {
    // Use multiple stop() to ensure that LoadingBar is properly closed after dynamically adding routes
    LoadingBar.stop()
    LoadingBar.stop()
  })
}

/**
 * Processing tagView and breadcrumbs
 * @param from
 * @param to
 * @param store
 * @param Vue
 * @param next
 */
function handleTagViewAndBreadcrumbsAndKeepAlive (from, to, store, Vue, next=null) {
  if (to.name != null) {
    getConfig().then((e)=>{
      // 放入session
      if (e.data.code === 200){
        sessionStorage.setItem('web_config', JSON.stringify(e.data.data[0]));
        if (to.meta.title === undefined || to.meta.title === '') {
          document.title = e.data.data[0].Title
        } else {
          document.title = to.meta.title + ' | ' + e.data.data[0].Title
        }
        //查询是否关闭网站
        if (e.data.data[0].webStatus !== "1"){
          next({path:'/NoFound503'})
          Notify.create({
            icon: 'announcement',
            message: e.data.data[0].webStopDesc,
            color: 'red',
            position: 'top',
            timeout: 1500
          })
        }
      } else {
        next({path:'/NoFound503'})
        Notify.create({
          icon: 'announcement',
          message: e.data.msg,
          color: 'red',
          position: 'top',
          timeout: 1500
        })
      }

    }).catch((e)=>{
      next({path:'/NoFound503'})
      this.$q.notify({
        icon: 'announcement',
        message: "服务器错误",
        color: 'red',
        position: 'top',
        timeout: 1500
      })
      // if (to.meta.title === undefined || to.meta.title === '') {
      //   document.title = Vue.prototype.$title
      // } else {
      //   document.title = to.meta.title + Vue.prototype.$title
      // }
    })
    // document.title = to.meta.title + Vue.prototype.$title
    LoadingBar.start()
    // is a public route ?
    for (let i = 0; i < constantRoutes.length; i++) {
      if (constantRoutes[i].path === to.path) {
        return
      }
    }
    // Determine whether it is a refresh operation,
    // if it is a refresh operation, get the saved tagView information from sessionStorage
    let tagViewOnSS = []

    JSON.parse(window.sessionStorage.getItem('tagView')) === null ? window.sessionStorage.setItem('tagView', '[]') : tagViewOnSS = JSON.parse(window.sessionStorage.getItem('tagView'))
    if (store.getters.getTagView.length === 0 && tagViewOnSS.length !== 0) {
      setTagView(tagViewOnSS)
      store.commit('SET_KEEPALIVE_LIST', tagViewOnSS)
    } else if (from.fullPath !== to.fullPath) {
      addTagView(to)
    }
    setBreadcrumbs(to.matched, to.query)
    handleKeepAlive(to)
  }
}

/**
 * Handle redundant layout: router-view and keep the current component under the first layer index <router-view>
 * This method cannot filter the on-demand loading <layout> used for nested routing
 * @param to
 */
function handleKeepAlive (to) {
  if (to.matched && to.matched.length > 2) {
    for (let i = 0; i < to.matched.length; i++) {
      const element = to.matched[i]
      if (element.components.default.name === 'Layout') {
        to.matched.splice(i, 1)
        handleKeepAlive(to)
      }
    }
  }
}

/**
 * This method can filter on-demand loading <layout> used for nested routing
 * @param to
 */
// async function handleKeepAlive (to) {
//   if (to.matched && to.matched.length > 2) {
//     for (let i = 0; i < to.matched.length; i++) {
//       const element = to.matched[i]
//       if (element.components.default.name === 'Layout') {
//         to.matched.splice(i, 1)
//         await handleKeepAlive(to)
//       }
//       if (typeof element.components.default === 'function') {
//         await element.components.default()
//         await handleKeepAlive(to)
//       }
//     }
//   }
// }
