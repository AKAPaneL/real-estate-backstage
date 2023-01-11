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
      <el-table :data="from" border style="width: 100%">
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
      <el-dialog :title="ruleForm.id ? '编辑分类' : '添加分类'" :visible="visible" @close="closeFn">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules">
          <el-form-item label="标题" prop="title">
            <el-input v-model="ruleForm.title" />
          </el-form-item>
          <el-form-item label="描述" prop="desc">
            <el-input v-model="ruleForm.desc" type="textarea" :rows="4" resize="none" />
          </el-form-item>
          <el-form-item label="封面">
            <upload-image :image-url="Edimg" @image="UploadImage" /> <!-- 上传图片组件 -->
            <el-input placeholder="强制设置图片跳过上传" />
          </el-form-item>
          <el-form-item class="button-style">
            <el-button type="primary" @click="submitForm(ruleForm)">确认</el-button>
            <el-button @click="closeFn">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-card>

  </div>

</template>

<script>
import { getCategory, getCategoryCount, addCategory, checkCategory, changeCategory, delCategory } from '@/api/category'
export default {
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
      ruleForm: {
        image: 'https://fd.co188.com/group1/M04/5D/96/rBBhH11H-H6AMoWYAB5mkmBK0Fc405.jpg'
      },
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '请输入描述', trigger: 'blur' }
        ]
      },
      from: [],
      Edimg: '',
      newFrom: []
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
        this.from = res
        const categoryCount = await getCategoryCount(this.parameter.title_contains)
        this.total = categoryCount
      } else {
        const { _limit, _start } = this.parameter
        const res = await getCategory({ _limit, _start })
        this.from = res
        const categoryCount = await getCategoryCount('')
        this.total = categoryCount
      }
    },
    pageChange(page) { // 分页跳转
      this.parameter._start = (page - 1) * 2
      this.getCategory()
    },

    // ———————————————————————————————————————————————————————————————— 弹窗类方法
    async submitForm(form) { // 提交添加分类
      if (form.id) {
        // 编辑
        this.newFrom = {
          id: form.id,
          title: form.title,
          desc: form.desc,
          image: form.image
        }
        const res = await changeCategory(this.newFrom)
        console.log(res)
        this.getCategory()
      } else {
        // 添加
        await addCategory(form)
        this.getCategory()
      }
      // 提手用户添加完成
      this.$message.success('添加成功')
      // 关闭弹窗
      this.visible = false
    },
    closeFn() { // 关闭弹窗
      this.ruleForm = {}
      this.Edimg = ''
      this.visible = false
      this.$refs.ruleForm.resetFields()
    },
    UploadImage(url) { // 接收腾讯云链接
      this.ruleForm.image = url
    },
    // —————————————————————————————————————————————————————————————————搜索
    async searchBtn() {
      this.parameter.title_contains = this.contains
      this.parameter._start = 0
      console.log(this.parameter)
      const res = await getCategory(this.parameter)
      this.from = res
      this.getCategory()
    },
    // —————————————————————————————————————————————————————————————————编辑
    async theEditor(id) {
      this.visible = true
      const res = await checkCategory(id)
      this.Edimg = res.image
      this.ruleForm = res
      console.log(this.ruleForm)
    },
    // —————————————————————————————————————————————————————————————————删除
    async deleteCategory(id) {
      await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      const res = await delCategory(id)
      console.log(res)
      this.getCategory()
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

.button-style {
    text-align: right;
}
</style>
