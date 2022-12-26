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
  }
}
// export default routerConfig
export {
  routerConfig
}
