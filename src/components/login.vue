<template>
  <div class="loginn">
    <br>
    <br>
    <br>
    <br>
    <br>
    <div class="loginn_kuang">
      <h4>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        登录
      </h4>
      <el-form  :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>

        <el-form-item label="密码"  prop="password">
          <el-input type="password" v-model="ruleForm.password"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
          <br>
          <br>
          <el-button @click="toregister()">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "login",
  data() {
    return {
      ruleForm: {
        username: '',
        password: '',
      },
      rules: {
        username: [
          { required: true, message: '用户名', trigger: 'blur' },
          { min: 5, max: 15, message: '用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码', trigger: 'blur' },
          { min: 6, max:15, message: '密码', trigger: 'blur' }
        ],
      }
    };
  },
  methods: {
    toregister(){
      this.$router.push('/register')
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const _this = this
          // console.log(formName)
          // axios.post('http://localhost:8080/login', this.ruleForm).then(res => {
          axios.post('/login', this.ruleForm).then(res => {

            const jwt = res.headers['authorization']
            const userInfo = res.data.data
            // console.log(userInfo)
            // console.log("userInfo")
            _this.$store.commit("SET_TOKEN", jwt)
            _this.$store.commit("SET_USERINFO", userInfo)
            // console.log(_this.$store.getters.getUser)
            _this.$router.push('/blogs')
          })

        } else {
          // console.log('vvvvv');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style scoped>
  .loginn {
    text-align: center;
    height: 100vh;
    margin: -11px -7px -7px -10px;
    background-image:url('../assets/img2.jpg');
    /*background-repeat:no-repeat;*/
  }
  .loginn_kuang{
    /*width: 10%;*/
    text-align: center;
    padding-right: 8%;
    padding-top: 2%;
    padding-bottom: 1%;
    margin-left: 24%;
    width:50%;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius:30px;
  }
  h4{
    text-align: center;
  }
</style>
