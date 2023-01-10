<template>
  <div class="clients-contains">
    <el-card class="box-card">
      <!-- 卡片头部 -->
      <div slot="header" class="clearfix">
        <el-button type="primary">添加客户</el-button>
        <div class="search">
          <el-input v-model="input" placeholder="请输入内容" class="input-with-select">
            <el-select slot="prepend" v-model="select" placeholder="经纪人">
              <el-option label="全部经纪人" value="1" />
              <el-option label="张某" value="2" />
              <el-option label="关某" value="3" />
            </el-select>
            <el-button slot="append" icon="el-icon-search" />
          </el-input>
        </div>
      </div>
      <!-- 卡片内容部分 -->
      <div>
        <!-- 表格 -->
        <el-table
          :data="clientsList"
          border
          style="width: 100%"
        >
          <el-table-column prop="image" label="图片" width="200px">
            <template #default="{row}">
              <img v-imagerror="imagerror" :src="row.image" width="180px" height="180px">
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="昵称"
          />
          <el-table-column
            prop="email"
            label="邮箱"
          />
          <el-table-column
            prop="phone"
            label="电话"
          />
          <el-table-column
            prop="agent.name"
            label="经纪人"
          />
          <el-table-column
            prop="wechat"
            label="微信"
          />
          <el-table-column
            prop="desc"
            label="介绍"
          />
          <el-table-column label="操作" width="172px">
            <template #default="{row}">
              <el-button type="primary">编辑</el-button>
              <el-button type="danger" @click="deleteClient(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          :page-size="pageSize"
          @current-change="pageChange"
        />
      </div>
    </el-card>
  </div>
</template>
<script>
import { getClientsList, getClientsCount, deleteClient } from '@/api/clients'
import ClientHead from '@/assets/common/client-head.jpeg'
export default {
  data() {
    return {
      imagerror: ClientHead,
      input: '',
      select: '',
      total: 10,
      pageSize: 2,
      start: 0,
      clientsList: []
    }
  },
  created() {
    this.loadClientsCount()
    this.loadClientsList()
  },
  methods: {
    // 获取用户列表
    async loadClientsList() {
      const res = await getClientsList({
        _limit: this.pageSize,
        _start: this.start
      })
      this.clientsList = res
    },
    // 获取列表总数量
    async loadClientsCount() {
      const res = await getClientsCount()
      this.total = res
    },
    // 当页面改变的时候
    pageChange(page) {
      this.start = (page - 1) * 2
      this.loadClientsList()
    },
    // 删除客户信息
    async deleteClient(id) {
      await this.$confirm('此操作将永久删除该客户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      // 如果点击确认  调用删除接口
      await deleteClient(id)
      // 删除成功之后弹出信息
      this.$message.success('删除成功')
      // 重新刷新页面
      this.loadClientsList()
    }
  }
}
</script>
<style scoped>
.clearfix{
  display: flex;
}
.search{
  width: 50%;
  margin-left: auto;
}
  .clients-contains{
    padding: 15px 10px 10px ;
  }
  .el-input-group__prepend .el-select{
    width: 130px;
  }
  .el-pagination{
    text-align: center;
    margin-top: 20px;
  }
</style>
