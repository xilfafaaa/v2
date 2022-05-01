<template>
  <div>
    <friendHeader></friendHeader>
    <div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="200px" class="demo-ruleForm">
        <el-form-item label="输入昵称" prop="nickname"  label-width="200px" >
          <el-input v-model="ruleForm.nickname" ></el-input>
        </el-form-item>
<!--        <br>-->
        <el-form-item class="c">
          <el-button @click="find(1)">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div>
    <div class="main">
      <el-table
        :data="friends"
        border
        style="width: 100%">

        <el-table-column
          prop="avatar" label=" " width="120">
          <template scope="scope">
            <el-avatar :size="50" :src="scope.row.avatar"></el-avatar>
            <!--          另外一种格式的头像-->
            <!--          <span class="demonstration">avatar</span>-->
            <!--          <el-image-->
            <!--            style="width: 100px; height: 100px"-->
            <!--            :src="scope.row.sendAvatar"-->
            <!--            :fit="fit"></el-image>-->
          </template>
        </el-table-column>


        <el-table-column
          prop="nickname" label="昵称">
        </el-table-column>

        <el-table-column
          prop="id" fixed="right" label="操作" width="240">
          <template scope="scope">
<!--                                  {{scope.row.id}}&#45;&#45;&#45;&#45;1-->
            &nbsp;&nbsp;&nbsp;

            <el-button type="text"  :model="scope.row.id" @click="showAndGetRowId(scope.row.id)">
              发送请求
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      </div>

      <el-dialog title="验证信息" :modal="false"  :visible.sync="dialogFormVisible">
        <el-form :model="fDTO">
          <el-form-item label="活动名称"  :label-width="formLabelWidth">
            <el-input v-model="fDTO.message" ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="closeAndSendReq()">确 定</el-button>
        </div>
      </el-dialog>


      <el-pagination class="pagee"
                     background
                     layout="prev, pager, next"
                     :current-page="currentPage"
                     :page-size="pageSize"
                     :total="total"
                     @current-change=find>
      </el-pagination>

    </div>


  </div>
</template>

<script>
import friendHeader from "./friendHeader";
import axios from "axios";
export default {
  name: "friendFindFriend",
  components:{
    friendHeader,
  },
  data() {
    return {
      currentPage: 1,
      total: 0,
      pageSize: 20,

      dialogFormVisible: false,
      diaaddvis:false,
      formLabelWidth: '120px',

      ruleForm: {
        nickname: '',
      },


      rules: {
        nickname: [
          { required: true, message: '1个字符以上', },
          { min: 1, max: 15, message: '昵称',  }
        ],
      },

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
      //   message:'',
      //   recId: '',
      //   sendAvatar: '',
      //   sendId:0,
      //   sendNickname:0,
      // }, {
      //   message:'',
      //   recId: '',
      //   sendAvatar: '',
      //   sendId:0,
      //   sendNickname:0,
      }]

    }
  },
  methods: {
    showAndGetRowId(n){
      this.fDTO.message=""
      this.dialogFormVisible = true
      this.fDTO.recId = n
    },
    closeAndSendReq(){
      this.dialogFormVisible = false
      console.log(this.fDTO)
      const _this = this
      axios.post('/friend/addfriend', this.fDTO, {
      }).then(res => {
        _this.$alert(res.data.data, '提示', {
          confirmButtonText: '确定',
          callback: action => {
            // _this.$router.go(0)
          }
        });
      });


    },
    find(currentPage) {
      if(this.ruleForm.nickname==='')
        return;
      const _this = this
      axios.get('/friend/findfriend/' + this.ruleForm.nickname+ '/'+ currentPage ).then(res => {
        // console.log(res)
        _this.friends = res.data.data.records
        _this.currentPage = res.data.data.current
        _this.total = res.data.data.total
        _this.pageSize = res.data.data.size
      })
    },



  },
  created() {
    // //拦截未登录
    // if (this.$store.getters.getUser == null)
    //   this.$router.push('/login')
    //
    if (this.$store.getters.getUser.username) {
      this.user.id = this.$store.getters.getUser.id
      this.friends.id=this.$store.getters.getUser.id
      this.fDTO.sendId=this.$store.getters.getUser.id
    }
    this.friends=null

  }


}


</script>
<style scoped>
  .main{
    margin-left: -20px;
    margin-right: -20px;
    /*margin-top: -42px;*/
    /*position: absolute;*/
    /*top: -40px;*/
  }
  .pagee {
    /*margin: 200px 200px 200px 0;*/
    /*position: absolute;*/

    text-align: center;
  }
  .demo-ruleForm{
    margin-left: -120px;
  }

</style>
