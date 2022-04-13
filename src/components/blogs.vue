<template>
  <div class="mcontaner">
    <Header></Header>
    <div class="title">
      <h1>所有记录</h1>
    </div>

    <div class="block">
      <el-timeline>
        <el-timeline-item v-bind:timestamp="blog.created" placement="top" v-for="blog in blogs">
          <el-card class="cardd">
            <h3 class="h33">
              <router-link :to="{name: 'blogdetail', params: {blogId: blog.id}}">
                {{blog.title}}
              </router-link>
            </h3>
            <p>{{blog.description}}</p>
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
  </div>
</template>

<script>
import axios from "axios";
import Header from "./Header";
export default {
  name: "blogs",
  components:{
    Header,
  },
  data() {
    return {
      blogs: {},
      currentPage: 1,
      total: 0,
      pageSize: 5
    }
  },
  methods: {
    page(currentPage) {
      const _this = this
      axios.get("/blog/list?currentPage=" + currentPage).then(res => {
        // console.log(res)
        _this.blogs = res.data.data.records
        _this.currentPage = res.data.data.current
        _this.total = res.data.data.total
        _this.pageSize = res.data.data.size
      })
    }
  },

  created() {
    //拦截未登录
    if (this.$store.getters.getUser==null)
      this.$router.push('/login')
    this.page(1)
  }

}
</script>

<style scoped>
  .title{
    text-align: center;
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
  .cardd {
    background-color: rgba(255, 255, 255, 0.5);

  }
  .mcontaner{
    /*background-color: #eec0c0;*/
    background-image:url('../assets/img4.jpg');
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

</style>
