<template>
  <div class="m-content">
    <h3> 个人记录 </h3>
    <div class="block">
      <el-avatar :size="50" :src="user.avatar"></el-avatar>
      <br>
      <div>{{ user.nickname }}</div>
    </div>
    <span v-show="hasLogin"><el-link class="headtext" type="primary" href="/selff">个人中心</el-link></span>
    <div class="maction">
      <span><el-link class="headtext" href="/blogs">主页</el-link></span>
      <el-divider direction="vertical"></el-divider>
      <span><el-link class="headtext" type="success" href="/blogs/add">发表博客</el-link></span>
      <el-divider direction="vertical"></el-divider>

      <span v-show="!hasLogin"><el-link class="headtext" type="primary" href="/login">登录</el-link></span>

<!--      <el-divider   direction="vertical"></el-divider>-->
      <span v-show="!hasLogin"><el-link class="headtext" type="primary" href="/register">注册</el-link></span>
      <span v-show="hasLogin"><el-link class="headtext" type="danger" @click="logout">退出</el-link></span>
    </div>

  </div>
</template>

<script>
import axios from "axios";

  export default {
    name: "Header",
    data() {
      return {
        user: {
          username: ' 登录 ',
          nickname: ' 登录 ',
          avatar: 'http://wx3.sinaimg.cn/mw690/dfcdfe8cly1h009af2ardj20bh0b4t9c.jpg'
        },
        hasLogin: false
      }
    },
    methods: {
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
      }
    },
    created() {
      if(this.$store.getters.getUser.username) {
        // console.log(this.$store.getters.getUser)
        // console.log("L:::::::::::::::::::::")
        this.user.username = this.$store.getters.getUser.username
        this.user.nickname = this.$store.getters.getUser.nickname
        this.user.avatar = this.$store.getters.getUser.avatar
        this.hasLogin = true
      }

    }
  }
</script>

<style scoped>

  .m-content {
    max-width: 960px;
    margin: 0 auto;
    text-align: center;
  }
  .maction {
    margin: 10px 0;
  }
  .headtext{
    color: #7b00ff;
  }

</style>
