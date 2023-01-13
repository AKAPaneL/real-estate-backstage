<template>
  <el-dialog :visible.sync="visible" title="分配权限">
    <div>
      分配权限
    </div>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      visible: false
    }
  },
  methods: {
    show() {
      this.visible = true
    }
  }
}
</script>
<style>

</style>
