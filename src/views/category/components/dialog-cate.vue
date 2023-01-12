<template>
  <div>
    <el-dialog :title="ruleForm.id ? '编辑分类' : '添加分类'" :visible="visible" @close="$emit('close')">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-position="left" label-width="80px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="ruleForm.title" />
        </el-form-item>
        <el-form-item label="描述" prop="desc">
          <el-input v-model="ruleForm.desc" type="textarea" :rows="4" resize="none" />
        </el-form-item>
        <el-form-item label="封面">
          <upload-image ref="upload" @upImageSuccess="updataImage" />
          <!-- 上传图片组件 -->
          <el-input placeholder="强制设置图片跳过上传" />
        </el-form-item>
        <el-form-item class="button-style">
          <el-button type="primary" @click="submitForm(ruleForm)">确认</el-button>
          <el-button @click="$emit('close')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { addCategory, changeCategory } from '@/api/category'
import ClientHead from '@/assets/common/client-head.jpeg'
export default {
  props: {
    visible: Boolean
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
      defaultImg: '',
      ruleForm: {
        title: '',
        desc: '',
        image: 'https://fd.co188.com/group1/M04/5D/96/rBBhH11H-H6AMoWYAB5mkmBK0Fc405.jpg'
      }
    }
  },
  methods: {
    // ———————————————————————————————————————————————————————————————— 弹窗类方法
    updataImage(url) { // 图片显示
      console.log(url)
      this.ruleForm.image = url
    },
    async submitForm(form) { // 提交分类
      await this.$refs.ruleForm.validate()
      if (form.id) {
        // 编辑
        await changeCategory(this.ruleForm)
        // 提示用户修改完成
        this.$message.success('修改成功')
      } else {
        // 添加
        // 调用接口添加
        await addCategory(this.ruleForm)
        // 重置表单
        this.$refs.ruleForm.resetFields()
        // 提示用户添加完成
        this.$message.success('添加成功')
      }
      // 更新数据
      this.$emit('update')
      // 关闭弹窗
      this.$emit('close')
    },
    resetForm() { // 清空表单方法
      this.$refs.ruleForm.resetFields()
      this.ruleForm = {
        title: '',
        desc: '',
        image: 'https://fd.co188.com/group1/M04/5D/96/rBBhH11H-H6AMoWYAB5mkmBK0Fc405.jpg'
      }
      this.$refs.upload.remove()
    },
    // 数据回填方法
    editor(res) {
      if (res.title) {
        console.log(res.image)
        this.ruleForm = res
      }
      this.$refs.upload.backImage(res.image)
    }
  }
}
</script>
<style scoped>
.button-style {
  text-align: right;
}
</style>
