<template>
  <div class="oneselfhead">
    <div >
      <el-container style="height:100vh ; border: 1px solid #eee ">
        <el-aside width="200px" style="background-color: rgb(238, 241, 246) ">

          <el-menu >
            <el-menu-item v-show="hasLogin" @click="toindex()">去首页</el-menu-item>
            <el-menu-item v-show="hasLogin" @click="tofabiao()">去发表</el-menu-item>
          </el-menu>

          <!--          <el-menu  router :default-openeds="['0', '1']">-->
          <el-menu  router  >
            <el-submenu v-for="(item,index) in $router.options.routes" :index="index+''" v-if="item.show">

              <template slot="title">{{item.name}}</template>

              <el-menu-item v-for="(item2,index2) in item.children" :index="item2.path"
                            :class="$route.path==item2.path?'is-active':''" v-if="item2.show">{{item2.name}}
              </el-menu-item>

            </el-submenu>
          </el-menu>

        </el-aside>

        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </div>


  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "oneselfHeader",

data() {
  return {
    user: {
      username: ' 登录 ',
      nickname: ' 登录 ',
      avatar: 'https://tiebapic.baidu.com/forum/w%3D580%3B/sign=cbc595fbfb096b6381195e583c088544/902397dda144ad349801d55395a20cf430ad85ac.jpg?tbpicau=2022-04-01-05_da2a527a64825fde143402df38957325'
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
  },

  toindex(){
    this.$router.push('/blogs')
  },

  tofabiao(){
    this.$router.push('/blogs/add')
  },
},
created() {
  if(this.$store.getters.getUser.username) {
    this.user.username = this.$store.getters.getUser.username
    this.user.nickname = this.$store.getters.getUser.nickname
    this.user.avatar = this.$store.getters.getUser.avatar
    this.hasLogin = true
  }

}
}
</script>

<style scoped>
  /*.oneselfhead{*/
  /*  width: 15%;*/
  /*  border:1px;*/
  /*  border-left-color: #ff00e7;*/
  /*}*/
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }
  .oneselfhead{
    height: 100vh;
    padding:-5px;
    margin: -10px -7px -8px -10px;
    background-color: #ffffff;
  }
</style>
