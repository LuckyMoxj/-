<template>
  <div style="padding: 15px;">
    <el-row :gutter="12">
      <el-col :span="24">
        <el-card class="box-card" style="width: 100%;">
          <el-row :gutter="10">
            <el-col :span="16">
              <el-form label-width="120px">
                <el-form-item label="标题：">
                  <el-input v-model="form.articleTitle" placeholder="请输入标题"/>
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :span="8">
              <el-form label-width="120px">
                <el-form-item label="分类：">
                  <el-select v-model="form.articleClass" placeholder="请选择分类">
                    <el-option :label="item.className" :value="item.classId" v-for="(item,i) in list"
                               :key="i"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
          <QuillEditor ref="quillEditorRef" style="width: 100%; height: 250px;"/>
        </el-card>
      </el-col>
    </el-row>


    <p style="text-align: center; margin-top: 10px;">
      <!--      <el-button type="primary" plain @click="handleSetContentClick($event)">设置内容</el-button>-->
      <!--      &nbsp;&nbsp;-->
      <el-button type="success" plain @click="handleGetContentClick()">获取内容</el-button>
      <el-button type="success" plain @click="release()">发布</el-button>
    </p>

    <p>
      {{ articleContent }}
    </p>
  </div>
</template>

<script>
import QuillEditor from '@/components/quillEditor.vue'
import api from "@/api/api";

export default {
  components: {
    QuillEditor
  },
  data() {
    return {
      // 编辑器内容
      form: {
        articleContent: '',
        articleTitle: '',
        articleClass: '',
      },
      list: ''
    }
  },
  mounted() {
    this.findLabel()
  },
  methods: {
    async release() {
      await this.handleGetContentClick()
      console.log(this.form)
      api.getListAPI('/api/admin/ams/write', this.form).then(res => {
        //数据处理
        const code = res.data.code
        const data = res.data.data.item
        if (code === 200) {
          this.form.articleContent = ''
          this.form.articleClass = ''
          this.form.articleTitle = ''
        }
      }).catch(err => console.log(err))
      await this.handleSetContentClick()
    },
    findLabel() {
      api.getListAPI('/api/admin/ams/class', {'pageSize': 999, 'currentPage': 1}).then(res => {
        //数据处理
        const code = res.data.code
        const data = res.data.data.item
        if (code === 200) {
          this.list = data.data
        }
      }).catch(err => console.log(err))
    },
    /**
     * 设置编辑器内容
     */
    async handleSetContentClick(evt) {

      const refs = await this.$refs.quillEditorRef;
      const status = await refs.handleSetHtml('')
      console.log('handleSetContentClick =>', status)
    },

    /**
     * 获取编辑器内容
     */
    async handleGetContentClick() {
      // this.$elementUtil.handleElButtonBlur(evt)
      const refs = await this.$refs.quillEditorRef;
      this.form.articleContent = await refs.handleGetHtml();
      // console.log('handleGetContentClick =>', this.editorContent)
    },
  },

}
</script>
