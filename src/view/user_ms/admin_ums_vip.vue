<template>
  <div style="padding: 10px">
    <el-row :gutter="12">
      <el-col :span="24">
        <el-card class="box-card" style="width: 100%;">
          <template #header>
            <div class="card-header">
              <el-breadcrumb :separator-icon="ArrowRight">
                <el-breadcrumb-item :to="{ path: '/' }">用户管理</el-breadcrumb-item>
                <el-breadcrumb-item>会员用户</el-breadcrumb-item>
              </el-breadcrumb>
              <el-input style="width:200px" v-model="input" placeholder="请输入UID或者手机号"/>
              <el-button class="button" text>Operation button</el-button>
            </div>
          </template>
          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="uid" label="uid"/>
            <el-table-column prop="username" label="用户名"/>
            <el-table-column prop="telephone" label="手机"/>
            <el-table-column prop="money" label="账户余额"/>
            <el-table-column prop="roleremark" label="会员">
              <template v-slot="scope">
                <el-tag class="ml-2" effect="dark" v-if="scope.row.roleremark=='基本用户'">普通用户</el-tag>
                <el-tag class="ml-2" type="danger" effect="dark" v-if="scope.row.roleremark=='会员用户'">VIP用户</el-tag>
                <el-tag class="ml-2" type="success" effect="dark" v-if="scope.row.roleremark=='系统管理员'">管理员</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="status" label="状态">
              <template v-slot="scope">
                <el-tag class="ml-2" v-if="scope.row.status==1">正常</el-tag>
                <el-tag class="ml-2" type="danger" v-if="scope.row.status==0">封禁</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="logintime" label="登录/注册"/>
            <el-table-column label="操作" width="180px">
              <template #default="scope">
                <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
                >编辑
                </el-button
                >
                <el-button
                    size="small"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)"
                >删除
                </el-button
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
import {ArrowRight} from '@element-plus/icons-vue'
// 引入封装好的axios
import api from '@/api/api'
import {reactive, ref} from "vue";
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
  api.getListAPI('/api/admin/ums/vip', {'pageSize': size, 'currentPage': current}).then(res => {
    //数据处理
    const code = res.data.code
    const data = res.data.data.item
    if (code === 200) {
      console.log(data)
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
    api.getListAPI('/api/admin/ums/delete?uid=' + temp.uid).then(res => {
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
