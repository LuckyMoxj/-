<template>
  <div style="padding: 10px">
    <el-row :gutter="12">
      <el-col :span="24">
        <el-card class="box-card" style="width: 100%;">
          <template #header>
            <div class="card-header">
              <el-breadcrumb :separator-icon="ArrowRight">
                <el-breadcrumb-item :to="{ path: '/' }">订单管理</el-breadcrumb-item>
                <el-breadcrumb-item>退款订单</el-breadcrumb-item>
              </el-breadcrumb>
              <el-input style="width:200px" v-model="input" placeholder="请输入UID或者手机号" />
              <el-button class="button" text>Operation button</el-button>
            </div>
          </template>
          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column type="index" width="50" />
            <el-table-column prop="ordersNumber" label="订单号" />
            <el-table-column prop="ordersUid" label="UID" />
            <el-table-column prop="ordersMoney" label="金额" />
            <el-table-column prop="ordersRemark" label="备注" />
            <el-table-column prop="ordersStatus" label="当前状态" >
              <template v-slot="scope">
                <el-tag class="ml-2" type="success" effect="dark" v-if="scope.row.ordersStatus==1">支付成功</el-tag>
                <el-tag class="ml-2" effect="dark" v-if="scope.row.ordersStatus==2">等待支付</el-tag>
                <el-tag class="ml-2" type="warning" effect="dark" v-if="scope.row.ordersStatus==3">订单异常</el-tag>
                <el-tag class="ml-2" type="danger" effect="dark" v-if="scope.row.ordersStatus==4">已退款</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="ordersDate" label="日期" />
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
  api.getListAPI('/api/admin/oms/refund').then(res => {
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
