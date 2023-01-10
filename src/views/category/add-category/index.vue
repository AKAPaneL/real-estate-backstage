<template>
    <el-dialog title="添加分类" :visible="visible" @close="closeFn">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
            <el-form-item label="活动名称" prop="name">
                <el-input v-model="ruleForm.name" />
            </el-form-item>
            <el-form-item label="活动名称" prop="name">
                <el-input v-model="ruleForm.name" />
            </el-form-item>
            <el-form-item label="活动名称" prop="name">
                <upload-image /> <!-- 上传图片组件 -->
                <el-input v-model="ruleForm.name" placeholder="强制设置图片跳过上传" />
            </el-form-item>
            <el-form-item class="button-style">
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<script>
export default {
    props: {
        visible: Boolean
    },
    data() {
        return {
            ruleForm: {},
            rules: {
                name: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!')
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },
        resetForm(formName) {
            this.$refs[formName].resetFields()
        },
        closeFn() {
            this.$emit('close')
        }
    }
}
</script>
<style scoped>
.button-style {
    text-align: center;
}
</style>
