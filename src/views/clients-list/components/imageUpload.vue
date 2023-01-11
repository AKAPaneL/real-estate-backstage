<template>
  <div>
    <el-upload
      action="#"
      list-type="picture-card"
      :on-preview="preview"
      :on-remove="remove"
      :limit="1"
      :http-request="customUpload"
      :file-list="flieList"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog :visible.sync="visible" append-to-body>
      <img width="100%" :src="imageUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
import COS from 'cos-js-sdk-v5'
var cos = new COS({
  SecretId: 'AKIDMYYKtELEwPfhV4FLG1c1DD2d0B9vT7ez',
  SecretKey: 'DKEtKXVFm5A2rSvBD2d2DAtOiw1uZKK9'
})

export default {
  data() {
    return {
      visible: false,
      imageUrl: '',
      flieList: []
    }
  },
  methods: {
    preview(file) {
      this.visible = true
      this.imageUrl = file.url
    },
    remove() {

    },
    customUpload({ file }) {
      cos.uploadFile({
        Bucket: 'hr-project-image-1316409369', /* 填写自己的 bucket，必须字段 */
        Region: 'ap-guangzhou', /* 存储桶所在地域，必须字段 */
        Key: file.name, /* 存储在桶里的对象键（例如:1.jpg，a/b/test.txt，图片.jpg）支持中文，必须字段 */
        Body: file, // 上传文件对象
        SliceSize: 1024 * 1024 * 5, /* 触发分块上传的阈值，超过5MB使用分块上传，小于5MB使用简单上传。可自行设置，非必须 */
        onProgress: function(progressData) {
          console.log(JSON.stringify(progressData))
        }
      }, (err, data) => {
        if (err) {
          console.log('上传失败', err)
        } else {
          console.log('上传成功', this.flieList, data)
          this.$message.success('上传成功')
          this.flieList.push({ url: `http://${data.Location}` })
        }
      })
    }
  }
}
</script>
<style>

</style>
