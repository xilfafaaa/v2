import Vue from 'vue'
import Router from 'vue-router'
import login from "../components/login";
import blogs from "../components/blogs";
import blogedit from "../components/blogedit";
import blogdetail from "../components/blogdetail";
import register from "../components/register";
import registerr from "../components/registerr";
import oneself from "../components/oneself";


import el from "element-ui/src/locale/lang/el";
import axios from "axios";
import card from "../components/card";
import onselfbloglist from "../components/onselfbloglist";
import oneselfHeader from "../components/oneselfHeader";
import oneselfmain from "../components/oneselfmain";
import oneselfchangenickname from "../components/oneselfchangenickname";
import oneselfchangepsd from "../components/oneselfchangepsd";
Vue.use(Router)
  const routes= [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/index',
      name: 'login',
      component: login
    },
    {
      path:'/login',
      name:'login',
      component:login
    },
    {
      path:'/register',
      name:'register',
      component:register
    },
    {
      path:'/registerr',
      name:'registerr',
      component:registerr
    },
    {
      path:'/blogs',
      name:'blogs',
      component:blogs
    },
    {
      path: '/blogs/add',
      name: 'blogedit',
      component: blogedit,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/blogs/:blogId',
      name:'blogdetail',
      component: blogdetail,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/blogs/:blogId/edit',
      name:'blogedit',
      component: blogedit,
      meta: {
        requireAuth: true
      }
    },
    {
      path:'/self',
      name:'self',
      component:oneself
    },
    {
      path:'/self_card',
      name:'card',
      component:card
    },


    {
      path:"/self",
      name:"个人中心",
      component:oneself,
      show:true,
      redirect:"/oneself",
      children:[
        {
          path:"/selff",
          name:"概览",
          component:oneselfmain
        },
        {
          path:"/changenickname",
          name:"更改昵称",
          component:oneselfchangenickname
        },
        {
          path:"/changepsd",
          name:"更改密码",
          component:oneselfchangepsd
        },
        {
          path:"/bloglist",
          name:"发表的记录列表",
          component:onselfbloglist
        },
        {
          path:"/card",
          name:"卡片",
          component:card
        },

      ]
    },
    {
      path:'/card',
      component:card,
      show:false
    }
  ]
const router = new Router({
  mode:'history',
  routes
})

export default router
