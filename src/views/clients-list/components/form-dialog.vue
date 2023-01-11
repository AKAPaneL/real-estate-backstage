<template>
  <div>
    <el-dialog title="添加客户" :visible="visible" @close="$emit('close')">
      <el-form :model="form">
        <el-form-item label="姓名" label-width="50px">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="经济" label-width="50px">
          <el-select v-model="form.agent" placeholder="请选择经济">
            <el-option label="张某" value="1" />
            <el-option label="关某" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="邮箱" label-width="50px">
          <el-input v-model="form.email" autocomplete="off" />
        </el-form-item>
        <el-form-item label="电话" label-width="50px">
          <el-input v-model="form.phone" autocomplete="off" />
        </el-form-item>
        <el-form-item label="微信" label-width="50px">
          <el-input v-model="form.wechat" autocomplete="off" />
        </el-form-item>
        <el-form-item label="描述" label-width="50px">
          <el-input v-model="form.desc" autocomplete="off" type="textarea" />
        </el-form-item>
        <el-form-item label="描述" label-width="50px">
          <image-upload />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="$emit('close')">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import ImageUpload from './imageUpload.vue'
export default {
  components: {
    ImageUpload
  },
  props: {
    visible: {
      type: Boolean
    }
  },
  data() {
    return {
      form: {
        name: '',
        agent: '',
        email: '',
        phone: '',
        wechat: '',
        desc: '',
        image: ''
      }
    }
  },
  methods: {

  }
}
</script>
<style scoped>
  ::v-deep.el-dialog__wrapper>.el-dialog{
    transform: translateY(-5vh);
    width: 600px;
  }
  ::v-deep .el-dialog__wrapper>.el-dialog>.el-dialog__body{
    padding: 30px 40px;
  }
</style>
