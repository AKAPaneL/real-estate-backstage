<template>
  <div class="dashboard-container">
    <div v-loading="loading" class="app-container">
      <page-tools>
        <template #after>
          <el-button type="primary" @click="addRole">添加角色</el-button>
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
        <el-table-column label="操作" width="280px">
          <template #default="{row}">
            <el-button type="primary" @click="editPermission(row.id)">分配权限</el-button>
            <el-button @click="editRole(row.id)">编辑</el-button>
            <el-button type="danger" @click="delRole(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog :title="roleForm.id ? '编辑角色' : '新增角色'" :visible.sync="showRoleDialog">
      <el-form>
        <el-form-item label="角色名称">
          <el-input v-model="roleForm.title" />
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="roleForm.description" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="saveRole">确 定</el-button>
          <el-button @click="showRoleDialog = false">取 消</el-button>
        </div>
      </template>
      <el-dialog />
    </el-dialog>
    <el-pagination
      layout="prev, pager, next"
      :total="total"
      class="page"
      :page-size="2"
      :current-page.sync="currentPage"
      @current-change="loadRoles"
    />
    <permission ref="permission" />
  </div>
</template>

<script>
import { getRoles, deleteRoles, createRoles,
  getRolesId, getEditRoles, getRolesCount } from '@/api/rolesList'

import permission from './components/permission.vue'
export default {
  components: {
    permission
  },
  data() {
    return {
      rolesList: [],
      currentPage: 1,
      limit: 2,
      start: 0,
      showRoleDialog: false,
      roleForm: {
        title: '', // 角色名称
        description: '' // 角色描述
      },
      total: 0,
      loading: false
    }
  },
  created() {
    this.loadRoles()
    this.loadRolesCount()
  },
  methods: {
    async loadRoles() {
      const res = await getRoles({
        _limit: this.limit,
        _start: (this.currentPage - 1) * 2
      })
      this.rolesList = res
    },
    async loadRolesCount() {
      this.loading = true // 加载中
      const res = await getRolesCount()
      this.total = res
      this.loading = false // 关闭加载
    },
    async saveRole() {
      if (!this.roleForm.id) {
        await createRoles(this.roleForm)
        // 创建成功
        this.$message.success('保存成功')
      } else {
        await getEditRoles(this.roleForm)
        // 创建成功
        this.$message.success('保存成功')
      }
      // 关闭弹窗
      this.showRoleDialog = false
      // 列表更新
      this.loadRoles()
      this.loadRolesCount()
    },
    addRole() {
      // 重置表单
      this.roleForm = {
        title: '',
        description: ''
      }
      // 显示弹窗
      this.showRoleDialog = true
    },
    async editRole(id) {
      // 根据id获取最新角色
      const res = await getRolesId(id)
      this.roleForm = res
      // 显示弹窗
      this.showRoleDialog = true
    },
    async delRole(id) {
      await this.$confirm('此操作不可撤回, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      // 调用接口
      await deleteRoles(id)
      if (this.rolesList.length === 1) {
        this.currentPage -= 1
      }
      // 提示用户
      this.$message.success('删除成功')
      // 页面刷新
      this.loadRoles()
      this.loadRolesCount()
    },
    async editPermission(id) {
      const res = await getRolesId(id)
      if (res) {
        this.$refs.permission.roleId = id
        this.$refs.permission.checkList = res.permissions.map(item => item.id)
        this.$refs.permission.show()
      } else {
        this.$message.error('该用户不存在，请刷新页面')
      }
    }
  }
}
</script>

  <style scoped>
.dialog-footer {
  text-align: center
}

.page {
  text-align: center;
  margin-top: 15px
}
  </style>
