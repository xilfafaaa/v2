<template>
  <div>
    <h4>更改昵称</h4>
    <br>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="ruleForm.nickname"></el-input>
      </el-form-item>
      <br>
      <el-form-item class="c">
        <el-button @click="submitForm('ruleForm')">更改昵称</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "oneselfchangenickname",
  data() {
    return {
      ruleForm: {
        id:0,
        username: ' ',
        nickname: '',
      },
      user: {
        id:0,
        username: ' ',
        nickname: ' ',
        avatar: ' ',
        password:'',
      },
      hasLogin: false,
      rules: {
        nickname: [
          { required: true, message: '5-15个字符', trigger: 'blur' },
          { min: 5, max: 15, message: '昵称', trigger: 'blur' }
        ],
      }
    }
  },
  methods:{
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const _this = this
          axios.post('/user/changenickname', this.ruleForm, {
            headers: {
              "Authorization": localStorage.getItem("token")
            }
          }).then(res => {
            var userInfo=this.$store.getters.getUser
            userInfo.nickname=this.ruleForm.nickname
            _this.$store.commit("SET_USERINFO", userInfo)
            _this.$alert('操作成功', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                _this.$router.push("/selff")
              }
            });
          })
        } else {
          return false;
        }
      });
    },
  },
  created() {
    //拦截未登录
    if (this.$store.getters.getUser.username==null)
      this.$router.push('/login')


    if(this.$store.getters.getUser.username) {

      this.user.id = this.$store.getters.getUser.id
      this.ruleForm.id = this.$store.getters.getUser.id
      this.user.nickname = this.$store.getters.getUser.nickname
      this.hasLogin = true
      // console.log(this.user.id)
      // console.log(this.ruleForm.id)
      // console.log(this.user.nickname)
    }
  }
}
</script>

<style scoped>

</style>
