<template>
  <div>
    <friendHeader></friendHeader>
<!--    <h3>好友列表</h3>-->
  <div class="main">
    <el-table
      :data="friends"
      border
      style="width: 100%">
<!--      <el-table-column-->
<!--        fixed prop="id" label="id" width="250">-->
<!--      </el-table-column>-->
      <el-table-column
        prop="avatar" label=" " scope="scope"  width="120">
        <template scope="scope">
          <el-avatar :size="50" :src="scope.row.avatar"></el-avatar>
<!--          另外一种格式的头像-->
<!--          <span class="demonstration">avatar</span>-->
<!--          <el-image-->
<!--            style="width: 100px; height: 100px"-->
<!--            :src="scope.row.avatar"-->
<!--            :fit="fit"></el-image>-->
        </template>
      </el-table-column>

      <el-table-column
        prop="nickname" label=" ">
      </el-table-column>

      <el-table-column
        prop="id" fixed="right" label="操作" width="240">
        <template scope="scope">
<!--                      {{scope.row.id}},,,-->
          <el-popover
                      class="button1"
                      placement="top"
                      width="160"
          >
<!--            <el-button @click="chat(scope.row.id)" slot="reference">進入聊天</el-button>-->
          </el-popover>

          &nbsp;&nbsp;&nbsp;

          <el-popover
                      class="button1"
                      width="160"
          >
            <p>确认删除吗</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="visible = false">取消</el-button>
              <el-button type="primary" size="mini" @click="del(scope.row.id)">确定</el-button>
            </div>
            <el-button slot="reference">删除</el-button>
          </el-popover>


        </template>
      </el-table-column>
    </el-table>

    <el-pagination class="pagee"
                   background
                   layout="prev, pager, next"
                   :current-page="currentPage"
                   :page-size="pageSize"
                   :total="total"
                   @current-change=page>
    </el-pagination>
  </div>
  </div>
</template>

<script>
import axios from "axios";
import friendHeader from "./friendHeader";
export default {
  name: "friendAllFriend",
  components:{
    friendHeader,
  },
  data() {
    return {
      currentPage: 1,
      total: 0,
      pageSize: 20,

      user: {
        id: 0,
      },

      fDTO:{
        sendId:0,
        recId:0,
        message:'',
      },

      friend: {
        id: 0,
        nickname: '',
        avatar: '',
        created:'',
        cohesion:0,
      },
      friends: [{
        id: 0,
        nickname: '',
        avatar: '',
        message:'',
        created:'',
        cohesion:0,
      }, {
        id: 0,
        nickname: '',
        avatar: '',
        message:'',
        created:'',
        cohesion:0,
      }]

    }
  },
  methods: {
    load () {
      // this.count += 2
    },
    page(currentPage) {
      const _this = this
      axios.get('/friend/allfriends/' + this.user.id + '/' + currentPage).then(res => {
        // console.log(res)
        _this.friends = res.data.data.records
        _this.currentPage = res.data.data.current
        _this.total = res.data.data.total
        _this.pageSize = res.data.data.size
      })
    },
    chat(){

    },
    del(n) {
      this.fDTO.sendId=n
      this.fDTO.recId=this.user.id
      // console.log(this.blogde.id)

      const _this = this
      axios.post('/friend/delfriend', this.fDTO, {

      }).then(res => {
        console.log(res.data.data)
        _this.$alert('删除成功', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            _this.$router.go(0)
          }
        });
      });

    },
  },
  created() {
    // //拦截未登录
    // if (this.$store.getters.getUser == null)
    //   this.$router.push('/login')

    if (this.$store.getters.getUser.username) {
      this.user.id = this.$store.getters.getUser.id
      this.fDTO.recid = this.$store.getters.getUser.id
    }
    // console.log(this.user.id)
    this.page(1)
    const _this = this;

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
  .pagee {
    /*margin: 200px 200px 200px 0;*/
    /*position: absolute;*/
    text-align: center;
  }

</style>
