<template>
  <div>
    <el-dialog :title="ruleForm.id ? '编辑分类' : '添加分类'" :visible="visible" @close="closeFn">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-position="left" label-width="80px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="ruleForm.title" />
        </el-form-item>
        <el-form-item label="描述" prop="desc">
          <el-input v-model="ruleForm.desc" type="textarea" :rows="4" resize="none" />
        </el-form-item>
        <el-form-item label="封面">
          <upload-image ref="upload" :image-url="ruleForm.image" @image="UploadImage" @delete="deleteImg" />
          <!-- 上传图片组件 -->
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
        desc: [
          { required: true, message: '请输入描述', trigger: 'blur' }
        ]
      },
      imageUrl: '',
      defaultImg: '',
      newForm: {}
    }
  },
  methods: {
    // ———————————————————————————————————————————————————————————————— 弹窗类方法
    async submitForm(form) { // 提交分类
      if (form.id) {
        // 编辑
        this.$refs.ruleForm.validate(async (valid) => {
          if (valid) {
            this.newForm = { ...form }
            if (this.defaultImg) {
              this.newForm.image = this.imageUrl ? this.imageUrl : this.defaultImg
            }
            if (!this.newForm.image) {
              this.newForm.image = 'https://fd.co188.com/group1/M04/5D/96/rBBhH11H-H6AMoWYAB5mkmBK0Fc405.jpg'
            }
            this.defaultImg = ''
            this.imageUrl = ''
            await changeCategory(this.newForm)
            // this.defaultImg = ''
            this.$emit('update')
            // 提示用户修改完成
            this.$message.success('修改成功')
            this.closeFn()
          } else {
            console.log('error submit!!')
            // 重置表单
            this.$refs.ruleForm.resetFields()
            this.$message({
              message: '请输入正确',
              type: 'warning'
            })
            return false
          }
        })
      } else {
        // 添加
        this.$refs.ruleForm.validate(async (valid) => {
          if (valid) {
            form.image = this.imageUrl ? this.imageUrl : 'https://fd.co188.com/group1/M04/5D/96/rBBhH11H-H6AMoWYAB5mkmBK0Fc405.jpg'
            // 调用接口添加
            await addCategory(form)
            // 重置表单
            this.$refs.ruleForm.resetFields()
            this.ruleForm.image = ''
            // 更新数据
            this.$emit('update')
            // 提示用户添加完成
            this.$message.success('添加成功')
            // 关闭弹窗
            this.closeFn()
          } else {
            console.log('error submit!!')
            // 重置表单
            this.$refs.ruleForm.resetFields()
            this.$message({
              message: '请输入正确',
              type: 'warning'
            })
            return false
          }
        })
      }
    },
    closeFn() { // 关闭弹窗
      this.$refs.ruleForm.resetFields()
      this.$emit('closeDia')
    },
    UploadImage(url) { // 接收腾讯云链接
      this.imageUrl = url
    },
    deleteImg(url) {
      this.defaultImg = url
      console.log(url)
      this.newForm.image = ''
    }
  }
}
</script>
<style scoped>
.button-style {
  text-align: right;
}
</style>
