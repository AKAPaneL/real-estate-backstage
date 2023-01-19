<template>
  <el-dialog :visible.sync="visible" title="编辑角色">
    <el-checkbox-group v-model="checkList">
      <el-checkbox v-for="item in RoleList" :key="item.id" :label="item.id">{{ item.title }}</el-checkbox>
    </el-checkbox-group>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="saveRole">确 定</el-button>
        <el-button @click="visible = false">取 消</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script>
import { getRoles } from '@/api/rolesList'
import { editUser } from '@/api/user'
export default {
  data() {
    return {
      visible: false,
      checkList: [],
      RoleList: [],
      userId: ''
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    show() {
      this.visible = true
    },
    async getRoleList() {
      const res = await getRoles({
        _limit: 9999,
        _start: 0
      })
      this.RoleList = res
    },
    async saveRole() {
      await editUser({
        id: this.userId,
        roles: this.checkList
      })
      this.$message.success('分配成功')
      this.visible = false
    }
  }
}
</script>
  <style>

  </style>

