<template>
  <div>
    <h4>更改密码</h4>
    <br>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="密码"  prop="password">
        <el-input type="password" v-model="ruleForm.password"></el-input>
      </el-form-item>
      <br>
      <el-form-item class="c">
        <el-button @click="submitForm('ruleForm')">更改密码</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "oneselfchangepsd",
  data() {
    return {
      ruleForm: {
        id:0,
        password: '',
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
        password: [
          { required: true, message: '6-15个字符', trigger: 'blur' },
          { min: 6, max: 15, message: 'pwddddd', trigger: 'blur' }
        ],
      }
    }
  },
  methods:{
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const _this = this
          axios.post('/user/changepsd', this.ruleForm, {
            headers: {
              "Authorization": localStorage.getItem("token")
            }
          }).then(res => {
            // console.log(res)
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
    if (this.$store.getters.getUser==null)
      this.$router.push('/login')


    if(this.$store.getters.getUser.username) {
      this.user.id = this.$store.getters.getUser.id
      this.ruleForm.id = this.$store.getters.getUser.id
      this.user.nickname = this.$store.getters.getUser.nickname
      this.hasLogin = true
    }
  }
}
</script>

<style scoped>

</style>
