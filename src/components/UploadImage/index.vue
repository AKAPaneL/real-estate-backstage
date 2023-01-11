<template>
  <div>
    <el-upload
      ref="imageUp"
      action="#"
      list-type="picture-card"
      :on-preview="preview"
      :on-remove="remove"
      :limit="1"
      :file-list="imageUrl ? fileList : []"
      :http-request="customUpload"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
  <!--
    <el-upload

  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
   -->
</template>
<script>
var COS = require('cos-js-sdk-v5')
const cos = new COS({
  SecretId: 'AKIDnTwBD0bz82LQJzPbZLwKURB3kETUGqDL',
  SecretKey: 'yvgFcmkZJzYw7C4jCSUHrEMM9i4B4kKg'
})

export default {
  props: {
    imageUrl: String
  },
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      fileList: [{ url: `${this.imageUrl}` }]
    }
  },
  watch: {
    imageUrl(value) {
      if (value) {
        this.fileList[0].url = value
      }
    }
  },
  methods: {
    preview() {
      this.dialogImageUrl = this.fileList[0].url
      console.log(this.dialogImageUrl)
      this.dialogVisible = true
    },
    remove() {
      this.fileList = []
      this.$refs.imageUp.clearFiles()
    },

    // 上传图片至腾讯云
    customUpload({ file }) {
      cos.uploadFile({
        Bucket: 'hm85lct-1316362757', /* 填写自己的 bucket，必须字段 */
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
          console.log('上传成功')
          this.fileList = [{ url: `http://${data.Location}` }]
          this.$emit('image', this.fileList[0].url)
        }
      })
    }
  }

}
</script>
<style scoped>
/* ::v-deep .el-upload--picture-card {
    display: none;
} */
</style>
