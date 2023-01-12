<template>
  <div>
    <el-card class="box-card">
      <div class="header">
        <span><el-button type="primary" size="small" @click="visible = true">
          添加经纪
        </el-button></span>
        <span class="search-class">
          <el-input v-model="contains" placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search" @click="searchBtn" />
          </el-input></span>
      </div>
      <el-table :data="form" border style="width: 100%">
        <el-table-column prop="row" label="图片">
          <template #default="{ row }">
            <img :src="row.image" alt="" class="avatar">
          </template>
        </el-table-column>
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="email" label="邮箱" />
        <el-table-column prop="phone" label="电话" />
        <el-table-column prop="address" label="地址" />
        <el-table-column prop="desc" label="介绍" />
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="theEditor(row.id)">编辑</el-button>
            <el-button type="danger" size="small" @click="deleteCategory(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          :page-size="2"
          :current-page.sync="page"
          @current-change="pageChange"
        />
      </div>
      <dialogCate :visible.sync="visible" :rule-form="ruleForm" @closeDia="closeDia" @update="getAgents" />
    </el-card>

  </div>

</template>

<script>
import { getAgents, getAgentsCount, checkAgents, deleteAgents } from '@/api/agents'
import dialogCate from './components/dialog-agents.vue'
export default {
  components: {
    dialogCate
  },
  data() {
    return {
      visible: false,
      page: 1,
      total: 10,
      contains: '',
      parameter: {
        _limit: 2,
        _start: 0,
        name_contains: ''
      },
      // 整体数据form
      form: [],
      Edimg: '',
      // 添加或编辑newForm
      ruleForm: {
        name: '',
        email: '',
        phone: '',
        address: '',
        desc: '',
        image: ''
      }
    }
  },
  created() {
    this.getAgents()
  },
  methods: {
    // 获取数据渲染页面
    async getAgents() {
      if (this.parameter.name_contains) {
        const res = await getAgents(this.parameter)
        this.form = res
        const categoryCount = await getAgentsCount(this.parameter.name_contains)
        this.total = categoryCount
      } else {
        const { _limit, _start } = this.parameter
        this._start = (this.page - 1) * 2
        const res = await getAgents({ _limit, _start })
        this.form = res
        const categoryCount = await getAgentsCount('')
        this.total = categoryCount
      }
    },
    pageChange(page) { // 分页跳转
      this.parameter._start = (page - 1) * 2
      this.getAgents()
    },
    // 关闭弹窗，清空表单
    closeDia() {
      this.visible = false
      this.ruleForm = {
        id: '',
        title: '',
        desc: '',
        image: ''
      }
    },
    // —————————————————————————————————————————————————————————————————搜索
    async searchBtn() {
      this.parameter.name_contains = this.contains
      this.parameter._start = 0
      const res = await getAgents(this.parameter)
      this.form = res
      this.getAgents()
    },
    // —————————————————————————————————————————————————————————————————编辑
    async theEditor(id) {
      this.visible = true
      const res = await checkAgents(id)
      this.ruleForm = res
    },
    // —————————————————————————————————————————————————————————————————删除
    async deleteCategory(id) {
      await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      // 如果点击确认,调用删除接口
      await deleteAgents(id)
      // 删除成功后提示用户
      this.$message.success('删除成功')
      this.total -= 1
      // 重新渲染页面,刷新之前要判断是否为最后一个数据
      if (this.form.length === 1) {
        this.page -= 1
        this.pageChange(this.page)
      } else {
        this.getAgents()
      }
    }
  }
}
</script>

<style scoped>
.box-card {
  margin: 10px;
}

.header {
  margin-bottom: 15px;
  padding-bottom: 30px;
  border-bottom: 1px solid #DCDCDC;
}

.search-class {
  float: right;
  width: 700px;
}

.avatar {
  width: 200px;
  height: 200px;
}

.block {
  text-align: center;
  margin-top: 30px;
  padding-top: 10px;
  border-top: 1px solid #DCDCDC;
}
</style>
