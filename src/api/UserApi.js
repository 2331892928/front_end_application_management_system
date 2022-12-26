import _axios from '../axios/AxiosConfig'
import Vue from 'vue'
import { routerConfig } from '../routerConfig/routerConfig'

export function getUserRouter () {
  return _axios({
    url: Vue.prototype.$PUBLIC_PATH + 'data/asyncRouterDemo',
    method: 'get',
    responseType: 'text'
  })
}
export function UserLogon(username,password){
  return _axios({
    url: routerConfig.proxy + routerConfig.UserService.main + routerConfig.UserService.logon,
    method: 'post',
    responseType: 'json',
    params: {
      username: username,
      password: password,
      // ticket: ticket,
      // randstr: randstr
    }
  })
}
export function isToken(token){
  return _axios({
    url: routerConfig.proxy + routerConfig.UserService.main + routerConfig.UserService.istoken,
    method: 'post',
    responseType: 'json',
    params: {
      token: token,
    }
  })
}
export function out(){
  return _axios({
    url: routerConfig.proxy + routerConfig.UserService.main + routerConfig.UserService.out,
    method: 'get',
    responseType: 'json',
  })
}
export function refreshKey(){
  return _axios({
    url: routerConfig.proxy + routerConfig.UserService.main + routerConfig.UserService.refreshKey,
    method: 'get',
    responseType: 'json',
  })
}
