import _axios from '../axios/AxiosConfig'
import Vue from 'vue'
import { routerConfig } from '../routerConfig/routerConfig'

export function getAppList () {
  return _axios({
    url: routerConfig.proxy + routerConfig.AppService.main + routerConfig.AppService.getAppList,
    method: 'get',
    responseType: 'json'
  })
}
