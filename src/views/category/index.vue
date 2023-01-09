<template>
    <div>
        <el-card class="box-card">
            <div class="header">
                <span><el-button type="primary">
                        添加分类
                    </el-button></span>
                <span class="search-class"> <el-input placeholder="请输入内容">
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input></span>
            </div>
            <el-table border style="width: 100%">
                <el-table-column prop="picture" label="图片">
                </el-table-column>
                <el-table-column prop="title" label="标题">
                </el-table-column>
                <el-table-column prop="introduce" label="介绍">
                </el-table-column>
                <el-table-column prop="address" label="操作">
                </el-table-column>
            </el-table>

        </el-card>
    </div>


</template>

<script>

export default {
    data() {
        return {
            form: {
                picture: '',
                title: '',
                introduce: '',

            }
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
