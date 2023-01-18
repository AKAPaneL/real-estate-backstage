<template>
  <el-dialog :visible.sync="visible" title="分配权限">
    <div>
      权限列表
    </div>
  </el-dialog>
</template>
<script>
import { getAllPermissionList } from '@/api/permission'
export default {
  data() {
    return {
      visible: false
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
    }
  }
}
</script>
<style>

</style>
