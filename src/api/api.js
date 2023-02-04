import http from '../utils/axios/http'
//
/**
 *  @parms resquest 请求地址 例如：http://197.82.15.15:8088/request/...
 *  @param '/testIp'代表vue-cil中config，index.js中配置的代理
 */
let resquest = "/testIp"

// get请求
export default{
    getListAPI(url,params){
        return http.get(`${resquest}`+url,params)
    },
    postFormAPI(url,params){
        return http.post(`${resquest}`+url,params)
    }
}
