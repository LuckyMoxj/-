<template>
  <div style="padding: 10px">
    <el-alert v-if="isshow" title="添加成功！" type="success" effect="dark"/>
    <el-alert v-if="failshow" title="已经存在，添加失败！" type="error" effect="dark"/>
    <el-row :gutter="20">
      <el-col :span="16">
        <el-card class="box-card" style="width: 100%;">
          <template #header>
            <div class="card-header">
              <el-breadcrumb :separator-icon="ArrowRight">
                <el-breadcrumb-item :to="{ path: '/' }">文章管理</el-breadcrumb-item>
                <el-breadcrumb-item>分类</el-breadcrumb-item>
              </el-breadcrumb>
              <el-input style="width:200px" v-model="input" placeholder="请输入UID或者手机号"/>
              <el-button class="button" text>Operation button</el-button>
            </div>
          </template>
          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="classId" label="ID"/>
            <el-table-column prop="className" label="分类"/>
            <el-table-column label="操作" width="180px">
              <template #default="scope">
                <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
      <el-col :span="8">
        <el-card shadow="hover">
          <h3 align="center">添加新分类</h3>
          <el-divider>
            <el-icon>
              <star-filled/>
            </el-icon>
          </el-divider>
          <el-form label-width="120px" :label-position="left">
            <el-form-item :model="form" label="分类名称">
              <el-input v-model="form.classname" placeholder="请输入分类名称"/>
            </el-form-item>
            <el-button type="primary" style="width: 100%" size="large" @click="SubmitAdd">添加</el-button>
          </el-form>
          <el-divider>
            请检查完整信息后添加
          </el-divider>
          <p></p>
        </el-card>
      </el-col>
    </el-row>
  </div>

</template>

<script lang="ts" setup>
import {ref, reactive} from "vue";
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

const form = reactive({
  classname: '',
})
const isshow = ref(false)
const failshow = ref(false)

const GetData = (size: number, current: number) => {
  api.getListAPI('/api/admin/ams/class', {'pageSize': size, 'currentPage': current}).then(res => {
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

const SubmitAdd = () => {
  handleCofirm().then(res => {
    ElMessage({type: 'success', message: '添加成功！',})
    api.getListAPI('/api/admin/ams/classadd', form).then(res => {
      //数据处理
      const code = res.data.code
      let data = res.data.data.item
      if (code === 200) {
        if (data === 1) {
          isshow.value = true
          GetData(page.pageSize, page.pageNum)
        } else if (data === 0) {
          failshow.value = true
          GetData(page.pageSize, page.pageNum)
        }
      }
    }).catch(err => console.log(err))
  }).catch(err => {
    ElMessage({type: 'info', message: '取消添加！',})
  })
};

const handleDelete = (tem: any, temp: any) => {
  handleCofirm().then(res => {
    ElMessage({type: 'success', message: '删除成功！',})
    api.getListAPI('/api/admin/ams/classdelete?id=' + temp.classId).then(res => {
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

<style scoped>
.el-alert {
  margin: 20px 0 0;
}

.el-alert:first-child {
  margin: 0;
}
</style>
