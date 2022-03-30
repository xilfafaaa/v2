<template>
  <div class="register">
      <br><br><br>
    <br> <h4>register</h4>  <br>
      <br><br><br>
  <div :model="ruleForm" >
    验证码发送到  {{ ruleForm.email }} 1分钟有效 <br><br>
  </div>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

    <el-form-item label="验证码" prop="yzm">
      <el-input v-model="ruleForm.yzm"></el-input>
    </el-form-item>

    <el-form-item class="register">
      <el-button type="primary"  @click="submitForm('ruleForm')">验证邮箱验证码</el-button>
    </el-form-item>
  </el-form>
  </div>

</template>

<script>
import axios from "axios";

export default {
  name: "registerr",
  data() {
    return {
      ruleForm: {
        nickname: '',
        username: '',
        password: '',
        email: 'ddddd',
        yzm: ''
      },
      rules: {
        yzm: [
          {required: true, message: '验证码', trigger: 'blur'},
          {min: 6, max: 6, message: '6位', trigger: 'blur'}
        ],
      }
    }
  },
created() {
  // console.log(this.$route.query.email)
  // console.log(this.ruleForm.email)
  // this.ruleForm.username=this.$route.query.username
  // this.ruleForm.nickname=this.$route.query.nickname
  // this.ruleForm.password=this.$route.query.password
  // this.ruleForm.email=this.$route.query.email
  // if (this.$route.query.username==null) {
  //   console.log("konggkkkkkkkkk")
  //   this.$router.push('/register')
  // }
  //
  // console.log(this.$route.params)
  this.ruleForm.username=this.$route.params.username
  this.ruleForm.nickname=this.$route.params.nickname
  this.ruleForm.password=this.$route.params.password
  this.ruleForm.email=this.$route.params.email
  // if (this.ruleForm.email=='') {
  //   console.log("konggkkkkkkkkk")
  //   this.$router.push('/register')
  // }


  // this.ruleForm=routerParams
},
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const _this = this
          // console.log(formName)
          axios.post('/register2', this.ruleForm).then(res => {
          // console.log(res.data.data)

          if (res.data.data=='验证码错误'){
            _this.$alert('验证码错误', '提示', {
              confirmButtonText: '确定',
            });
          }

          const jwt = res.headers['authorization']
          const userInfo = res.data.data
            // console.log(userInfo)
          // console.log(userInfo)
          _this.$store.commit("SET_TOKEN", jwt)
          _this.$store.commit("SET_USERINFO", userInfo)
          // console.log(_this.$store.getters.getUser)
          // _this.$router.push('/blogs')
          })
        } else {
        }
      });
    }
  }
}
</script>

<style scoped>
.register{
  align-content: center;
  width: 50%;
}
  h4{
    text-align: center;
  }
</style>
