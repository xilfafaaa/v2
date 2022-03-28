<template>
  <div class="mcontaner">
    <Header></Header>
    <div class="title">
      <h1>blogs list</h1>
    </div>

    <div class="block">
      <el-timeline>
        <el-timeline-item v-bind:timestamp="blog.created" placement="top" v-for="blog in blogs">
          <el-card>
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

    <el-pagination class="mpage"
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

</style>
