<template>
  <div>
    <Header></Header>
    <div class="title">
      <h1>摸鱼记录</h1>
      <div class="title">
        <a :model="newRecord" @click="showAddRecord()">
          添加记录
        </a><br>
      </div>
    </div>


    <div class="block">
      <el-timeline>
        <el-timeline-item class="allRecords" v-bind:timestamp="rec.created.replace('T',' ')" placement="top" v-for="rec in record">
          <el-card class="cardd">
            <div class="recordsText" >
<!--              类型-->
              {{moyutype(rec.type)}}
              <nobr class="toRight">
<!--                时间-->
                {{rec.created.replace('T',' ')}}
              </nobr>
<!--              <router-link :to="{name: 'record', params: {recordId: rec.id}}">-->
<!--              </router-link>-->
              <br>
<!--              备注 -->
              {{rec.remark}}<br>
<!--              时长 -->
              {{rec.duration}}
            </div>
<!--            <p>{{rec.id}}</p>-->
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
    <div class="page">
      <el-pagination class="mpage"
                     background
                     layout="prev, pager, next"
                     :current-page="currentPage"
                     :page-size="pageSize"
                     :total="total"
                     @current-change=page>
      </el-pagination>
    </div>



    <el-dialog title="添加记录" :modal="false" class="addBG" :visible.sync="dialogFormVisible">
      <el-form class="addForm" :model="newRecord">
        类型 <br><br>
        <el-select  v-model="value" placeholder="请选择">
          <el-option
            v-for="item in optionType"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <br><br>备注 <br><br>
        <el-select  v-model="remarkValue" placeholder="请选择">
          <el-option
            v-for="item in optionRemark"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <br><br>minute<br><br>
<!--        <el-form-item label=" "  :label-width="formLabelWidth">-->
          <el-input v-model="newRecord.duration" :label-width="formLabelWidth"></el-input>
          <br>
<!--          <el-input v-model="newRecord.userId" ></el-input>-->
<!--        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRecord()">确 定</el-button>
      </div>

    </el-dialog>



  </div>
</template>

<script>
import axios from "axios";
import Header from "../Header";

export default {
  name: "moyu",
  components:{
    Header,
  },
  data(){
    return{
      dialogFormVisible: false,
      diaaddvis:false,
      formLabelWidth: '120px',
      newRecord: {
        userId:0,
        remark:'',
        type:0,
        duration:2,
      },
      record: {},
      user: {
        id:0,
        username: '',
        nickname: '',
      },
      hasLogin: false,

      currentPage: 1,
      total: 0,
      pageSize: 10,

      optionType: [{
        value: 0,
        label: 'small'
      }, {
        value: 1,
        label: 'big'
      },
      ],
      value: 0,

      optionRemark: [{
        value: 0,
        label: '0'
      }, {
        value: 1,
        label: '1'
      }, {
        value: 2,
        label: '2'
      },{
        value: 3,
        label: '3'
      }, {
        value: 4,
        label: '4'
      }, {
        value: 5,
        label: '5'
      },{
        value: 6,
        label: '6'
      }, {
        value: 7,
        label: '7'
      },
      ],
      remarkValue: 0
    }

  },

  created() {
    //拦截未登录
    if (this.$store.getters.getUser==null)
      this.$router.push('/login')
    this.user.id = this.$store.getters.getUser.id
    this.user.username = this.$store.getters.getUser.username
    this.user.nickname = this.$store.getters.getUser.nickname
    this.user.avatar = this.$store.getters.getUser.avatar
    this.newRecord.userId=this.$store.getters.getUser.id
    this.hasLogin = true

    this.page(1)

  },

  methods: {
    showAddRecord() {
      this.dialogFormVisible = true

    },
    addRecord() {
      // console.log(this.newRecord.duration)
      if (isNaN(this.newRecord.duration))
        this.$message('要数字');
      else{
        this.newRecord.duration=parseInt(this.newRecord.duration)
        this.newRecord.type=this.value
        this.newRecord.remark=this.remarkValue+'/6'
        // console.log(this.newRecord)

        const _this = this
        axios.post('/pee-shit-record/addrecord', this.newRecord, {
        }).then(res => {
          // console.log(res)
          _this.$alert(res.data.data, '提示', {
            confirmButtonText: '确定',
            callback: action => {
              _this.$router.go(0)
            }
          });
        });
        this.dialogFormVisible = false
      }
    },
    moyutime(time) {
      return time.replace('T',' ')
    },

    moyutype(n){
      if (n===0)
        return 'small'
      if (n===1)
        return 'big'
      else
        return 'type not found'
    },


    page(currentPage) {
      const _this = this
      axios.get("/pee-shit-record/allrecords/" + currentPage).then(res => {
        // console.log(res)
        _this.record = res.data.data.records
        _this.currentPage = res.data.data.current
        _this.total = res.data.data.total
        _this.pageSize = res.data.data.size
        console.log(res.data.data)
      })
    },


  }
}
</script>

<style scoped>
  .title{
    text-align: center;
    color: white;
  }
  .block{
    width: 98%;
  }
  .mpage {
    margin: 0 auto;
    text-align: center;
  }
  a:visited{
    color: #000000;
    text-decoration:none;
  }
  a:link{
    color: #000000;
    text-decoration:none;
  }
  a:active{
    color: #000000;
    text-decoration:none;
  }
  a:hover{
    color: #fff204;
    /*text-decoration:;*/
  }

  .cardd {
    background-color: rgba(255, 255, 255, 0.5);
  }
  .mcontaner{
    /*background-color: #eec0c0;*/
    /*background-image:url('.../assets/img4.jpg');*/
    margin: -10px -7px -8px -10px;
    height: 126vh;
    color: #eeeeee;
  }
  .page{
    /*position: sticky;*/
    /*top: calc(100% - 80px);*/
    /*height: 80px;*/
    text-align: center;
  }
  .allRecords{
    color: #fff;
    text-shadow: 0 0 10px #000000,0 0 4px #000000,0 0 2px #000000,0 0 6px;
  }
  .recordsText{
    color: #000000;
    /*text-shadow: 0 0 0px #ffffff,0 0 0px #ffffff,0 0 0px #ffffff,0 0 0px;*/
    text-shadow: none;
  }
  .toRight{
    position: relative;
    left: 83%;
    text-align: right;
    /*background-color: #79ff7f;*/
    color: #fff;
    text-shadow: 0 0 10px #6200ff,0 0 4px #5900ff,0 0 6px #8100ff,0 0 5px;
  }
  .addBG{
    width: 800px;
    margin:auto auto;
  }
  .addForm{
    width: 200px;
    /*background-color: #5daf34;*/
    margin:10px auto;
  }
</style>
