// 提供插件，注册多个全局组件
import UploadImage from './UploadImage'

// 作者提供插件
// 用户Vue.use(插件)
export default {
    install(Vue) {
        // 这里注册的名字
        // 如果团队命名不一致，提出一个建议，有个好的
        // 代码规范
        Vue.component('upload-image', UploadImage)
    }
}
