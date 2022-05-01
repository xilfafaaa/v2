<template>
  <div class="loginn">
    <br>
    <br>
    <br>
    <br>
    <br>
    <div class="loginn_kuang">
      <h4>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        登录
      </h4>
      <el-form  :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>

        <el-form-item label="密码"  prop="password">
          <el-input type="password" v-model="ruleForm.password"></el-input>
        </el-form-item>
        
      <el-button-group style="margin-bottom:20px;margin-left:50px;">
        <el-button   type="primary" round @click="submitForm('ruleForm')">登录</el-button>
        <el-button  round @click="resetForm('ruleForm')">重置</el-button>
      </el-button-group>

        <el-form-item>
          <div id="hhh1">
          </div>
          <div id="hhh2">
          </div>
          <div id="hhh3">
          <el-button style="margin-top:2px;margin-right:40px;" round @click="toregister()">注册</el-button>
          </div>
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
    height: 110%;
    width:110%;
    margin: -11px -7px -7px -10px;
    background-image:url('../assets/img2.jpg');
    /*background-repeat:no-repeat;*/
  }
  .loginn_kuang{
    /*width: 10%;*/
    text-align: center;
    padding-right: 15%;
    padding-top: 2%;
    padding-bottom: 1%;
    padding-left:1%;
    margin-left: 12%;
    margin-top:50px;
    width:65%;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius:25px;
  }
  h4{
    text-align: center;
  }

   .el-form-item label:after {
        content: "";
        display: inline-block;
        width: 100%;
    }

    .el-message-box__btns .el-button:first-child {
  transform: translateX(66px);
}
.el-message-box__btns .el-button:last-child {
  transform: translateX(-66px);
}
   
    

</style>
