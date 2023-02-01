import layout from '../components/Layout/Layout'
import {routingArea} from '../routerConfig/routingArea'
/**
 * Routes that require authorized access
 */
const asyncRoutesChildren = [
  {
    path: routingArea.console,
    name: 'home',
    meta: {
      roles: ['admin', 'editor', 'test'],
      title: '主页',
      icon: 'home',
      keepAlive: true
    },
    component: () => import('pages/home/home')
  },
  {
    path: routingArea.console + '/user',
    name: 'user',
    meta: {
      roles: ['admin', 'user', 'test'],
      title: '个人管理',
      itemLabel: '用户区域',
      icon: 'person',
      keepAlive: true
    },
    component: layout,
    children: [
      {
        path: 'self-edit',
        name: 'self-edit',
        meta: {
          roles: ['admin', 'user', 'test'],
          title: '个人信息',
          icon: 'reorder',
          keepAlive: true
        },
        component: () => import('pages/user/selfEdit')
      }
    ]
  },
  {
    path: '/buy',
    name: 'buy',
    meta: {
      roles: ['admin','user'],
      title: '在线购买',
      icon: 'coronavirus',
      keepAlive: true
    },
    component: layout,
    children: [
      {
        path: 'card-buy',
        name: 'card-buy',
        meta: {
          roles: ['admin', 'user', 'test'],
          title: '卡密授权',
          icon: 'reorder',
          keepAlive: true
        },
        component: () => import('pages/user/selfEdit')
      },
      {
        path: 'card-buy-true',
        name: 'card-buy-true',
        meta: {
          roles: ['admin', 'user', 'test'],
          title: '购买卡密',
          icon: 'reorder',
          keepAlive: true
        },
        component: () => import('pages/user/selfEdit')
      },
      {
        path: 'app-buy-true',
        name: 'app-buy-true',
        meta: {
          roles: ['admin', 'user', 'test'],
          title: '购买应用',
          icon: 'reorder',
          keepAlive: true
        },
        component: () => import('pages/user/selfEdit')
      },
      {
        path: 'usergroup-buy-true',
        name: 'usergroup-buy-true',
        meta: {
          roles: ['admin', 'user', 'test'],
          title: '购买用户组',
          icon: 'reorder',
          keepAlive: true
        },
        component: () => import('pages/user/selfEdit')
      },
      {
        path: 'balance-buy-true',
        name: 'balance-buy-true',
        meta: {
          roles: ['admin', 'user', 'test'],
          title: '充值余额',
          icon: 'reorder',
          keepAlive: true
        },
        component: () => import('pages/user/selfEdit')
      }
    ]
  },
  {
    path: routingArea.console + '/app',
    name: 'app',
    meta: {
      roles: ['admin', 'user', 'test'],
      title: '应用管理',
      itemLabel: '应用区域',
      icon: 'integration_instructions',
      keepAlive: true
    },
    component: layout,
    children: [
      {
        path: 'app-list',
        name: 'app-list',
        meta: {
          roles: ['admin', 'user', 'test'],
          title: '应用列表',
          icon: 'reorder',
          keepAlive: true
        },
        component: () => import('pages/app/appList')
      },
      {
        path: 'app-edit',
        name: 'app-edit',
        meta: {
          roles: ['admin', 'user', 'test'],
          title: '应用修改',
          icon: 'reorder',
          keepAlive: true
        },
        component: () => import('pages/user/selfEdit')
      },
    ]
  },
  {
    path: routingArea.console + '/version',
    name: 'version',
    meta: {
      roles: ['admin', 'user', 'test'],
      title: '版本管理',
      icon: 'all_inclusive',
      keepAlive: true
    },
    component: layout,
    children: [
      {
        path: 'version-list',
        name: 'version-list',
        meta: {
          roles: ['admin', 'user', 'test'],
          title: '版本列表',
          icon: 'reorder',
          keepAlive: true
        },
        component: () => import('pages/user/selfEdit')
      }
    ]
  },
  {
    path: routingArea.console + '/umanagement',
    name: 'umanagement',
    meta: {
      roles: ['admin', 'user', 'test'],
      title: '用户管理',
      icon: 'people',
      keepAlive: true
    },
    component: layout,
    children: [
      {
        path: 'user-list',
        name: 'user-list',
        meta: {
          roles: ['admin', 'user', 'test'],
          title: '用户列表',
          icon: 'reorder',
          keepAlive: true
        },
        component: () => import('pages/user/selfEdit')
      },
      {
        path: 'app-edit',
        name: 'app-edit',
        meta: {
          roles: ['admin', 'user', 'test'],
          title: '用户修改',
          icon: 'reorder',
          keepAlive: true,
          isHidden: true
        },
        component: () => import('pages/user/selfEdit')
      },
    ]
  },
  {
    path: routingArea.console + '/announcement',
    name: 'announcement',
    meta: {
      roles: ['admin', 'user', 'test'],
      title: '公告管理',
      icon: 'article',
      keepAlive: true,
    },
    component: layout,
    children: [
      {
        path: 'user-list',
        name: 'user-list',
        meta: {
          roles: ['admin', 'user', 'test'],
          title: '公告列表',
          icon: 'reorder',
          keepAlive: true
        },
        component: () => import('pages/user/selfEdit')
      }
    ]
  },
  {
    path: '/admin',
    name: 'admin',
    meta: {
      roles: ['admin'],
      title: '网站配置',
      itemLabel: '后台区域',
      icon: 'coronavirus',
      keepAlive: true
    },
    component: () => import('pages/lottie/lottie')
  },
  {
    path: '/card',
    name: 'card',
    meta: {
      roles: ['admin'],
      title: '卡密管理',
      icon: 'coronavirus',
      keepAlive: true
    },
    component: () => import('pages/lottie/lottie')
  },
  {
    path: '*', // This must be placed at the bottom
    redirect: '/NoFound404',
    meta: {
      roles: ['admin', 'test'],
      isHidden: true
    }
  }
]

const asyncRoutes = [
  {
    path: routingArea.console,
    name: 'console',
    redirect: routingArea.console,
    component: () => import('layouts/MainLayout'),
    children: asyncRoutesChildren
  },
  {
    path: '*', // 此处需置于最底部
    redirect: '/NoFound404',
    meta: {
      isHidden: true
    }
  }
]

export default asyncRoutes

export { asyncRoutesChildren }
