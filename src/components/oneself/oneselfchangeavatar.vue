<template>
  <div>
    <h4>更改头像</h4>
    <br>
    <input type="file" @change="onchangemd">
    <div>

<!--   另外一种格式的头像-->
      <span class="demonstration">avatar</span>
      <el-image
        style="width: 100px; height: 100px"
        :src="user.avatar"
        ></el-image>
    </div>



  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import axios from "axios";
export default {
  name: "oneselfchangeavatar",
  data() {
    return {
      user: {
        id: 0,
        username: ' ',
        nickname: ' ',
        avatar: ' ',
        password: '',
      },
      imgUrl: '',

    };
  },

  methods: {
    onchangemd(e) {
      /* 限制文件上传类型 */
      let e1 = e.target.files[0];
      // console.log("11111",e1.size)
      let suffixName = e1.name.substring(e1.name.lastIndexOf('.') + 1);   /* 得到文件后缀名 */
      if (suffixName !== 'jpg' && suffixName !== 'png'
        && suffixName !== 'gif' && suffixName !== 'jpeg'
        && suffixName !== 'jfif') {
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
      axios.post("/img/t2", formdata).then(res => {
        console.log(res)
        this.imgUrl = res.data.data;
        this.user.avatar = res.data.data;
      })
      axios.post("/user/changeavatar",user).then(res => {
        console.log(res)
      })
    },






},
  created() {
    //拦截未登录
    if (this.$store.getters.getUser.username==null)
      this.$router.push('/login')
    if(this.$store.getters.getUser.username) {
      this.user.id = this.$store.getters.getUser.id
      this.user.nickname = this.$store.getters.getUser.nickname
      this.user.avatar = this.$store.getters.getUser.avatar
    }
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
  border-color: #ffeb60;
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


.update-avatar {
  background: #000;
  width: 100%;
  height: 100%;
}
.toolbar {
  position: fixed;
  bottom: 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 28px;
  color: #fff;
  padding: 0 15px;
  box-sizing: border-box;
}
img {
  max-width: 100%;
}
</style>
