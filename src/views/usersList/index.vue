<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools>
        <template #after>
          <el-button type="primary">添加员工</el-button>
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
        <el-table-column label="操作">
          <template #default>
            <el-button>编辑</el-button>
            <el-button type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getUsersList } from '@/api/employees'
export default {
  data() {
    return {
      usersList: [],
      limit: 2,
      start: 0
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
    }
  }

}
</script>

  <style>

  </style>
