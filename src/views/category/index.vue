<template>
  <div>
    <el-card class="box-card">
      <div class="header">
        <span><el-button type="primary" size="small" @click="visible = true">
          添加分类
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
        <el-table-column prop="title" label="标题" />
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
          :current-page="page"
          @current-change="pageChange"
        />
      </div>
      <dialogCate :visible.sync="visible" :rule-form="ruleForm" @closeDia="closeDia" @update="getCategory" />
    </el-card>

  </div>

</template>

<script>
import { getCategory, getCategoryCount, checkCategory, delCategory } from '@/api/category'
import dialogCate from './components/dialog-cate.vue'
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
        title_contains: ''
      },
      // 整体数据form
      form: [],
      Edimg: '',
      // 添加或编辑newForm
      ruleForm: {
        id: '',
        title: '',
        desc: '',
        image: ''
      }
    }
  },
  created() {
    this.getCategory()
  },
  methods: {
    // 获取数据渲染页面
    async getCategory() {
      if (this.parameter.title_contains) {
        console.log(111)
        const res = await getCategory(this.parameter)
        this.form = res
        const categoryCount = await getCategoryCount(this.parameter.title_contains)
        this.total = categoryCount
      } else {
        const { _limit, _start } = this.parameter
        const res = await getCategory({ _limit, _start })
        this.form = res
        const categoryCount = await getCategoryCount('')
        this.total = categoryCount
      }
    },
    pageChange(page) { // 分页跳转
      this.parameter._start = (page - 1) * 2
      this.getCategory()
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
      this.parameter.title_contains = this.contains
      this.parameter._start = 0
      const res = await getCategory(this.parameter)
      this.form = res
      this.getCategory()
    },
    // —————————————————————————————————————————————————————————————————编辑
    async theEditor(id) {
      this.visible = true
      const res = await checkCategory(id)
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
      await delCategory(id)
      // 删除成功后提示用户
      this.$message.success('删除成功')
      this.total -= 1
      // 重新渲染页面,刷新之前要判断是否为最后一个数据
      if (this.form.length === 1) {
        this.pageChange(this.page)
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
}
</style>
