<template>
  <div>{{ data }}</div>1111
</template>

<script lang="ts" setup>
// 引入封装好的axios
import api from '@/api/api'

const test = () => {

  // console.log(formLabelAlign)
  api.getListAPI('/api/user/logout').then(res => {
    //数据处理
    console.log(res)
    const code = res.data.code
    const data = res.data.data.item
    if (code === 200){
      console.log(data)
    }

  }).catch(err => console.log(err))
}
test()
</script>

<style scoped>

</style>
