<template>
  <div class="common-layout">
    <el-container>
      <el-header style="padding: 0">
          <to_header></to_header>
      </el-header>
      <el-container>
        <el-aside width="auto">
          <to_aside></to_aside>
        </el-aside>
        <el-container>
          <el-main style="padding: 0">
            <to_main></to_main>
          </el-main>
          <el-footer style="box-shadow: 0 2px 12px 0 rgba(0,0,0,0.10);">
            <to_footer></to_footer>
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>


<script lang="ts" setup>
import to_aside from '@/view/menu/admin_aside.vue'
import to_footer from '@/view/menu/admin_footer.vue'
import to_main from '@/view/menu/admin_main.vue'
import to_header from '@/view/menu/admin_header.vue'
</script>

<style scoped>
html{
  height: 100%;
  width: 100%;
}
</style>
