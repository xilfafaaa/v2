<template>
  <div class="bg">
<!--    <skin></skin>--><br><br><br><br>
    <div class="loginn_kuang">

    <br>  
    <h4>  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注册</h4>
       <br>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="ruleForm.nickname"></el-input>
      </el-form-item>

      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码"  prop="password">
        <el-input type="password" v-model="ruleForm.password"></el-input>
      </el-form-item>
      <el-form-item label="email" prop="email">
        <el-input v-model="ruleForm.email"></el-input>
      </el-form-item>
      <el-form-item class="register">
        <el-button type="info" style="margin-left:50px;" round @click="submitForm('ruleForm')">获得验证码</el-button>
        <br>
        <el-button type="primary" style="margin-left:-20px;margin-top:10px;" round @click="tologin()">直接去登录</el-button>
      </el-form-item>
    </el-form>
  </div>
  </div>
</template>

<script>
import axios from "axios";
import skin from "./skin";
export default {
  name: "register",
  components: {skin},
data() {
  return {
    fullscreenLoading: false,
    ruleForm: {
      nickname:'',
      username: '',
      password: '',
      email: '',
    },

    rules: {
      nickname: [
        { required: true, message: '5-15个字符', trigger: 'blur' },
        { min: 5, max: 15, message: '5-15个字符', trigger: 'blur' }
      ],
      username: [
        { required: true, message: '5-15个字符', trigger: 'blur' },
        { min: 5, max:15, message: '5-15个字符', trigger: 'blur' }
      ],
      password: [
        { required: true, message: '6-15个字符', trigger: 'blur' },
        { min: 6, max: 15, message: '6-15个字符', trigger: 'blur' }
      ],
      email: [
        { required: true, message: 'email', trigger: 'blur' },
        { min: 5, max: 20, message: 'email', trigger: 'blur' }
      ],
    }

  };
},

methods: {
  tologin(){
    this.$router.push('/login')
  },
  openFullScreen2() {
    const loading = this.$loading({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0,0,0,0.7)'
    });
    setTimeout(() => {
      loading.close();
    }, 2222);
  },
  submitForm(ruleForm) {
    this.$refs[ruleForm].validate((valid) => {
      // console.log("dsssss")
      if (valid) {
        const _this = this
        // console.log(this.ruleForm)
        // this.openFullScreen2()
        const loading = this.$loading({
          lock: true,
          // 代码和人有一个能跑很显然我挺能跑的
          text: 'Loadingg ',
          spinner: 'el-icon-loading',
          background: 'rgba(0,0,0,0.7)'
        });

        axios.post('/register1', this.ruleForm).then(res => {
          loading.close();
          if (res.data.data!=null){
            // console.log(res.data.data )
            _this.$message(res.data.data);
            return ;
          }
        // console.log(this.ruleForm.email)

          _this.$router.push({
            name:'registerr',
            params: {
              nickname:this.ruleForm.nickname,
              username:this.ruleForm.username,
              password:this.ruleForm.password,
              email:this.ruleForm.email
            }
          })

        })

      } else {
        // console.log('error submit!!');
        // return false;
      }
    });
  },
}
}
</script>

<style scoped>
  .register{
    align-content: center;
    /*padding-left: -5%;*/
    /*padding-right: 10%;*/
  }
  .loginn_kuang{
    /*width: 10%;*/
    text-align: center;
    padding-right: 16%;
    padding-left: 1%;
    padding-top: 0%;
    padding-bottom: 1%;
    margin-left: 19%;
    margin-top:50px;
    width:50%;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius:40px;
  }
  .bg{
    text-align: center;
    height: 100vh;
    margin: -11px -7px -7px -10px;
    height: 110%;
    width:110%;
    background-image:url('../assets/img3.jpg');
  }
  h4{
    text-align: center;
    padding-left: 12%;
  }
</style>
