<template>
  <div>
     <friendHeader></friendHeader>
  <div class="main">
    <el-table
      :data="friends"
      border
      style="width: 100%">
      <!--      <el-table-column-->
      <!--        fixed prop="id" label="id" width="250">-->
      <!--      </el-table-column>-->

      <el-table-column
        prop="sendAvatar" label=" " scope="scope"  width="120">
        <template scope="scope">
          <el-avatar :size="50" :src="scope.row.sendAvatar"></el-avatar>
          <!--          另外一种格式的头像-->
          <!--          <span class="demonstration">avatar</span>-->
          <!--          <el-image-->
          <!--            style="width: 100px; height: 100px"-->
          <!--            :src="scope.row.sendAvatar"-->
          <!--            :fit="fit"></el-image>-->
        </template>
      </el-table-column>







      <el-table-column
        prop="sendNickname" label="昵称">
      </el-table-column>
      <el-table-column
        prop="message" label="附加消息">
      </el-table-column>

      <el-table-column
        prop="sendId" fixed="right" label="操作" width="240">
        <template scope="scope">
<!--                      {{scope.row.sendId}},,,-->
          <el-popover ref="blog"
                      class="button1"
                      placement="top"
                      width="160"
          >
              <el-button @click="confirmAddFriend(scope.row.sendId)" slot="reference">接受</el-button>
          </el-popover>

          &nbsp;&nbsp;&nbsp;

          <el-popover ref="blog"
                      class="button1"
                      width="160"
          >
            <p>确认拒绝吗</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="visible = false">取消</el-button>
              <el-button type="primary" size="mini" @click="confirmRefuseFriend(scope.row.sendId)">确定</el-button>
            </div>
            <el-button slot="reference">拒绝</el-button>
          </el-popover>


        </template>
      </el-table-column>
    </el-table>
  </div>

  </div>
</template>

<script>
import axios from "axios";
import friendHeader from "./friendHeader";
export default {
  name: "friendRequest",
  components:{
    friendHeader,
  },
  data() {

    return {
      currentPage: 1,
      total: 0,
      pageSize: 10,
      count:44,
      user: {
        id: 0,
      },

      fDTO:{
        sendId:0,
        recId:0,
        message:'',
      },

      friend: {
        recId:0,
        sendId: 0,
        sendNickname: '',
        sendAvatar: '',
        message:'',
        cohesion:0,

      },
      friends: [{
        message:'',
        recId: '',
        sendAvatar: '',
        sendId:0,
        sendNickname:0,
      }, {
        message:'',
        recId: '',
        sendAvatar: '',
        sendId:0,
        sendNickname:0,
      }]

    }
  },
  methods: {
    todetail(n) {
      this.$router.push('/blogs/' + n)
    },
    allRequest() {
      const _this = this
      axios.get('/friend/showrequest/' + this.user.id).then(res => {
        // console.log(res)

        _this.friends = res.data.data
        _this.count=Number(res.data.msg)
        // console.log(res.data.data)
        // console.log(_this.count)
        // console.log(_this.friends[0])
      })
    },

    confirmAddFriend(n){
      this.fDTO.sendId = n
      const _this = this
      axios.post('/friend/confirmaddfriend', this.fDTO, {
      }).then(res => {
        // console.log(res)
        _this.$alert(res.data.data, '提示', {
          confirmButtonText: '确定',
          callback: action => {
            _this.$router.go(0)
          }
        });
      });
    },

    confirmRefuseFriend(n){
      this.fDTO.sendId = n
      console.log(n)
      const _this = this
      axios.post('/friend/confirmrefusefriend', this.fDTO, {
      }).then(res => {
        // console.log(res)
        _this.$alert(res.data.data, '提示', {
          confirmButtonText: '确定',
          callback: action => {
            _this.$router.go(0)
          }
        });
      });
    },

  },
  created() {
    //拦截未登录
    if (this.$store.getters.getUser == null)
      this.$router.push('/login')

    if (this.$store.getters.getUser.username) {
      this.user.id = this.$store.getters.getUser.id
      this.friends.id=this.$store.getters.getUser.id
      this.fDTO.recId=this.$store.getters.getUser.id
    }


    this.allRequest();
  }


}


</script>

<style scoped>
  .main{
    margin-left: -20px;
    margin-right: -20px;
    margin-top: -42px;
    /*position: absolute;*/
    /*top: -40px;*/
  }
</style>
