const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  // 不进行验证
  // lintOnSave:false,
  transpileDependencies: true,
  devServer: {
    port: 8080, // 端口号
    https: false, // https:{type:Boolean}
    open: false, //配置后自动启动浏览器
    // proxy: 'http://localhost:8080'   // 配置跨域处理,只有一个代理
    proxy: { //配置多个代理
      "/testIp": {
        target: "http://localhost:8088",
        changeOrigin: true,
        ws: true,//websocket支持
        secure: false,
        pathRewrite: {
          "^/testIp": "/"
        }
      },
      "/elseIp": {
        target: "http://197.0.0.2:8088",
        changeOrigin: true,
        //ws: true,//websocket支持
        secure: false,
        pathRewrite: {
          "^/elseIp": "/"
        }
      },
    }
  }
})

