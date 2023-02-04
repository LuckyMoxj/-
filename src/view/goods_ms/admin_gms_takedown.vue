<template>
  <div style="padding: 10px">
    <el-row :gutter="12">
      <el-col :span="24">
        <el-card class="box-card" style="width: 100%;">
          <template #header>
            <div class="card-header">
              <el-breadcrumb :separator-icon="ArrowRight">
                <el-breadcrumb-item :to="{ path: '/' }">商品管理</el-breadcrumb-item>
                <el-breadcrumb-item>下架商品</el-breadcrumb-item>
              </el-breadcrumb>
              <el-input style="width:200px" v-model="input" placeholder="请输入UID或者手机号" />
              <el-button class="button" text>Operation button</el-button>
            </div>
          </template>
          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column type="index" width="50" />
            <el-table-column prop="goodsName" label="商品名称" />
            <el-table-column prop="goodsImg" label="商品主图" />
            <el-table-column prop="goodsDetails" label="商品描述" />
            <el-table-column prop="goodsPurchase" label="进货价" />
            <el-table-column prop="goodsSale" label="出售价" />
            <el-table-column label="利润" >
              <template v-slot="scope">
                {{scope.row.goodsSale - scope.row.goodsPurchase}}元
              </template>
            </el-table-column>
            <el-table-column prop="goodsStatus" label="当前状态" >
              <template v-slot="scope">
                <el-tag class="ml-2" type="warning" effect="dark" v-if="scope.row.goodsStatus==0">已下架</el-tag>
                <el-tag class="ml-2" type="success" effect="dark" v-if="scope.row.goodsStatus==1">上架中</el-tag>
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
            <el-pagination
                v-model:currentPage="currentPage4"
                v-model:page-size="pageSize4"
                :page-sizes="[100, 200, 300, 400]"
                :small="small"
                :disabled="disabled"
                :background="background"
                layout="total, sizes, prev, pager, next, jumper"
                :total="400"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
            />
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { ArrowRight } from '@element-plus/icons-vue'
import { ref } from "vue";
import api from "@/api/api";

const tableData = ref()

const test = () => {
  api.getListAPI('/api/admin/gms/remove').then(res => {
    //数据处理
    const code = res.data.code
    const data = res.data.data.item
    if (code === 200){
      tableData.value = data
    }

  }).catch(err => console.log(err))
}
test()
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
