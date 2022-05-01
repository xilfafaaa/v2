<template>
  <div class="f_header">
    <el-menu  router  class="el-menu-demo"
              mode="horizontal" v-for="(item,index) in $router.options.routes" :index="index+''" v-if="item.show" >

      <el-menu-item v-for="(item2,index2) in item.children" :index="item2.path"
                    :class="$route.path==item2.path?'is-active':''" v-if="!item2.show">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item2.name}}&nbsp;&nbsp;&nbsp;&nbsp;
      </el-menu-item>
<!--      <el-menu-item index="1">处理中心</el-menu-item>-->


    </el-menu>

    <el-main>
      <router-view></router-view>
    </el-main>

    <div class="line"></div>



  </div>
</template>

<script>
export default {
  name: "friendHeader"
}
</script>

<style scoped>
  .f_header{
    /*background-color: #3a8ee6;*/
    margin-top: -4px;
    margin-left: -20px;
    margin-right: -20px;
  }


</style>
