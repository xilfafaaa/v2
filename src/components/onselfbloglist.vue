<template>
  <div class="selfbloglist">
    <h1>查看所有</h1>
    <br>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        fixed prop="title" label="标题" width="20">
      </el-table-column>
      <el-table-column
        prop="description" label="描述">
      </el-table-column>
      <el-table-column
        prop="created" label="创建时间" width="170">
      </el-table-column>
      <el-table-column
        prop="id" fixed="right" label="操作" width="240">
          <template scope="scope">
<!--            {{scope.row.id}},,,-->
            <el-popover ref="blog"
                        class="button1"
                        placement="top"
                        width="160"
                        >
              <el-button style="margin-left:100px;" type="primary" plain round @click="todetail(scope.row.id)"  slot="reference">详情</el-button>
            </el-popover>

<!--          <el-button @click="todetail(scope.row.id)" type="text" size="small">查看详情</el-button>-->
            &nbsp;&nbsp;&nbsp;

            <el-popover ref="blog"
                        class="button1"
                        width="160"
                         >
              <p>确认删除吗</p>
              <div style="text-align: right; margin: 0">
                <el-button round size="mini" type="text" @click="visible = false">取消</el-button>
                <el-button round type="primary" size="mini" @click="del(scope.row.id)">确定</el-button>
              </div>
              <el-button style="margin-right:1px;" round slot="reference">删除</el-button>
            </el-popover>


<!--          <el-button @click="del(scope.row.id)" type="text" size="small">删除</el-button>-->
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
</template>

<script>
import axios from "axios";

export default {
  name: "onselfbloglist",
  data() {
    return {
      currentPage: 1,
      total: 0,
      pageSize: 10,
      user:{
        id:0,
      },
      blogde: {
        id: 0,
        title: '1',
        description: '1',
        content: '1'
      },
      tableData: [{
        id:0,
        title: '暂无',
        description: '暂无',
        created: '暂无',
      },  {
        id:0,
        title: '',
        description: '',
        created: '',
      }]
    }
  },
  methods: {
    todetail(n){
      this.$router.push('/blogs/'+n)
    },
    page(currentPage) {
      const _this = this
      axios.get('/oneself/allblogs/' +this.user.id+'/'+ currentPage).then(res => {
        // console.log(res)
        _this.tableData=res.data.data.records
        _this.currentPage = res.data.data.current
        _this.total = res.data.data.total
        _this.pageSize = res.data.data.size
      })
    },
    del(n) {
      this.blogde.id=n
      // console.log(this.blogde.id)

      const _this = this
      axios.post('/blog/delete1',this.blogde, {
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        // console.log(res)
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
  //拦截未登录
  if (this.$store.getters.getUser==null)
    this.$router.push('/login')

  if(this.$store.getters.getUser.username) {
    this.user.id = this.$store.getters.getUser.id
  }
  const _this=this;
  this.page(1)
  },

}
</script>

<style scoped>
  h1{
    font-family: Deng;
  }
  .pagee{
    /*margin: 200px 200px 200px 0;*/
    /*position: absolute;*/

    text-align: center;

  }
  .selfbloglist{
    /*height: 100%;*/
  }
</style>
