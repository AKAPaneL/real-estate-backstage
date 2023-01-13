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
        />
        <el-table-column
          label="邮箱"
        />
        <el-table-column
          label="操作"
        />
      </el-table>

      <!-- <div class="block">
        <span class="demonstration">共计31条</span>
        <el-pagination
          :current-page.sync="currentPage2"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="sizes, prev, pager, next"
          :total="1000"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div> -->
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
        limit: this._limit,
        start: this._start
      })
      console.log(res)
    }
  }

}
</script>

  <style>

  </style>
