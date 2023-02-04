<template>
  <div style="padding: 10px">
    <el-row :gutter="12" >
      <el-col :span="6">
        <el-card shadow="hover" :body-style="{padding: '0 0 0 20px'}">
          <el-row>
            <el-col :span="8">
              <p style="border-radius: 60px;background-color: #7C62AD;height: 70px;width: 70px;">
                <el-icon style="color: #FFFFFF;margin:20px" :size="30"><Tickets /></el-icon>
              </p>
            </el-col>
            <el-col :span="8"></el-col>
            <el-col :span="8">
              <h2 style="color: #7C62AD">0</h2>
              <p>订单总数</p>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" :body-style="{padding: '0 0 0 20px'}">
          <el-row>
            <el-col :span="8">
              <p style="border-radius: 60px;background-color: #95d475;height: 70px;width: 70px;">
                <el-icon style="color: #FFFFFF;margin:20px" :size="30"><Timer /></el-icon>
              </p>
            </el-col>
            <el-col :span="8"></el-col>
            <el-col :span="8">
              <h2 style="color: #95d475">0</h2>
              <p>待处理订单</p>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" :body-style="{padding: '0 0 0 20px'}">
          <el-row>
            <el-col :span="8">
              <p style="border-radius: 60px;background-color: #E6A23C;height: 70px;width: 70px;">
                <el-icon style="color: #FFFFFF;margin:20px" :size="30"><SuitcaseLine /></el-icon>
              </p>
            </el-col>
            <el-col :span="8"></el-col>
            <el-col :span="8">
              <h2 style="color: #E6A23C">+ 0</h2>
              <p>今日订单数</p>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" :body-style="{ padding: '0 0 0 20px' }">
          <el-row>
            <el-col :span="8">
              <p style="border-radius: 60px;background-color: #df5000;height: 70px;width: 70px;">
                <el-icon style="color: #FFFFFF;margin:20px" :size="30"><Money /></el-icon>
              </p>
            </el-col>
            <el-col :span="8"></el-col>
            <el-col :span="8">
              <h2 style="color: #df5000">$ 0</h2>
              <p>今日交易额</p>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="12" >
      <el-col :span="6">
        <el-card shadow="hover" :body-style="{ padding: '0 0 0 20px' }">
          <el-row>
            <el-col :span="8">
              <p style="border-radius: 60px;background-color: #E9D706;height: 70px;width: 70px;">
                <el-icon style="color: #FFFFFF;margin:20px" :size="30"><CreditCard /></el-icon>
              </p>
            </el-col>
            <el-col :span="8"></el-col>
            <el-col :span="8">
              <h2 style="color: #E9D706">$ 0</h2>
              <p>今日收益</p>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" :body-style="{ padding: '0 0 0 20px' }">
          <el-row>
            <el-col :span="8">
              <p style="border-radius: 60px;background-color:#f89898;height: 70px;width: 70px;">
                <el-icon style="color: #FFFFFF;margin:20px" :size="30"><Coin /></el-icon>
              </p>
            </el-col>
            <el-col :span="8"></el-col>
            <el-col :span="8">
              <h2 style="color: #f89898">$ 0</h2>
              <p>昨日收益</p>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover" :body-style="{ padding: '0 0 0 20px' }">
          <el-row>
            <el-col :span="3">
              <p style="border-radius: 60px;background-color:#F2F2F2;height: 60px;width: 60px;">
                <el-avatar :size="50" style="margin: 5px" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"/>
              </p>
            </el-col>
            <el-col :span="8">
              <h3>Hi! Admin&emsp;<el-tag>管理员</el-tag></h3>
              <p>当前登录IP:172.13.1.2</p>
            </el-col>
            <el-col :span="13">
              <h2>欢迎来到 - 后台中心</h2>
              <pkg_time/>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="12">
      <el-col :span="18">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>一周交易与订单统计</span>
            </div>
          </template>
          <div id="main" ref="main" style="width: 100%; height: 400px"></div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card" :body-style="{ padding: '0px' }">
          <template #header>
            <div class="card-header">
              <span>用户统计</span>
            </div>
          </template>
          <div>
            <el-row style="margin: 0">
              <el-col :span="12">
                <div style="border-right: 1px solid #999999;border-bottom: 1px solid #999999;text-align: center;align-items: center">
                  <p><el-icon><i class="iconfont icon-group"></i></el-icon> 用户总数</p>
                  <p>0 个</p>
                </div>
              </el-col>
              <el-col :span="12">
                <div style="border-left: 1px solid #999999;border-bottom: 1px solid #999999;text-align: center;align-items: center">
                  <p><el-icon><User /></el-icon> 今日新增用户</p>
                  <p>0 个</p>
                </div>
              </el-col>
            </el-row>
            <el-row style="margin: 0">
              <el-col :span="12">
                <div style="border-right: 1px solid #999999;border-top: 1px solid #999999;text-align: center;align-items: center">
                  <p><el-icon><i class="iconfont icon-huiyuan"></i></el-icon> 会员总数</p>
                  <p>0 个</p>
                </div>
              </el-col>
              <el-col :span="12">
                <div style="border-left: 1px solid #999999;border-top: 1px solid #999999;text-align: center;align-items: center">
                  <p><el-icon><i class="iconfont icon-huiyuan"></i></el-icon> 今日新增会员</p>
                  <p>0 个</p>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-card>
        <el-card class="box-card" style="margin-top: 15px">
          <template #header>
            <div class="card-header">
              <span>安全中心</span>
            </div>
          </template>
          <el-tag class="ml-2" type="success" effect="dark">安全</el-tag>
        </el-card>
        <el-card class="box-card" style="margin-top: 15px">
          <template #header>
            <div class="card-header">
              <span>检测更新</span>
            </div>
          </template>
          <span>目前版本: v 1.0</span>
        </el-card>
      </el-col>
    </el-row>
  </div>

</template>

<script lang="ts" setup>
import {  onMounted } from "vue";
import pkg_time from "@/components/home/pkg_time.vue"
//  按需引入 echarts
import * as echarts from "echarts";
onMounted(
    () => {
      init()
    }
)
function init() {
  type EChartsOption = echarts.EChartsOption

  var chartDom = document.getElementById('main')!;
  var myChart = echarts.init(chartDom);
  var option: EChartsOption;

  option = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['订单量','交易量']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line',
        name: '订单量',
      },
      {
        data: [150, 250, 254, 128, 155, 47, 200],
        type: 'line',
        name: '交易量',
      }
    ],

  };

  option && myChart.setOption(option);
}
</script>

<style>
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
