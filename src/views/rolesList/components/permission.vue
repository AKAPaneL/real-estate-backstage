<template>
  <el-dialog :visible.sync="visible" title="分配权限">
    <el-checkbox-group v-model="checkList">
      <el-checkbox v-for="item in PermissionList" :key="item.id" :label="item.id">{{ item.title }}</el-checkbox>
    </el-checkbox-group>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="savePermission">确 定</el-button>
        <el-button @click="visible = false">取 消</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script>
import { getAllPermissionList } from '@/api/permission'
import { getEditRoles } from '@/api/rolesList'
export default {
  data() {
    return {
      visible: false,
      checkList: [],
      PermissionList: [],
      roleId: ''
    }
  },
  created() {
    this.getPermissionList()
  },
  methods: {
    show() {
      this.visible = true
    },
    async getPermissionList() {
      const res = await getAllPermissionList()
      console.log(res)
      this.PermissionList = res
    },
    async savePermission() {
      await getEditRoles({
        id: this.roleId,
        permissions: this.checkList
      })
      this.$message.success('分配成功')
      this.visible = false
    }
  }
}
</script>
<style>

</style>
