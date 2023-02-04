<template>
  <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      router
  >
    <!--    <el-menu-item @click="flexible_switch" ref="menu_icon">-->
    <!--      <Fold v-if="isCollapse"/>-->
    <!--      <Expand v-if="!isCollapse"></Expand>-->
    <!--      <template #title>菜单详情</template>-->
    <!--    </el-menu-item>-->
    <el-menu-item index="1" :route="{ path: '/admin/index' }">
      <el-icon>
        <Menu/>
      </el-icon>
      <template #title>后台中心</template>
    </el-menu-item>
    <el-sub-menu index="2">
      <template #title>
        <el-icon><i class="iconfont icon-group"></i></el-icon>
        <span>用户管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="1-1" :route="{ path: '/admin/index/ums_all' }">全部用户</el-menu-item>
        <el-menu-item index="1-2" :route="{ path: '/admin/index/ums_vip' }">会员用户</el-menu-item>
        <el-menu-item index="1-3" :route="{ path: '/admin/index/ums_add' }">添加用户</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
    <el-sub-menu index="3">
      <template #title>
        <el-icon>
          <Document/>
        </el-icon>
        <span>文章管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="2-1" :route="{ path: '/admin/index/ams_all' }">全部文章</el-menu-item>
        <el-menu-item index="2-2" :route="{ path: '/admin/index/ams_write' }">写文章</el-menu-item>
        <el-menu-item index="2-3" :route="{ path: '/admin/index/ams_class' }">分类</el-menu-item>
        <el-menu-item index="2-4" :route="{ path: '/admin/index/ams_label' }">标签</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
    <el-sub-menu index="4">
      <template #title>
        <el-icon>
          <Goods/>
        </el-icon>
        <span>商品管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="3-1" :route="{ path: '/admin/index/gms_all' }">商品列表</el-menu-item>
        <el-menu-item index="3-2" :route="{ path: '/admin/index/gms_uploaded' }">上架商品</el-menu-item>
        <el-menu-item index="3-3" :route="{ path: '/admin/index/gms_takedown' }">下架商品</el-menu-item>
        <el-menu-item index="3-3" :route="{ path: '/admin/index/gms_add' }">添加商品</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
    <el-sub-menu index="5">
      <template #title>
        <el-icon>
          <Tickets/>
        </el-icon>
        <span>订单管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="4-1" :route="{ path: '/admin/index/oms_all' }">全部订单</el-menu-item>
        <el-menu-item index="4-2" :route="{ path: '/admin/index/oms_success' }">支付完成</el-menu-item>
        <el-menu-item index="4-3" :route="{ path: '/admin/index/oms_wait' }">等待支付</el-menu-item>
        <el-menu-item index="4-4" :route="{ path: '/admin/index/oms_abnormal' }">异常订单</el-menu-item>
        <el-menu-item index="4-5" :route="{ path: '/admin/index/oms_refund' }">退款订单</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
    <el-sub-menu index="6">
      <template #title>
        <el-icon>
          <ChatDotRound/>
        </el-icon>
        <span>工单管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="6-1" :route="{ path: '/admin/index/wms_list' }">全部工单</el-menu-item>
        <el-menu-item index="6-2" :route="{ path: '/admin/index/wms_pending' }">待处理</el-menu-item>
        <el-menu-item index="6-3" :route="{ path: '/admin/index/wms_processed' }">已处理</el-menu-item>
        <el-menu-item index="6-4" :route="{ path: '/admin/index/wms_closed' }">已结单</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
    <el-menu-item index="7" :route="{ path: '/admin/index/fms_index' }">
      <el-icon>
        <Message/>
      </el-icon>
      <template #title>意见管理</template>
    </el-menu-item>
    <el-menu-item index="8">
      <el-icon>
        <Setting/>
      </el-icon>
      <template #title>系统管理</template>
    </el-menu-item>
    <el-menu-item index="9" @click="refresh()">
      <el-icon>
        <Refresh/>
      </el-icon>
      <template #title>清理缓存</template>
    </el-menu-item>
    <el-menu-item index="10">
      <el-icon><i class="iconfont icon-tuichu"></i></el-icon>
      <template #title>退出后台</template>
    </el-menu-item>
  </el-menu>
</template>

<script setup lang="ts">
// import Fold from '@/components/flexible/Fold.vue'
// import Expand from '@/components/flexible/Expand.vue'
import emiiter from '@/utils/bus'
import {ref, onBeforeMount} from 'vue'

const isCollapse = ref(false) // 等待接收
const handelEventFn = (res: any) => {
  isCollapse.value = res.value
}
onBeforeMount(() => {
  emiiter.on('fn', handelEventFn)  // 开启监听，监听到handleEvent事件后，执行handelEventFn1函数，当然你也可以在另外的页面监听handleEvent事件去执行handelEventFn2
})
const refresh = () => {
  window.location.reload(true);
}

</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
