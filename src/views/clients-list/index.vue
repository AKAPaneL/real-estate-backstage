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
          <el-table-column
            prop="image"
            label="图片"
          />
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
          <el-table-column
            label="操作"
          />
        </el-table>
        <!-- 分页组件 -->
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          :page-size="pageSize"
        />
      </div>
    </el-card>
  </div>
</template>
<script>
import { getClientsList } from '@/api/clients'
export default {
  data() {
    return {
      input: '',
      select: '',
      total: 10,
      pageSize: 2,
      clientsList: [
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ]
    }
  },
  created() {
    this.loadClientsList()
  },
  methods: {
    async loadClientsList() {
      const res = await getClientsList()
      this.clientsList = res
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
