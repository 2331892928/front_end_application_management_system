import Vue from 'vue'

Vue.config.productionTip = false

Vue.prototype.$PUBLIC_PATH = process.env.VUE_ROUTER_BASE

// 浏览器 title
Vue.prototype.$title = ' | 湮灭应用/用户管理系统'

// 侧边栏风格
Vue.prototype.$SildeBar = 'hHh lpR fFf' // 风格二：lHh lpR fFf

// axios 中请求基地址，如果需要请在 axios/axiosConfig.js 中打开，下面是跨域代理示例
// Vue.prototype.$baseURL = process.env.NODE_ENV === 'development' ? '/api/' : '生产环境 API'
Vue.prototype.$baseURL = ''

// 请求超时时间
Vue.prototype.$timeOut = 8000

// 组件最大缓存数
Vue.prototype.$Max_KeepAlive = 10

// 侧边栏底部文字
Vue.prototype.$buttonList = [
  { text: '湮灭网络工作室', URL: 'https://www.ymypay.cn' },
  { text: 'Github', URL: 'https://github.com/2331892928/front_end_application_management_system' },
  { text: '关于作者', URL: 'https://www.ymypay.cn' },
  { text: 'Power by AMEN', URL: 'https://www.ymypay.cn' }
]
