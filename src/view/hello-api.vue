<template>
  <div>85878581{{all_data}}</div>
</template>

<script lang="ts" setup>
// 引入封装好的axios
import api from '@/api/api'
import {ref} from "vue";
const all_data = ref()
// 通过验证后，需要手动隐藏模态框
const test = () => {
  // console.log(formLabelAlign)
  api.getListAPI('/api/hello').then(res => {
    //数据处理
    console.log(res)
    const code = res.data.code
    const data = res.data.data.item
    if (code === 200){
      console.log(data);
      all_data.value = data;
    }
  }).catch(err => console.log(err))
}
test();

</script>

<style scoped>

</style>
