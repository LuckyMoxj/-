<template>
    <h3 id="clock">{{ Time }}</h3>
</template>

<script lang="ts" setup>
import {ref,onMounted,onUnmounted} from "vue";

const Time = ref('');
const gettime = ()=>{
  const time=new Date();
  const arr=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
  const hour=time.getHours();
  const min=time.getMinutes();
  const sec=time.getSeconds();
  const madetime=time.getFullYear()+" - "+(time.getMonth()+1)+" - "+time.getDate()+" "+arr[time.getDay()];
  const h=(hour<10?"0":"")+hour;
  const m=(min<10?"0":"")+min;
  const s=(sec<10?"0":"")+sec;
  const hms = h + ':' + m + ':' + s
  Time.value = (madetime + ' ' + hms)
}
gettime();//显示第一秒的时间
// setInterval("gettime",1000);
let tm: number
onMounted(()=>{
  tm = setInterval(() => {
    gettime();
  },1000);
})

onUnmounted(()=>{
  if(tm) clearInterval(tm)
});
</script>

<style scoped>

</style>
