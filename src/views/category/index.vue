<template>
    <div>
        <el-card class="box-card">
            <div class="header">
                <span><el-button type="primary" @click="visible = true">
                        添加分类
                    </el-button></span>
                <span class="search-class"> <el-input placeholder="请输入内容">
                        <el-button slot="append" icon="el-icon-search" />
                    </el-input></span>
            </div>
            <el-table #default="{ row }" :data="from" border style="width: 100%">
                <el-table-column prop="row" label="图片">
                    <template #default="{ row }">
                        <img :src="row.image" alt="" class="avatar">
                    </template>
                </el-table-column>
                <el-table-column prop="title" label="标题" />
                <el-table-column prop="desc" label="介绍" />
                <el-table-column label="操作">
                    <template #default="{ row }">
                        <el-button type="primary" size="small">编辑</el-button>
                        <el-button type="danger" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="block">
                <el-pagination layout="prev, pager, next" :total="total" :page-size="size" :current-page.sync="page" />
            </div>
        </el-card>
        <addCategory :visible.sync="visible" @close="visible = false" />
    </div>

</template>

<script>
import { getCategory } from '@/api/category'
import addCategory from './add-category/index'
export default {
    components: {
        addCategory
    },
    data() {
        return {
            visible: false,
            page: 1,
            size: 10,
            total: 0,
            parameter: {
                // limit: 1,
                // start: 0,
                // title_contains: '公寓'
            },
            from: []
        }
    },
    created() {
        this.getCategory()
    },
    methods: {
        async getCategory() {
            const res = await getCategory(this.parameter)
            // console.log(res)
            this.from = res
            console.log(this.from)
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

.avatar {
    width: 100%;
}

.block {
    text-align: center;
}
</style>
