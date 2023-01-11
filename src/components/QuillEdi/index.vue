<template>
    <div class="local-quill-editor">
        <quill-editor ref="myLQuillEditor" v-model="content" :options="editorOption" class="editor" @blur="onEditorBlur"
            @focus="onEditorFocus" @change="onEditorChange">
            >
        </quill-editor>
    </div>
</template>

<script>
// 引入样式和quillEditor
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'

// 工具栏配置项
const toolbarOptions = [
    // 字体大小-----[{ size: ['small', false, 'large', 'huge'] }]
    [{ size: ['small', false, 'large', 'huge'] }],
    // 加粗 斜体 下划线 删除线 -----['bold', 'italic', 'underline', 'strike']
    ['bold', 'italic', 'underline', 'strike'],
    // 对齐方式-----[{ align: [] }]
    [{ align: [] }],
    // 引用  代码块-----['blockquote', 'code-block']
    ['blockquote', 'code-block'],
    // 有序、无序列表-----[{ list: 'ordered' }, { list: 'bullet' }]
    [{ list: 'ordered' }, { list: 'bullet' }],
    // 缩进-----[{ indent: '-1' }, { indent: '+1' }]
    [{ indent: '-1' }, { indent: '+1' }],
    // 字体颜色、字体背景颜色-----[{ color: [] }, { background: [] }]
    [{ color: [] }, { background: [] }],

    // 链接、图片、视频-----['link', 'image', 'video']
    ['image', 'video'],
    // 清除文本格式-----['clean']
    ['clean']
]

export default {
    name: 'LocalQuillEditor',
    // 注册 quillEditor
    components: {
        quillEditor
    },
    data() {
        return {
            content: '',
            editorOption: {
                modules: {
                    toolbar: toolbarOptions
                },
                theme: 'snow',
                placeholder: ''
                // Some Quill optiosn...
            }
        }
    },
    methods: {
        // 失去焦点事件
        onEditorBlur(e) {
            console.log('onEditorBlur: ', e)
        },
        // 获得焦点事件
        onEditorFocus(e) {
            console.log('onEditorFocus: ', e)
        },
        // 内容改变事件
        onEditorChange(e) {
            console.log('onEditorChange: ', e)
        }
    }
}
</script>

<style scoped>
.local-quill-editor {
    height: 283px;
}

.editor {
    height: 200px;
}
</style>
