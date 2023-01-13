<template>
  <div>
    <el-dialog :title="form.id?'编辑房产':'添加房产'" :visible="visible" @close="$emit('close')">
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item label="姓名" label-width="50px" prop="name">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="经济" label-width="50px" prop="agent">
          <el-select v-model="form.agent" placeholder="请选择经济" @focus="getAgentsList">
            <el-option v-for="item in agentsList" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="邮箱" label-width="50px" prop="email">
          <el-input v-model="form.email" autocomplete="off" />
        </el-form-item>
        <el-form-item label="电话" label-width="50px" prop="phone">
          <el-input v-model="form.phone" autocomplete="off" />
        </el-form-item>
        <el-form-item label="微信" label-width="50px" prop="wechat">
          <el-input v-model="form.wechat" autocomplete="off" />
        </el-form-item>
        <el-form-item label="描述" label-width="50px" prop="desc">
          <el-input v-model="form.desc" autocomplete="off" type="textarea" />
        </el-form-item>
        <el-form-item label="描述" label-width="50px">
          <image-upload ref="upload" @upImageSuccess="updataImage" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="$emit('close')">取 消</el-button>
        <el-button type="primary" @click="subForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import ImageUpload from './imageUpload.vue'
import { getAllAgentsList } from '@/api/agents'
import { addClient, editorClient } from '@/api/clients'
import ClientHead from '@/assets/common/client-head.jpeg'
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
      imageUrl: '',
      form: {
        name: '',
        agent: '',
        email: '',
        phone: '',
        wechat: '',
        desc: '',
        image: ClientHead
      },

      agentsList: [],
      rules: {
        name: [
          { required: true, message: '请输入昵称', trigger: 'blur' }
        ],
        agent: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        phone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' }
        ],
        wechat: [
          { required: true, message: '请输入微信号', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '请填写描述', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getAgentsList()
  },
  methods: {
    // 获取所有经济列表
    async getAgentsList() {
      const res = await getAllAgentsList()
      this.agentsList = res
    },
    updataImage(url) {
      this.form.image = url
    },
    // 提交表单
    async subForm() {
      // 表单验证
      await this.$refs.form.validate()

      // 判断是否有id
      if (this.form.id) {
        // 这里面调用编辑接口
        await editorClient(this.form)
        this.$message.success('修改成功')
      } else {
        // 验证成功  调用新增接口
        await addClient(this.form)
        this.$message.success('添加成功')
      }
      // 告诉父组件  刷新页面
      this.$emit('refresh')
      // 关闭窗口
      this.$emit('close')
    },
    // 清空表单的方法
    resetForm() {
      this.$refs.form.resetFields()
      this.form = {
        name: '',
        agent: '',
        email: '',
        phone: '',
        wechat: '',
        desc: '',
        image: ClientHead
      }
      this.$refs.upload.remove()
    },
    // 数据回填的方法
    editor(res) {
      if (res.agent) {
        this.form = res
      } else {
        this.form = res
        this.form.agent = undefined
      }
      this.$refs.upload.backImage(res.image)
    }
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
