<template>
  <div>
    <h3> 个人中心 </h3>
    <div class="block">
      <el-avatar :size="50" :src="user.avatar"></el-avatar>
      <br>
      <div>{{ user.nickname }}</div>
    </div>
    <br>

    <br>
    用户名:  {{user.username}}
    <br><br>
    注册时间:  {{ userr.creattime }}
    <br><br>
    总计发表:  {{ userr.blogscounts }}
    <br>
    <br>
    <br>
    <el-button @click="changenickname()">修改昵称</el-button>
    <br><br>
    <el-button @click="changepsd()">修改密码</el-button>

    <br>


    <br>

  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "oneselfmain",
data() {
  return {
    userr:{
      username:'',
      blogscounts:0,
      creattime:'',
      avatar: ''
    },
    user: {
      id:0,
      username: ' 登录 ',
      nickname: ' 登录 ',
      avatar: ' '
    },
    hasLogin: false
  }
},
methods: {
  changenickname() {
    this.$router.push("/changenickname")
  },

  changepsd() {
    this.$router.push("/changepsd")
  },

  logout() {
    const _this = this
    axios.get("/logout", {
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    }).then(res => {
      _this.$store.commit("REMOVE_INFO")
      _this.$router.push("/login")
    })
  },
  initinfo(user) {
      const _this = this
      this.userr.username=this.user.username
      axios.get("/user/maindetail/" + this.user.id).then(res => {
        let str=res.data.data.created
        str= str.substring(0,10)
        _this.userr.blogscounts=res.data.data.blogscounts
        _this.userr.creattime=str
        _this.userr.id=res.data.data.id
      })
  },
},
created() {
//拦截未登录
  if (this.$store.getters.getUser==null)
    this.$router.push('/login')

  if(this.$store.getters.getUser.username) {

    this.user.id = this.$store.getters.getUser.id
    this.user.username = this.$store.getters.getUser.username
    this.user.nickname = this.$store.getters.getUser.nickname
    this.user.avatar = this.$store.getters.getUser.avatar
    this.hasLogin = true
  }
  this.initinfo()
  }
}
</script>

<style scoped>

</style>
