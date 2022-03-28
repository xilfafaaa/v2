<template>
  <div>
    <oneselfHeader></oneselfHeader>

  </div>
</template>

<script>
import axios from "axios";
import oneselfHeader from "./oneselfHeader";
export default {
  name: "oneself",
  components:{
    oneselfHeader,
  },
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
    //拦截未登录
    if (this.$store.getters.getUser.username==null)
      this.$router.push('/login')

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

</style>
