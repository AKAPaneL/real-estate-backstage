<template>
  <div>
    <el-dialog :title="ruleForm.id ? '编辑页面' : '添加页面'" :visible="visible" @close="closeFn">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-position="left" label-width="80px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="ruleForm.title" />
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <div class="local-quill-editor">
            <quill-editor v-model="ruleForm.content" :options="editorOption" class="editor"
              @blur="$refs.ruleForm.validateField('content')" />
          </div>
        </el-form-item>
        <el-form-item class="button-style">
          <el-button type="primary" @click="submitForm(ruleForm)">确认</el-button>
          <el-button @click="closeFn">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { addPageList, changeCategory } from '@/api/pagesList'
// 富文本配置↓
const toolbarOptions = [
  // 字体大小-----[{ size: ['small', false, 'large', 'huge'] }]
  [{ size: ['small', false, 'large', 'huge'] }],
  // 加粗 斜体 下划线 删除线 -----['bold', 'italic', 'underline', 'strike']
  ['bold', 'italic', 'underline', 'strike'],
  // 对齐方式-----[{ align: [] }]
  [{ align: [] }],
  // 引用  代码块-----['blockquote', 'code-block']
  ['blockquote', 'code-block'],
  // 有序、无序列表-----[{ list: 'ordered' }, { list: 'bullet' }]
  [{ list: 'ordered' }, { list: 'bullet' }],
  // 缩进-----[{ indent: '-1' }, { indent: '+1' }]
  [{ indent: '-1' }, { indent: '+1' }],
  // 字体颜色、字体背景颜色-----[{ color: [] }, { background: [] }]
  [{ color: [] }, { background: [] }],

  // 链接、图片、视频-----['link', 'image', 'video']
  ['image', 'video'],
  // 清除文本格式-----['clean']
  ['clean']
]
export default {
  props: {
    visible: Boolean,
    ruleForm: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ]
      },
      imageUrl: '',
      defaultImg: '',
      editorOption: {
        modules: {
          toolbar: toolbarOptions
        },
        theme: 'snow',
        placeholder: ''
        // Some Quill optiosn...
      },
      newForm: {
        id: '',
        title: '',
        content: ''
      }
    }
  },
  methods: {
    // ———————————————————————————————————————————————————————————————— 弹窗类方法
    async submitForm(form) { // 提交分类
      if (form.id) {
        // 编辑
        console.log(12312312321)
        this.$emit('update')
        // 提示用户修改完成
        this.$message.success('修改成功')
      } else {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            console.log(1111)
          } else {
            console.log('error submit!!')
            return false
          }
        })
        // 添加
        // this.newForm = { ...form }
        // this.newForm.content = form.content.replace(/<[^>]+>/g, '')
        // // 调用接口添加
        // await addPageList(this.newForm)
        // // 更新刷新数据
        // this.$emit('update')
        // // 提示用户添加完成
        // this.$message.success('添加成功')
      }
      // 重置表单验证
      // this.$refs.ruleForm.resetFields()
      // 关闭弹窗
      // this.$emit('closeDia')
    },
    closeFn() { // 关闭弹窗
      this.$refs.ruleForm.resetFields()
      this.$emit('closeDia')
    }
  }
}
</script>
<style scoped>
.button-style {
  text-align: right;
}

.local-quill-editor {
  height: 283px;
}

.editor {
  height: 200px;
}
</style>
