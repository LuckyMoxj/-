<template>
  <QuillEditor
      ref="quill"
      toolbar="full"
      theme="snow"
      content-type="html"
      :disabled="true"
      :content="content"
      :options="options"
  />
</template>

<script>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

export default ({
  components: {
    QuillEditor
  },
  data () {
    return {
      // 编辑器内容
      content: '',
      // 编辑器选项
      options: {
        debug: 'info',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'], // 加粗 斜体 下划线 删除线
            ['blockquote', 'code-block'], // 引用  代码块
            [{ header: 1 }, { header: 2 }], // 1、2 级标题
            [{ list: 'ordered' }, { list: 'bullet' }], // 有序、无序列表
            [{ script: 'sub' }, { script: 'super' }], // 上标/下标
            [{ indent: '-1' }, { indent: '+1' }], // 缩进
            [{ direction: 'rtl' }], // 文本方向
            [{ size: ['12px', false, '16px', '18px', '20px', '30px'] }], // 字体大小
            [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
            [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
            [{ font: [false, 'SimSun', 'SimHei', 'Microsoft-YaHei', 'KaiTi', 'FangSong', 'Arial'] }], // 字体种类
            [{ align: [] }], // 对齐方式
            ['clean'], // 清除文本格式
            ['link', 'image', 'video'] // 链接、图片、视频
          ],
        },
        placeholder: '请输入内容~',
        readOnly: false,
        theme: 'snow'
      }
    }
  },
  methods: {
    /**
     * 设置编辑器 Text 内容
     */
    async handleSetText(content) {
      const refs = await this.$refs
      refs.quill.setText(content)
      return 'OK'
    },
    /**
     * 获取编辑器 Text 内容
     */
    async handleGetText() {
      const refs = await this.$refs
      return refs.quill.getText();
    },

    /**
     * 设置编辑器 Html 代码
     */
    async handleSetHtml(content) {
      const refs = await this.$refs
      refs.quill.setHTML(content)
      return 'OK'
    },
    /**
     * 获取编辑器 Html 代码
     */
    async handleGetHtml() {
      const refs = await this.$refs
      return refs.quill.getHTML();
    }
  }
})
</script>
