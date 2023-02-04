<template>
  <div class="login_background">
    <div class="videoContainer">
      <div align="center" class="admin_login">
        <el-row :gutter="10">
          <el-col :xs="2" :sm="3" :md="4" :lg="7" :xl="8"><div class="grid-content ep-bg-purple-light"/></el-col>
          <el-col :xs="20" :sm="18" :md="16" :lg="10" :xl="8">
            <el-card class="box-card">
              <h1>登录</h1>
              <el-form label-width="auto" :model="formLabelAlign" size="large" style="max-width: 460px">
                <el-form-item label="账号">
                  <el-input v-model="formLabelAlign.username" placeholder="请输入用户名" :prefix-icon="Avatar">
                  </el-input>
                </el-form-item>
                <el-form-item label="密码">
                  <el-input v-model="formLabelAlign.password" type="password" show-password  placeholder="请输入密码" :prefix-icon="Lock"/>
                </el-form-item>
                <el-form-item>
                  <Vcode :show="isShow" @success="success" @close="toclose" />
                  <el-button type="primary" @click="onSubmit">登录</el-button>
                </el-form-item>

              </el-form>
            </el-card>
          </el-col>
          <el-col :xs="2" :sm="3" :md="4" :lg="7" :xl="8"><div class="grid-content ep-bg-purple-light"/></el-col>
        </el-row>
      </div>
      <video class="fullscreenVideo" id="bgVid" playsinline="" autoplay="" muted="" loop="">
        <source src="../assets/video/spa1.mp4" type="video/mp4">
      </video>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive,ref } from 'vue'
// 一个用户图像+密码锁图标
import { Avatar, Lock } from "@element-plus/icons-vue";

// 二维码验证
import Vcode from "vue3-puzzle-vcode";
// 判断二维码是否显示
const isShow = ref(false)

// 引入路由
import { useRouter } from 'vue-router'
// 使用路由组件
const router = useRouter()

// 引入封装好的axios
import api from '@/api/api'

// 通过验证后，需要手动隐藏模态框
const success = () => {
  isShow.value = false;
  // console.log(formLabelAlign)

  api.postFormAPI('/api/login',formLabelAlign).then(res => {
    //数据处理
    console.log(res)
    const code = res.data.code
    const data = res.data.data.item
    if (code === 200){
      // console.log(data)
      window.localStorage.setItem('token',data.token)
      router.push('hello')
    }

  }).catch(err => console.log(err))
  // if (formLabelAlign.username == 'admin' && formLabelAlign.password == 123456){
  //   router.push('index')
  // }
}
// 用户点击遮罩层，应该关闭模态框
const toclose = () => {isShow.value = false  }
const formLabelAlign = reactive({
  username: 'admin',
  password: '123456'
})

const onSubmit = () => {
  isShow.value = true
}

</script>



<style scoped>
.login_background {
}
.admin_login{
  /*width: 240px;*/
  height: 280px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  z-index:1;
}
.videoContainer{
  position: fixed;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -100;
}

.videoContainer:before{
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  display: block;
  z-index: -1;
  top: 0;
  left: 0;
  background: rgba(25,29,34,.65);
}

</style>
