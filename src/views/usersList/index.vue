<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools>
        <template #after>
          <el-button type="primary" @click="addUsersList">添加员工</el-button>
        </template>
      </page-tools>

      <el-table
        :data="usersList"
        style="width: 100%"
      >
        <el-table-column
          label="用户名"
          prop="username"
        />
        <el-table-column
          label="邮箱"
          prop="email"
        />
        <el-table-column label="操作" width="280px">
          <template #default="{row}">
            <el-button type="primary" @click="editRole(row.id)">设置角色</el-button>
            <el-button @click="test(row.id)">编辑</el-button>
            <el-button type="danger" @click="delList(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog :visible.sync="visible">
      <el-form>
        <el-form-item label="员工名称">
          <el-input v-model="usersList.username" />
        </el-form-item>
        <el-form-item label="员工邮箱">
          <el-input v-model="usersList.email" />
        </el-form-item>
        <el-form-item label="员工密码">
          <el-input v-model="usersList.password" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="saveUser">确 定</el-button>
          <el-button @click="visible = false">取 消</el-button>
        </div>
      </template>
    </el-dialog>
    <editRole ref="role" />
  </div>
</template>

<script>
import editRole from './components/edit-role.vue'
import { getUsersList, getDelList, createUsers } from '@/api/employees'
import { getUserById } from '@/api/user'
export default {
  components: {
    editRole
  },
  data() {
    return {
      usersList: [],
      limit: 999,
      start: 0,
      visible: false
    }
  },
  created() {
    this.loadEmployeeList()
  },
  methods: {
    async loadEmployeeList() {
      const res = await getUsersList({
        _limit: this.limit,
        _start: this.start
      })
      this.usersList = res
    },
    async saveUser() {
      await createUsers(this.usersList)
      // 保存成功
      this.$message.success('保存成功')
      // 关闭弹窗
      this.visible = false
      // 刷新页面
      this.loadEmployeeList()
    },
    addUsersList() {
      // 显示弹窗
      this.visible = true
    },
    async delList(id) {
      await this.$confirm('此操作不可撤回, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      // 消息提示
      this.$message.success('删除成功')
      await getDelList(id)
      // 刷新页面
      this.loadEmployeeList()
    },
    async editRole(id) {
      const res = await getUserById(id)
      this.$refs.role.userId = id
      this.$refs.role.checkList = res.roles.map(item => item.id)
      this.$refs.role.show()
    }
  }

}
</script>

  <style>

  </style>
