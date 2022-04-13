<template>
  <div>

    <Header></Header>
    <h2 class="h22"> {{ blog.title }}</h2>
    <div class="mblog">
      <br>
      摘要：
        <h3> {{ blog.description }}</h3>
      <el-divider></el-divider>
      正文：
      <el-link icon="el-icon-edit" v-if="ownBlog">

        <router-link :to="{name: 'blogedit', params: {blogId: blog.id}}" >
          编辑
        </router-link>
      </el-link>

      <div class="markdown-body" v-html="blog.content"></div>
      <br>
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
        <br><br>
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
      _this.blog.description = blog.description
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
  .h22{
    text-align: center;
    color: white;
  }
  .mblog{
    margin: 0 auto;
    text-align: center;
    background-color: rgba(201, 201, 201, 0.55);
    width: 90%;
    border-radius:20px;
    padding-left:20px;
    padding-right:20px;
  }
  .zhengwen{

  }
  .markdown-body{
    text-align: left;
    background-color: rgba(0,0,0,0);
  }
  .button1{
    background-color: #fff;
  }
</style>
