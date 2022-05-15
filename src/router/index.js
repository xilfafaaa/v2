import Vue from 'vue'
import Router from 'vue-router'
import login from "../components/login";
import blogs from "../components/blogs";
import blogedit from "../components/blogedit";
import blogdetail from "../components/blogdetail";
import register from "../components/register";
import registerr from "../components/registerr";
import oneself from "../components/oneself/oneself";


import el from "element-ui/src/locale/lang/el";
import axios from "axios";
import card from "../components/oneself/card";
import onselfbloglist from "../components/oneself/onselfbloglist";
import oneselfHeader from "../components/oneself/oneselfHeader";
import oneselfmain from "../components/oneself/oneselfmain";
import oneselfchangenickname from "../components/oneself/oneselfchangenickname";
import oneselfchangepsd from "../components/oneself/oneselfchangepsd";
import friendAllFriend from "../components/friend/friendAllFriend";
import friendRequest from "../components/friend/friendRequest";
import friendFindFriend from "../components/friend/friendFindFriend";
import moyu from "../components/moyu/moyu"
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
      path:'/moyurecord',
      name:'moyurecord',
      component:moyu
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
          component:oneselfmain,
          show:true,
        },
        {
          path:"/changenickname",
          name:"更改昵称",
          component:oneselfchangenickname,
          show:true,

        },
        {
          path:"/changepsd",
          name:"更改密码",
          component:oneselfchangepsd,
          show:true,
        },
        {
          path:"/bloglist",
          name:"发表的记录列表",
          component:onselfbloglist,
          show:true,
        },
        {
          path:"/card",
          name:"抽奖",
          component:card,
          show:true,
        },
        {
          path:"/friend",
          name:"查看好友",
          component:friendAllFriend,
          show:true,
        },
        {
          path:"/allfriend",
          name:"查看好友",
          component:friendAllFriend,
          show:false,
        },
        {
          path:"/friendrequest",
          name:"好友请求",
          component:friendRequest,
          show:false,
        },
        {
          path:"/findfriend",
          name:"搜索好友",
          component:friendFindFriend,
          show:false,
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
