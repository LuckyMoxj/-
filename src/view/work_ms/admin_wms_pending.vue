<template>
  <div style="padding: 10px">
    <el-row :gutter="12">
      <el-col :span="24">
        <el-card class="box-card" style="width: 100%;">
          <template #header>
            <div class="card-header">
              <el-breadcrumb :separator-icon="ArrowRight">
                <el-breadcrumb-item :to="{ path: '/' }">工单管理</el-breadcrumb-item>
                <el-breadcrumb-item>全部工单</el-breadcrumb-item>
              </el-breadcrumb>
              <el-input style="width:200px" v-model="input" placeholder="请输入UID或者手机号" />
              <el-button class="button" text>Operation button</el-button>
            </div>
          </template>
          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column type="index" width="50" />
            <el-table-column prop="workId" label="工单号" />
            <el-table-column prop="workUser" label="用户ID" />
            <el-table-column prop="workType" label="工单类型" >
              <template v-slot="scope">
                <el-tag class="ml-2" v-if="scope.row.workType==1">忘记账号/密码相关问题</el-tag>
                <el-tag class="ml-2" type="warning" v-if="scope.row.workType==2">文章内容问题</el-tag>
                <el-tag class="ml-2" type="success" v-if="scope.row.workType==3">其他问题</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="workDegree" label="严重程度" >
              <template v-slot="scope">
                <el-tag class="ml-2" effect="dark" v-if="scope.row.workDegree==1">普通咨询</el-tag>
                <el-tag class="ml-2" type="warning" effect="dark" v-if="scope.row.workDegree==2">操作体验问题</el-tag>
                <el-tag class="ml-2" type="success" effect="dark" v-if="scope.row.workDegree==3">业务/系统异常影响使用</el-tag>
                <el-tag class="ml-2" type="danger" effect="dark" v-if="scope.row.workDegree==4">业务完全不可用</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="workDescribe" label="问题描述" show-overflow-tooltip />
            <el-table-column prop="workTime" label="时间" />
            <el-table-column prop="workState" label="当前状态" >
              <template v-slot="scope">
                <el-tag class="ml-2" v-if="scope.row.workState==1">待处理</el-tag>
                <el-tag class="ml-2" type="warning" v-if="scope.row.workState==2">已处理</el-tag>
                <el-tag class="ml-2" type="success" v-if="scope.row.workState==3">已结单</el-tag>
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
import {handleCofirm} from "@/utils/confirm";
import {ElMessage} from "element-plus";

let page = reactive({
// 放置页码及相关数据
  pageNum: 1, //当前页
  pageSize: 10, //每页条目数
  total: 100, // 记录总数
});

const tableData = ref()

const GetData = (size: number, current: number) => {
  api.getListAPI('/api/admin/wms/pending',{'pageSize':size,'currentPage': current}).then(res => {
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

const handleDelete = (tem: any, temp: any) => {
  handleCofirm().then(res => {
    ElMessage({type: 'success', message: '删除成功！',})
    api.getListAPI('/api/admin/wms/delete?id=' + temp.workId).then(res => {
      //数据处理
      const code = res.data.code
      let data = res.data.data.item
      if (code === 200) {
        if (data === 1) {
          GetData(page.pageSize, page.pageNum)
        } else if (data === 0) {
          GetData(page.pageSize, page.pageNum)
        }
      }
    }).catch(err => console.log(err))
  }).catch(err => {
    ElMessage({type: 'info', message: '取消删除！',})
  })
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

