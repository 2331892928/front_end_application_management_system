import {refreshKey} from "src/api/UserApi";

const routerConfig = {
  // rootUrl: rootUrl,
  // semanticSearchUrl: rootUrl + '/search/semantic',
  // detailUrl: rootUrl + '/detail',
  // summaryUrl: rootUrl + '/summary',
  // transformUrl: rootUrl + '/transform',
  // keywordPickUrl: rootUrl + '/keywordpick'
  proxy: '/api',
  UserService: {
    main: '/user',
    logon: '/logon',
    out: '/out',
    istoken: '/istoken',
    refreshKey: '/refreshKey'
  },
  ConfigService: {
    main: '/config',
    get: '/get'
  },
  AppService: {
    main: '/app',
    getAppList:'/getapplist'
  }
}
// export default routerConfig
export {
  routerConfig
}
