<template>
  <div>
    <el-row>
      <el-col :span="8"><div class="grid-content ep-bg-purple" /></el-col>
      <el-col :span="8"><div class="grid-content ep-bg-purple-light" />
        <el-card shadow="hover">
          <h3 align="center">添加商品</h3>
          <el-divider>
            <el-icon><star-filled /></el-icon>
          </el-divider>
          <el-form :model="form" label-width="120px" :label-position="left">
            <el-form-item label="商品名称">
              <el-input :prefix-icon="Goods" placeholder="请输入账号"/>
            </el-form-item>
            <el-form-item label="商品主图">
              <el-upload
                  class="avatar-uploader"
                  action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
              </el-upload>
            </el-form-item>
            <el-form-item label="商品描述">
              <el-input type="password" show-password :prefix-icon="EditPen" placeholder="请输入商品描述"/>
            </el-form-item>
            <el-form-item label="进货价">
              <el-input :prefix-icon="PriceTag" placeholder="请输入进货价"/>
            </el-form-item>
            <el-form-item label="零售价">
              <el-input :prefix-icon="PriceTag" placeholder="请输入零售价"/>
            </el-form-item>
            <el-form-item label="利润">
              <el-input :prefix-icon="Money" placeholder="" disabled/>
            </el-form-item>
            <el-form-item label="当前状态">
              <el-select placeholder="请选择商品当前状态">
                <el-option label="上架" value="1" />
                <el-option label="下架" value="0" />
              </el-select>
            </el-form-item>
            <el-button type="primary" style="width: 100%" size="large">上架</el-button>
          </el-form>
          <el-divider>
            请检查完整信息后注册
          </el-divider>
        </el-card>
      </el-col>
      <el-col :span="8"><div class="grid-content ep-bg-purple" /></el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { StarFilled } from '@element-plus/icons-vue'
import { Goods, EditPen, PriceTag, Money,} from "@element-plus/icons-vue";

import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import type { UploadProps } from 'element-plus'

const imageUrl = ref('')

const handleAvatarSuccess: UploadProps['onSuccess'] = (
    response,
    uploadFile
) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  text-align: center;
}
</style>
