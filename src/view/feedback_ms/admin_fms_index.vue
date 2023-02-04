<template>
  <div style="padding: 10px">
    <el-row :gutter="12">
      <el-col :span="24">
        <el-card class="box-card" style="width: 100%;">
          <template #header>
            <div class="card-header">
              <el-breadcrumb :separator-icon="ArrowRight">
                <el-breadcrumb-item :to="{ path: '/' }">意见管理</el-breadcrumb-item>
              </el-breadcrumb>
              <el-input style="width:200px" v-model="input" placeholder="请输入UID或者手机号"/>
              <el-button class="button" text>Operation button</el-button>
            </div>
          </template>
          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="id" v-if="false"/>
            <el-table-column type="index" width="50"/>
            <el-table-column prop="fbUser" label="用户ID"/>
            <el-table-column prop="fbType" label="类型"/>
            <el-table-column prop="fbDescribe" label="描述" show-overflow-tooltip/>
            <el-table-column prop="fbImg" label="图片">
              <template #default="scope">
                <el-image
                    style="width: 60px;height: 60px;"
                    :src="scope.row.fbImg"
                    :preview-src-list="[scope.row.fbImg]"
                    hide-on-click-modal="true"
                    preview-teleported="true">
                  <template #error>
                    <div class="image-slot"></div>
                  </template>
                </el-image>
              </template>
            </el-table-column>
            <el-table-column prop="fbDate" label="日期"/>
            <el-table-column label="操作" width="180px">
              <template #default="scope">
                <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
                </el-button>
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
          <!--          <Pagination :pagesize="query.limit" :total="pageTotal"></Pagination>-->
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import {reactive, ref} from "vue";
import api from "@/api/api";
import {ArrowRight} from '@element-plus/icons-vue'
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
  api.getListAPI('/api/admin/fms/all', {'pageSize': size, 'currentPage': current}).then(res => {
    //数据处理
    const code = res.data.code
    const data = res.data.data.item
    if (code === 200) {
      tableData.value = data.data
      page.pageNum = data.current
      page.total = data.total
    }

  }).catch(err => console.log(err))
}
GetData(page.pageSize, page.pageNum)

const pageFunc = (data) => {
  page.pageSize = data.pageSize;
  page.pageNum = data.pageNum;
  // console.log(page.pageSize,page.pageNum)
  GetData(page.pageSize, page.pageNum)
};

const handleDelete = (tem: any, temp: any) => {
  handleCofirm().then(res => {
    ElMessage({type: 'success', message: '删除成功！',})
    api.getListAPI('/api/admin/fms/delete?id=' + temp.id).then(res => {
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
