<template>
  <el-dialog title="添加分类" :visible="visible" @close="closeFn">
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item label="标题" prop="title">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="描述" prop="desc">
        <el-input type="textarea" :rows="4" resize="none" />
      </el-form-item>
      <el-form-item label="封面">
        <upload-image /> <!-- 上传图片组件 -->
        <el-input v-model="ruleForm.name" placeholder="强制设置图片跳过上传" />
      </el-form-item>
      <el-form-item class="button-style">
        <el-button type="primary" @click="submitForm('ruleForm')">确认</el-button>
        <el-button @click="closeFn">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
export default {
  props: {
    visible: Boolean
  },
  data() {
    return {
      ruleForm: {},
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '请输入描述', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    closeFn() {
      this.$emit('close')
    }
  }
}
</script>
<style scoped>
.button-style {
    text-align: right;
}
</style>
