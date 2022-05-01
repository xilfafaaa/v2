<template>
  <div>
<!--    <oneselfHeader></oneselfHeader>-->
    <h1>抽奖</h1>
    已经抽取的次数:  {{userc.allcount }}<br>
    现在有的次数:  {{userc.drawcount }}<br>
    sss:  {{userc.sss }}<br>
    ss:  {{userc.ss }}<br>
    s:  {{userc.s}}<br>
    a:  {{userc.a}}<br>
    b:  {{userc.b}}<br>
    c:  {{userc.c}}<br>
    d:  {{userc.d}}<br>
<!--    {{user.id}}-->
    <br><br>
    <el-button @click="drawn(user,1)">抽取1</el-button>
    &nbsp;
    &nbsp;
    &nbsp;
    <el-button @click="drawn(user,10)">抽取10</el-button>
    &nbsp;
    &nbsp;
    &nbsp;
    <el-button @click="drawn(user,30)">抽取30</el-button>
  </div>
</template>

<script>
import oneselfHeader from "./oneselfHeader";
import axios from "axios";
export default {
  name: "card",
  components:{
    oneselfHeader,
  },
  data() {
    return {
      user:{
        id:0,
      },
      userc: {
        allcount:0,
        drawcount:0,
        sss:0,
        ss:0,
        s:0,
        a:0,
        b:0,
        c:0,
        d:0
      },
      hasLogin: false
    }
  },
  methods: {
    drawn(user,n){
      const _this = this
      axios.get('/card/drawcard'+n+'/' + user.id ).then(res => {
        if (res.data.data=='次数不够'){
          _this.$alert('<h3 style="text-align: center; margin: 0">次数不够</h3>'
            ,{dangerouslyUseHTMLString:true}, {
              confirmButtonText: '确定',
              callback: action => {
              }
            });
        }
        else {
        _this.$alert('<h3 style="text-align: center; margin: 0">结果</h3>' +
          '<h4 style="text-align: center; margin: 0">抽取次数 '+n+'</h4>' +
          'sss次数:&nbsp;'+res.data.data.sss+
          '</br>ss次数:&nbsp;&nbsp;'+res.data.data.ss+
          '</br>s次数:&nbsp;&nbsp;&nbsp;'+res.data.data.s+
          '</br>a次数:&nbsp;&nbsp;&nbsp;'+res.data.data.a+
          '</br>b次数:&nbsp;&nbsp;&nbsp;'+res.data.data.b+
          '</br>c次数:&nbsp;&nbsp;&nbsp;'+res.data.data.c+
          '</br>d次数:&nbsp;&nbsp;&nbsp;'+res.data.data.d
          ,{dangerouslyUseHTMLString:true}, {
          confirmButtonText: '确定',
          callback: action => {
          },
        });
          this.show()
        }
      })

    },
    show(){
      const _this = this
      axios.get("/card/showselfcard/" + this.user.id).then(res => {
        _this.userc.allcount=res.data.data.allcount
        _this.userc.drawcount=res.data.data.drawcount
        _this.userc.sss=res.data.data.sss
        _this.userc.ss=res.data.data.ss
        _this.userc.s=res.data.data.s
        _this.userc.a=res.data.data.a
        _this.userc.b=res.data.data.b
        _this.userc.c=res.data.data.c
        _this.userc.d=res.data.data.d
      })
    },

  },
  created() {
    //拦截未登录
    if (this.$store.getters.getUser==null)
      this.$router.push('/login')

    if(this.$store.getters.getUser.username) {
      this.user.id = this.$store.getters.getUser.id
    }
    this.show()
  }

}
</script>

<style scoped>

</style>
