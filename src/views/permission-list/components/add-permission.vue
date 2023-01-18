<template>
  <div>
    <el-dialog :title="form.id?'编辑权限':'添加权限'" :visible.sync="visible" width="500px" @close="reset">
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item label="权限名称" prop="title">
          <el-input v-model="form.title" autocomplete="off" />
        </el-form-item>
        <el-form-item label="权限标识" prop="code">
          <el-input v-model="form.code" autocomplete="off" />
        </el-form-item>
        <el-form-item label="权限描述" prop="description">
          <el-input v-model="form.description" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visible=false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { addPermission, editPermission } from '@/api/permission'
export default {
  data() {
    return {
      visible: false,
      form: {
        title: '',
        code: '',
        description: '',
        pid: '0',
        type: '1'
      },
      rules: {
        title: [
          { required: true, message: '请输入权限名称', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入权限标识', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入权限描述', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    show() {
      this.visible = true
    },
    async save() {
      await this.$refs.form.validate()
      //   有id就是编辑
      if (this.form.id) {
        await editPermission(this.form)
        this.$message.success('修改成功')
      } else {
        await addPermission(this.form)
        this.$message.success('添加成功')
      }
      this.visible = false
      //   重置表单
      this.reset()
      //   刷新列表
      this.$emit('refresh')
    },
    // 重置表单
    reset() {
      this.$refs.form.resetFields()
      this.form = {
        title: '',
        code: '',
        description: '',
        pid: '0',
        type: '1'
      }
    }
  }
}
</script>
<style>

</style>
