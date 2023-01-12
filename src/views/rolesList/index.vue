<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools>
        <template #after>
          <el-button type="primary" @click="showRoleDialog = true">添加角色</el-button>
        </template>
      </page-tools>

      <el-table
        :data="rolesList"
        style="width: 100%"
      >
        <el-table-column
          prop="title"
          label="角色名称"
        />
        <el-table-column
          prop="description"
          label="角色描述"
        />
        <el-table-column label="操作">
          <template #default="{row}">
            <el-button type="primary">分配权限</el-button>
            <el-button>编辑</el-button>
            <el-button type="danger" @click="delRole(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="新增角色" :visible.sync="showRoleDialog">
      <el-form>
        <el-form-item label="角色名称">
          <el-input />
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          <el-button @click="dialogVisible = false">取 消</el-button>
        </div>
      </template>
      <el-dialog />
    </el-dialog></div>
</template>

<script>
import { getRoles, deleteRoles } from '@/api/rolesList'
export default {
  data() {
    return {
      rolesList: [],
      limit: 2,
      start: 0,
      showRoleDialog: false
    }
  },
  created() {
    this.loadRoles()
  },
  methods: {
    async loadRoles() {
      const res = await getRoles({
        limit: this._limit,
        start: this._start
      })
      this.rolesList = res
    },
    async delRole(id) {
      await this.$confirm('此操作不可撤回, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      // 提示用户
      this.$message.success('删除成功')
      // 调用接口
      await deleteRoles(id)
      // 页面刷新
      this.loadRoles()
    }

  }
}
</script>

  <style scoped>
.dialog-footer {
  text-align: center
}
  </style>
