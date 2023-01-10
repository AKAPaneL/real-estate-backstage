<template>
    <el-dialog title="添加分类" :visible="visible" @close="closeFn">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="活动名称" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="活动名称" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="活动名称" prop="name">
                <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card"
                    :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-input v-model="ruleForm.name" placeholder="强制设置图片跳过上传"></el-input>
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
                ],
            }
        }
    },
    methods: {
        closeFn() {
            this.$emit('close')
        }
    }
}
</script>
<style>

</style>