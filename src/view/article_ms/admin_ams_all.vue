<template>
  <div style="padding: 10px">
    <el-row :gutter="12">
      <el-col :span="24">
        <el-card class="box-card" style="width: 100%;">
          <template #header>
            <div class="card-header">
              <el-breadcrumb :separator-icon="ArrowRight">
                <el-breadcrumb-item :to="{ path: '/' }">文章管理</el-breadcrumb-item>
                <el-breadcrumb-item>全部文章</el-breadcrumb-item>
              </el-breadcrumb>
              <el-input style="width:200px" v-model="input" placeholder="请输入UID或者手机号" />
              <el-button class="button" text>Operation button</el-button>
            </div>
          </template>
          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="id" v-if="false"/>
            <el-table-column type="index" width="50" />
            <el-table-column prop="articleTitle" label="标题" />
            <el-table-column prop="realname" label="作者" />
            <el-table-column prop="className" label="分类" />
            <el-table-column prop="articleComments" label="评论数" />
            <el-table-column prop="articleDate" label="时间" />
            <el-table-column prop="articleState" label="当前状态" >
              <template v-slot="scope">
                <el-tag class="ml-2" v-if="scope.row.articleState==1">已发布</el-tag>
                <el-tag class="ml-2" type="danger" v-if="scope.row.articleState==0">未发布</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="180px">
              <template #default="scope">
                <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
                >编辑</el-button
                >
                <el-button
                    size="small"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <div class="demo-pagination-block">
            <br/>
            <Pagination
                :pageSize="page.pageSize"
                :pageTotal="page.total"
                @pageFunc="pageFunc"
            />
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
// 引入封装好的axios
import api from '@/api/api'
import {ref,reactive} from "vue";
import { ArrowRight } from '@element-plus/icons-vue'
import Pagination from "@/components/paginAtion.vue"

let page = reactive({
// 放置页码及相关数据
  pageNum: 1, //当前页
  pageSize: 10, //每页条目数
  total: 100, // 记录总数
});

const tableData = ref()

const GetData = (size: number, current: number) => {
  api.getListAPI('/api/admin/ams/list',{'pageSize':size,'currentPage': current}).then(res => {
    //数据处理
    const code = res.data.code
    const data = res.data.data.item
    if (code === 200){
      tableData.value = data.data
      page.pageNum = data.current
      page.total = data.total
    }

  }).catch(err => console.log(err))
}

GetData(page.pageSize,page.pageNum)

const pageFunc = (data) => {
  page.pageSize = data.pageSize;
  page.pageNum = data.pageNum;
  // console.log(page.pageSize,page.pageNum)
  GetData(page.pageSize,page.pageNum)
};

</script>

<style>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}


.demo-pagination-block + .demo-pagination-block {
  margin-top: 10px;
}
.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}
</style>
