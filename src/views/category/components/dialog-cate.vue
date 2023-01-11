<template>
  <div>
    <el-dialog :title="ruleForm.id ? '编辑分类' : '添加分类'" :visible="visible" @close="closeFn">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules">
        <el-form-item label="标题" prop="title">
          <el-input v-model="ruleForm.title" />
        </el-form-item>
        <el-form-item label="描述" prop="desc">
          <el-input v-model="ruleForm.desc" type="textarea" :rows="4" resize="none" />
        </el-form-item>
        <el-form-item label="封面">
          <upload-image :image-url="Edimg" @image="UploadImage" /> <!-- 上传图片组件 -->
          <el-input placeholder="强制设置图片跳过上传" />
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
export default {
  props: {
    visible: Boolean,
    // form: {
    //   type: Object,
    //   default: () => ({})
    // }
  },
  data() {
    return {
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '请输入描述', trigger: 'blur' }
        ]
      },
      ruleForm: this.form,
      Edimg: this.ruleForm.image
    }
  },
  methods: {
    UploadImage(url) { // 接收腾讯云链接
      this.ruleForm.image = url
    },
    closeFn() {
      this.$emit('update:visible', false)
    }
  }
}
</script>
<style>

</style>
