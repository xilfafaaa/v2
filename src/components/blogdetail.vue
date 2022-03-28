<template>
  <div>

    <Header></Header>
    <div class="mblog">
      <h1>detail</h1>
      <hr>

      <h2> {{ blog.title }}</h2>
      <el-link icon="el-icon-edit" v-if="ownBlog">
        <router-link :to="{name: 'blogedit', params: {blogId: blog.id}}" >
          编辑
        </router-link>
      </el-link>

      <div class="markdown-body" v-html="blog.content"></div>

      <el-divider></el-divider>
      <br>
      <el-popover v-if="ownBlog" :model="blog"  ref="blog"
                  class="button1"
                  placement="top"
                  width="160"
                  >
        <p>确认删除吗</p>
        <div style="text-align: right; margin: 0">
          <el-button size="mini" type="text" @click="visible = false">取消</el-button>
          <el-button type="primary" size="mini" @click="delblog('blog')">确定</el-button>
        </div>
        <el-button slot="reference">删除</el-button>
      </el-popover>

    </div>
  </div>
</template>

<script>
import 'github-markdown-css'
import Header from "./Header";
import axios from "axios";

export default {
  name: "blogdetail",
  components:{
    Header,
  },
  data() {
    return {
      blog: {
        id: "",
        title: "",
        description: '1',
        content: ""
      },
      ownBlog: false
    }
  },
  methods: {
    delblog(blog) {
        // console.log(blog.id)
          const _this = this
          axios.post('/blog/delete1',this.blog, {
            headers: {
              "Authorization": localStorage.getItem("token")
            }
          }).then(res => {
            // console.log(res)
            _this.$alert('删除成功', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                _this.$router.push("/blogs")
              }
            });
      });
    },
  },
  created() {
    const blogId = this.$route.params.blogId
    const _this = this
    this.axios.get('/blog/detail/' + blogId).then(res => {
      const blog = res.data.data
      _this.blog.id = blog.id
      _this.blog.title = blog.title

      const MardownIt = require("markdown-it");
      const md = new MardownIt();

      _this.blog.content = md.render(blog.content)
      _this.ownBlog = (blog.userId === _this.$store.getters.getUser.id)
    })
  }
}

</script>

<style scoped>
  .mblog{
    text-align: center;
  }
  .markdown-body{
    text-align: left;
  }
  .button1{
    background-color: #fff;
  }
</style>
