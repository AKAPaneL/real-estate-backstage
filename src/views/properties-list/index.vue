<template>
  <div class="properties-contains">
    <el-card class="box-card">
      <!-- 卡片头部 -->
      <div slot="header" class="clearfix">
        <el-button type="primary" @click="visible = true">添加房产</el-button>
        <div class="search">
          <el-select label="全部分类" placeholder="全部分类">
            <el-option v-for="item in classification" :key="item.id" :label="item.desc" :value="item.id" />
          </el-select>
          <el-input
            v-model="name_contains"
            placeholder="请输入内容"
            class="input-with-select"
            @input="getPropertiesListByAgent"
          >
            <el-select slot="prepend" v-model="agent" placeholder="经纪人" @change="getPropertiesListByAgent">
              <el-option label="全部经纪人" value="全部经纪人" />
              <el-option v-for="item in agentList" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
            <el-button slot="append" icon="el-icon-search" @click="getPropertiesListByAgent" />
          </el-input>
        </div>
      </div>
      <!-- 卡片内容部分 -->
      <div>
        <!-- 表格 -->
        <el-table :data="PropertiesList" border style="width: 100%">
          <el-table-column prop="image" label="封面" width="200px">
            <template #default="{ row }">
              <img v-imagerror="imagerror" :src="row.image" width="180px" height="180px">
            </template>
          </el-table-column>
          <el-table-column prop="title" label="标题" />
          <el-table-column prop="tags" label="标签" />
          <el-table-column prop="address" label="地址" />
          <el-table-column prop="category.title" label="分类" />
          <el-table-column prop="agent.name" label="经纪人" />
          <el-table-column prop="price" label="价格" />
          <el-table-column prop="desc" label="介绍" />
          <el-table-column prop="image" label="图片" width="200px">
            <template #default="{ row }">
              <img v-imagerror="imagerror" :src="row.image" width="180px" height="180px">
            </template>
          </el-table-column>
          <el-table-column label="操作" width="172px">
            <template #default="{ row }">
              <el-button type="primary" @click="editor(row.id)">编辑</el-button>
              <el-button type="danger" @click="deleteProperties(row.id)">删除</el-button>
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
          @current-change="loadPropertiesList"
        />
        <form-dialog ref="formDialog" :visible="visible" @close="closeForm" @refresh="refresh" />
      </div>
    </el-card>
  </div>
</template>
<script>
import { getPropertiesList, getPropertiesCount, deleteProperties, getProperties } from '@/api/properties'
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
      PropertiesList: [],
      agentList: [],
      classification: []
    }
  },
  created() {
    this.loadPropertiesCount()
    this.loadPropertiesList()
    this.loadAgentList()
  },
  methods: {
    // 获取 用户列表 要判断是否有参数
    async loadPropertiesList() {
      let res = {}
      // 如果没有参数
      if (!(this.name_contains || this.agent !== '全部经纪人')) {
        res = await getPropertiesList({
          _limit: this.pageSize,
          _start: (this.currentPage - 1) * 2
        })
      } else if (this.name_contains && this.agent === '全部经纪人') {
        // 如果有一个搜索参数
        res = await getPropertiesList({
          _limit: this.pageSize,
          _start: (this.currentPage - 1) * 2,
          name_contains: this.name_contains
        })
      } else if (this.agent !== '全部经纪人' && !this.name_contains) {
        // 如果有一个经纪人参数 且不能是 ‘全部经纪人’
        res = await getPropertiesList({
          _limit: this.pageSize,
          _start: (this.currentPage - 1) * 2,
          agent: this.agent
        })
      } else {
        // 两个参数都有
        res = await getPropertiesList({
          _limit: this.pageSize,
          _start: (this.currentPage - 1) * 2,
          name_contains: this.name_contains,
          agent: this.agent
        })
      }
      this.PropertiesList = res
      console.log(this.PropertiesList)
      const classification = this.PropertiesList.category
    },
    // 获取列表数量  也要判断参数
    async loadPropertiesCount() {
      console.log(ClientHead)
      let res = {}
      // 如果没有参数
      if (!(this.name_contains || this.agent !== '全部经纪人')) {
        res = await getPropertiesCount()
      } else if (this.name_contains) {
        // 如果有一个搜索参数
        res = await getPropertiesCount({
          name_contains: this.name_contains
        })
      } else if (this.agent !== '全部经纪人') {
        // 如果有一个经纪人参数 且不能是 ‘全部经纪人’
        res = await getPropertiesCount({
          agent: this.agent
        })
      } else {
        // 两个参数都有
        res = await getPropertiesCount({
          name_contains: this.name_contains,
          agent: this.agent
        })
      }
      this.total = res
    },
    // 获取全部客户的经济列表
    async loadAgentList() {
      const res = await getPropertiesList({
        _limit: 99999,
        _start: 0
      })
      this.agentList = getAgentList(res)
      console.log(this.agentList)
    },
    // 删除客户信息
    async deleteProperties(id) {
      await this.$confirm('此操作将永久删除该客户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      // 如果点击确认  调用删除接口
      await deleteProperties(id)
      // 删除成功之后弹出信息
      this.$message.success('删除成功')
      this.total -= 1
      // 重新刷新页面 刷新之前要判断 是否是最后一个数据
      if (this.PropertiesList.length === 1) {
        if (this.currentPage > 1) {
          this.currentPage -= 1
        }
        this.loadPropertiesList()
        this.loadAgentList()
      } else {
        this.loadPropertiesList()
        this.loadAgentList()
      }
    },
    // 通过经纪人获取列表
    async getPropertiesListByAgent() {
      this.currentPage = 1
      this.loadPropertiesList()
      this.loadPropertiesCount()
    },
    async editor(id) {
      this.visible = true
      const res = await getProperties(id)
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
      this.loadPropertiesCount()
      this.loadPropertiesList()
      this.loadAgentList()
    }
  }
}
</script>
<style scoped>
.clearfix {
  display: flex;
}

.search {
  width: 50%;
  display: flex;
  margin-left: auto;
}

.properties-contains {
  padding: 15px 10px 10px;
}

.el-input-group__prepend .el-select {
  width: 130px;
}

.el-pagination {
  text-align: center;
  margin-top: 20px;
}
</style>
