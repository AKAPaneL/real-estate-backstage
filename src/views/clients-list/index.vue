<template>
  <div class="clients-contains">
    <el-card class="box-card">
      <!-- 卡片头部 -->
      <div slot="header" class="clearfix">
        <el-button type="primary" @click="visible=true">添加客户</el-button>
        <div class="search">
          <el-input v-model="name_contains" placeholder="请输入内容" class="input-with-select" @input="getClientsListByAgent">
            <el-select slot="prepend" v-model="agent" placeholder="经纪人" @change="getClientsListByAgent">
              <el-option label="全部经纪人" value="全部经纪人" />
              <el-option v-for="item in agentList" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
            <el-button slot="append" icon="el-icon-search" @click="getClientsListByAgent" />
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
              <el-button type="primary" @click="editor(row.id)">编辑</el-button>
              <el-button type="danger" @click="deleteClient(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-pagination
          background
          :pager-count="5"
          layout="prev, pager, next"
          :total="total"
          :page-size="pageSize"
          :current-page.sync="currentPage"
          @current-change="loadClientsList"
        />
        <form-dialog ref="formDialog" :visible="visible" @close="closeForm" @refresh="refresh" />
      </div>
    </el-card>
  </div>
</template>
<script>
import { getClientsList, getClientsCount, deleteClient, getSingleClient } from '@/api/clients'
import formDialog from './components/form-dialog.vue'
import ClientHead from '@/assets/common/client-head.jpeg'
// 根据数据获取 单个 经济 的id和name 列表
function getAgentList(res) {
  let arr = []
  res.forEach((item) => {
    if (item.agent && item.agent.name) {
      arr.push(item.agent.name)
    }
  })
  // 去重
  arr = Array.from(new Set(arr))
  const newArr = arr.map((value) => {
    const client = res.find((item) => {
      if (item.agent && item.agent.name) {
        return item.agent.name === value
      }
      return false
    })
    return { id: client.agent.id, name: client.agent.name }
  })
  return newArr
}
export default {
  components: {
    formDialog
  },
  data() {
    return {
      visible: false,
      imagerror: ClientHead,
      currentPage: 1,
      total: 10,
      pageSize: 2,
      start: 0,
      agent: '全部经纪人',
      name_contains: '',
      clientsList: [],
      agentList: []
    }
  },
  created() {
    this.loadClientsCount()
    this.loadClientsList()
    this.loadAgentList()
  },
  methods: {
    // 获取 用户列表 要判断是否有参数
    async loadClientsList() {
      let res = {}
      // 如果没有参数
      if (!(this.name_contains || this.agent !== '全部经纪人')) {
        res = await getClientsList({
          _limit: this.pageSize,
          _start: (this.currentPage - 1) * 2
        })
      } else if (this.name_contains && this.agent === '全部经纪人') {
        // 如果有一个搜索参数
        res = await getClientsList({
          _limit: this.pageSize,
          _start: (this.currentPage - 1) * 2,
          name_contains: this.name_contains
        })
      } else if (this.agent !== '全部经纪人' && !this.name_contains) {
        // 如果有一个经纪人参数 且不能是 ‘全部经纪人’
        res = await getClientsList({
          _limit: this.pageSize,
          _start: (this.currentPage - 1) * 2,
          agent: this.agent
        })
      } else {
        // 两个参数都有
        res = await getClientsList({
          _limit: this.pageSize,
          _start: (this.currentPage - 1) * 2,
          name_contains: this.name_contains,
          agent: this.agent
        })
      }
      this.clientsList = res
    },
    // 获取列表数量  也要判断参数
    async loadClientsCount() {
      console.log(ClientHead);
      let res = {}
      // 如果没有参数
      if (!(this.name_contains || this.agent !== '全部经纪人')) {
        res = await getClientsCount()
      } else if (this.name_contains) {
        // 如果有一个搜索参数
        res = await getClientsCount({
          name_contains: this.name_contains
        })
      } else if (this.agent !== '全部经纪人') {
        // 如果有一个经纪人参数 且不能是 ‘全部经纪人’
        res = await getClientsCount({
          agent: this.agent
        })
      } else {
        // 两个参数都有
        res = await getClientsCount({
          name_contains: this.name_contains,
          agent: this.agent
        })
      }
      this.total = res
    },
    // 获取全部客户的经济列表
    async loadAgentList() {
      const res = await getClientsList({
        _limit: 99999,
        _start: 0
      })
      this.agentList = getAgentList(res)
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
      this.total -= 1
      // 重新刷新页面 刷新之前要判断 是否是最后一个数据
      if (this.clientsList.length === 1) {
        if (this.currentPage > 1) {
          this.currentPage -= 1
        }
        this.loadClientsList()
        this.loadAgentList()
      } else {
        this.loadClientsList()
        this.loadAgentList()
      }
    },
    // 通过经纪人获取列表
    async getClientsListByAgent() {
      this.currentPage = 1
      this.loadClientsList()
      this.loadClientsCount()
    },
    async editor(id) {
      this.visible = true
      const res = await getSingleClient(id)
      this.$refs.formDialog.editor(res)
    },
    // 关闭表单的方法
    closeForm() {
      // 关闭表单
      this.visible = false
      // 调用内部的接口 清理表单
      this.$refs.formDialog.resetForm()
    },
    // 修改数据之后的刷新
    refresh() {
      this.loadClientsCount()
      this.loadClientsList()
      this.loadAgentList()
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
