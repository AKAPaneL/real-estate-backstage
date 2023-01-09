<template>
  <div>
    <el-card class="box-card">
      <div class="header">
        <span><el-button type="primary">
            <slot name="before" />
            <!-- 定义前面得插槽 -->
          </el-button></span>
        <span class="search-class"> <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input></span>
      </div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="picture" label="图片" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="address" label="地址">
        </el-table-column>
      </el-table>

    </el-card>
  </div>


</template>

<script>
export default {
  props: {
    showBefore: {
      type: Boolean,
      default: false
    }

  }
}
</script>

<style scoped>
.header {
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #DCDCDC;
}

.search-class {
  float: right;
  width: 500px;
}
</style>
