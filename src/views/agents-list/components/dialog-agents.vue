<template>
  <div>
    <el-dialog :title="ruleForm.id ? '编辑经纪' : '添加经纪'" :visible="visible" @close="closeFn">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-position="right" label-width="80px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item
          prop="email"
          label="邮箱"
          :rules="[
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
          ]"
        >
          <el-input v-model="ruleForm.email" />
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="ruleForm.phone" />
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="ruleForm.address" />
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
import { addAgents, changeAgents } from '@/api/agents'
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
        name: [
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
      await this.$refs.ruleForm.validate()
      if (form.id) {
        // 编辑
        this.newForm = { ...form }
        if (this.defaultImg) {
          this.newForm.image = this.imageUrl ? this.imageUrl : this.defaultImg
        }
        if (!this.newForm.image) {
          this.newForm.image = 'https://fd.co188.com/group1/M04/5D/96/rBBhH11H-H6AMoWYAB5mkmBK0Fc405.jpg'
        }
        this.defaultImg = ''
        this.imageUrl = ''
        await changeAgents(this.newForm)
        // this.defaultImg = ''
        this.$emit('update')
        // 提示用户修改完成
        this.$message.success('修改成功')
        // 关闭弹窗
        this.closeFn()
      } else {
        // 添加
        form.image = this.imageUrl ? this.imageUrl : 'https://fd.co188.com/group1/M04/5D/96/rBBhH11H-H6AMoWYAB5mkmBK0Fc405.jpg'
        // 调用接口添加
        await addAgents(form)
        // 重置表单
        this.$refs.ruleForm.resetFields()
        this.ruleForm.image = ''
        // 更新数据
        this.$emit('update')
        // 提示用户添加完成
        this.$message.success('添加成功')
        // 关闭弹窗
        this.closeFn()
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
