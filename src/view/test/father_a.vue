<template>
  <div>
    <HotelPaginationTemplate
        :pageSize="page.pageSize"
        :pageTotal="page.total"
        @pageFunc="pageFunc"
    />
  </div>
</template>


<script setup lang="ts">
import HotelPaginationTemplate from "@/view/test/child _b"
import { ref, reactive, onMounted } from "vue";

let page = reactive({
// 放置页码及相关数据
pageNum: 1, //当前页
pageSize: 5, //每页条目数
total: 100, // 记录总数
});

const pageFunc = (data) => {
page.pageSize = data.pageSize;
page.pageNum = data.pageNum;
console.log(page.pageSize,page.pageNum)
// initialization();  // 触发获取数据函数
};
</script>
