<template>
  <el-menu
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
  >
    <el-sub-item index="1">
      <img src="@/assets/logoko.png" alt="" height="55">
    </el-sub-item>
    <el-sub-item index="2">
      <Fold style="font-size: 25px;height: 2em;width: 2em;" v-if="isCollapse" @click="flexible_switch"/>
      <Expand style="font-size: 25px;height: 2em;width: 2em;" v-if="!isCollapse" @click="flexible_switch"></Expand>
    </el-sub-item>
    <div class="flex-grow" />
    <el-sub-menu index="3">
      <template #title>
        <el-avatar  src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"/>
<!--        <el-avatar src="@/assets/logoko.png"/>-->
        <span width="5px">&emsp;</span>
        Admin</template>
      <el-menu-item index="3-1"><el-icon><User /></el-icon>个人中心</el-menu-item>
      <el-menu-item index="3-2"><el-icon style="color: #F56C6C"><Right /></el-icon>退出</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script lang="ts" setup>
import Fold from '@/components/flexible/Fold.vue'
import Expand from '@/components/flexible/Expand.vue'

import mitter from '@/utils/bus'
import { ref } from 'vue'
const isCollapse= ref(true)
const flexible_switch = ()=>{
  mitter.emit('fn',isCollapse)
  isCollapse.value = !isCollapse.value
}

</script>

<style>
.flex-grow {
  flex-grow: 1;
}
</style>
