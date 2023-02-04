<template>
  <div>
    <el-row>
      <el-col :span="8"><div class="grid-content ep-bg-purple" /></el-col>
      <el-col :span="8"><div class="grid-content ep-bg-purple-light" />
        <el-card shadow="hover">
          <h3 align="center">添加新用户</h3>
          <el-divider>
            <el-icon><star-filled /></el-icon>
          </el-divider>
          <el-form :model="form" label-width="120px" :label-position="left">
            <el-form-item label="用户账号">
              <el-input v-model="form.username" :prefix-icon="Avatar" placeholder="请输入账号"/>
            </el-form-item>
            <el-form-item label="用户昵称">
              <el-input v-model="form.realname" :prefix-icon="EditPen" placeholder="请输入昵称"/>
            </el-form-item>
            <el-form-item label="用户密码">
              <el-input v-model="form.password" type="password" show-password :prefix-icon="Lock" placeholder="请输入密码"/>
            </el-form-item>
            <el-form-item label="用户手机">
              <el-input v-model="form.telephone" :prefix-icon="Iphone" placeholder="请输入手机号"/>
            </el-form-item>
            <el-form-item  label="用户性别">
              <el-select v-model="form.sex" placeholder="请选择你的性别">
                <el-option label="男" value="1" />
                <el-option label="女" value="0" />
              </el-select>
            </el-form-item>
            <el-form-item label="用户生日">
                <el-date-picker
                    type="date"
                    v-model="form.birthday"
                    placeholder="选择日期"
                    style="width: 100%"/>
            </el-form-item>
              <el-button type="primary" style="width: 100%" size="large" @click="onSubmit">注册</el-button>
          </el-form>
          <el-divider>
            请检查完整信息后注册
          </el-divider>
          <p></p>
        </el-card>
      </el-col>
      <el-col :span="8"><div class="grid-content ep-bg-purple" /></el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { StarFilled } from '@element-plus/icons-vue'
import { Avatar, Lock, EditPen, Iphone} from "@element-plus/icons-vue";

// 引入封装好的axios
import api from '@/api/api'

import { reactive } from 'vue'

// do not use same name with ref
const form = reactive({
  username: '',
  realname: '',
  password: '',
  birthday: '',
  telephone: '',
  sex: '',
})

// 通过验证后，需要手动隐藏模态框

const onSubmit = () => {
  api.postFormAPI('/api/admin/ums/add',form).then(res => {
    //数据处理
    const code = res.data.code
    const data = res.data.data.item
    if (code === 200){
      // console.log(data);
    }
  }).catch(err => console.log(err))
}
</script>

<style scoped>

</style>
