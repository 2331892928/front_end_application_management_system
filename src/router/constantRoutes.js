/**
 * constantRoutes : Users do not need to log in to access
 */
import {routingArea} from "../routerConfig/routingArea";

const constantRoutes = [
  {
    path: '/logon',
    name: 'logon',
    meta: {
      title: '登录'
    },
    component: () => import('pages/logon/logon.vue')
  },
  {
    path: '/',
    alias: ['/index','index1'],
    name: 'index',
    // register: router.index,
    meta: {
      title: ''
    },
    component: () => import('pages/logon/logon.vue')
  },
  {
    path: '/NoFound404',
    name: 'NoFound404',
    meta: {
      roles: ['admin', 'editor'],
      title: '404',
      icon: 'sentiment_dissatisfied',
      isHidden: true
    },
    component: () => import('../components/Error/NoFound404')
  },
  {
    path: '/NoFound500',
    name: 'NoFound500',
    meta: {
      roles: ['admin', 'editor'],
      title: '500',
      icon: 'sentiment_dissatisfied',
      isHidden: true
    },
    component: () => import('../components/Error/NoFound500')
  }
]

export default constantRoutes
