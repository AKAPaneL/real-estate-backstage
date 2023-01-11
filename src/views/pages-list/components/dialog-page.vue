<template>
  <div>
    <el-dialog :title="ruleForm.id ? '编辑页面' : '添加页面'" :visible="visible" @close="closeFn">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-position="left" label-width="80px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="ruleForm.title" />
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <quill-edi />
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
import { addCategory, changeCategory } from '@/api/category'
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
          { required: true, message: '请输入描述', trigger: 'blur' }
        ]
      },
      imageUrl: '',
      defaultImg: ''
    }
  },
  methods: {
    // ———————————————————————————————————————————————————————————————— 弹窗类方法
    async submitForm(form) { // 提交分类
      if (form.id) {
        form.image = this.defaultImg
        // 编辑
        await changeCategory(form)
        this.$emit('update')
        // 提示用户修改完成
        this.$message.success('修改成功')
      } else {
        // 添加
        form.image = this.imageUrl ? this.imageUrl : 'https://fd.co188.com/group1/M04/5D/96/rBBhH11H-H6AMoWYAB5mkmBK0Fc405.jpg'
        await addCategory(form)
        this.$refs.ruleForm.resetFields()
        this.ruleForm.image = ''
        this.$emit('update')
        // 提示用户添加完成
        this.$message.success('添加成功')
      }
      // 关闭弹窗
      this.$emit('closeDia')
    },
    closeFn() { // 关闭弹窗
      this.$refs.ruleForm.resetFields()
      this.$emit('closeDia')
    },
    UploadImage(url) { // 接收腾讯云链接
      this.imageUrl = url
    },
    deleteImg() {
      console.log(1111)
      this.defaultImg = 'https://fd.co188.com/group1/M04/5D/96/rBBhH11H-H6AMoWYAB5mkmBK0Fc405.jpg'
    }
  }
}
</script>
<style scoped>
.button-style {
  text-align: right;
}
</style>
