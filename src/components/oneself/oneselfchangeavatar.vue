<template>
  <div>
    <h4>更改头像</h4>
    <br>
    <input type="file" @change="onchangemd">

  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "oneselfchangeavatar",
  data() {
    return {

    };
  },

    methods: {
      onchangemd(e){
        /* 限制文件上传类型 */
        let e1 = e.target.files[0];
        // console.log("11111",e1.size)
        let suffixName = e1.name.substring(e1.name.lastIndexOf('.') + 1);   /* 得到文件后缀名 */
        if (suffixName !== 'jpg' && suffixName !== 'png'
          && suffixName !=='gif'  && suffixName !== 'jpeg'
          && suffixName !=='jfif') {
          this.$message.warning("图片只能是图片");
          return;
        }

        /* 限制文件上传大小 */
        let isLtSize = e1.size / 1024 / 1024 < 2;
        if (!isLtSize) {
          this.$message.warning("上传文件不能超过 2 MB ");
          return;
        }
        console.log(e.target.files)//这个就是选中文件信息
        let formdata = new FormData()
        Array.from(e.target.files).map(item => {
          console.log(item)
          formdata.append("file", item)  //将每一个文件图片都加进formdata
        })
        axios.post("/img/t1", formdata).then(res => { console.log(res) })
      },






    }

}
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
