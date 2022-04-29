<template>
  <div class="bg">
    <br><br><br>
    <br><br><br>
    <div class="loginn_kuang">

        <br> <h4>&nbsp;&nbsp;
        验证码</h4>  <br>
      <div :model="ruleForm" >
        验证码发送到  {{ ruleForm.email }} 1分钟有效 <br><br>
      </div>

      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

        <el-form-item style="margin-left:-5px;" label="输入验证码" prop="yzm">
          <el-input v-model="ruleForm.yzm"></el-input>
        </el-form-item>

        <el-form-item class="register">
          <el-button type="primary" style="margin-left:-75px;" round @click="submitForm('ruleForm')">验证邮箱验证码</el-button>
        </el-form-item>
      </el-form>
    </div>
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
  this.ruleForm.username=this.$route.params.username
  this.ruleForm.nickname=this.$route.params.nickname
  this.ruleForm.password=this.$route.params.password
  this.ruleForm.email=this.$route.params.email
  // if (this.ruleForm.email=='') {
  //   console.log("konggkkkkkkkkk")
  //   this.$router.push('/register')
  // }
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
            return;
          }

          const jwt = res.headers['authorization']
          const userInfo = res.data.data
            // console.log(userInfo)
          // console.log(userInfo)
          _this.$store.commit("SET_TOKEN", jwt)
          _this.$store.commit("SET_USERINFO", userInfo)
          // console.log(_this.$store.getters.getUser)
          _this.$router.push('/blogs')
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
    /*width: 50%;*/
    /*padding-left: 24%;*/
  }
  .loginn_kuang{
    /*width: 10%;*/
    text-align: center;
    margin-top:10%;
    padding-right: 15%;
    padding-left: 10%;
    padding-top: 5%;
    padding-bottom: 1%;
    margin-left: 15%;
    width:50%;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius:30px;
  }
  .bg{
    text-align: center;
    height: 100vh;
    margin: -11px -7px -7px -10px;
    background-image:url('../assets/img3.jpg');
  }
  h4{
    text-align: center;
  }
</style>
