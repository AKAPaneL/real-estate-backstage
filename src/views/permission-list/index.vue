<template>
  <div class="permission-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button type="primary" @click="$refs.addform.show()">添加权限</el-button>
      </div>
      <el-table
        :data="permissionList"
        border
        style="width: 100%"
      >
        <el-table-column
          prop="title"
          label="权限名称"
        />
        <el-table-column
          prop="code"
          label="权限标识"
        />
        <el-table-column
          prop="description"
          label="权限描述"
        />
        <el-table-column label="操作" width="296px">
          <template #default="{row}">
            <el-button type="primary">添加子权限</el-button>
            <el-button @click="editor(row.id)">编辑</el-button>
            <el-button type="danger" @click="deletePermission(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <addPermission ref="addform" @refresh="getPermissList" />
    </el-card>
  </div>
</template>
<script>
import { getAllPermissionList, deletePermission, getSinglePermission } from '@/api/permission'
import addPermission from './components/add-permission.vue'
export default {
  components: {
    addPermission
  },
  data() {
    return {
      permissionList: [{
        title: '2016-05-02',
        code: '王小虎',
        description: '上海'
      }]
    }
  },
  created() {
    this.getPermissList()
  },
  methods: {
    async getPermissList() {
      const res = await getAllPermissionList()
      this.permissionList = res
    },
    async deletePermission(id) {
      await this.$confirm('此操作将永久删除该权限, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      await deletePermission(id)
      this.$message.success('删除成功')
      // 刷新列表
      this.getPermissList()
    },
    async editor(id) {
      const res = await getSinglePermission(id)
      this.$refs.addform.show()
      this.$refs.addform.form = res
    }
  }
}
</script>
<style scoped>
.permission-container{
  padding: 20px;
}
.clearfix{
  text-align: right;
}

</style>
