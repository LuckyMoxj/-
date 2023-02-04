import { createApp } from 'vue'
import App from './App.vue'
// 导入路由
import Router from './router'
// 导入element-plus组件库
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 导入icon
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import '@/assets/iconfont/iconfont.css'
// echart数据可视化图 [没有全局,放到局部了]
// 配置axios请求 [进行了封装]
// import axios from 'axios'
// import VueAxios from 'vue-axios'


const app = createApp(App)
app.use(Router)
app.use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.mount('#app')

