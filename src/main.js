// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from "axios";
import './permission'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(mavonEditor)
// Vue.prototype.$axios = axios
Vue.prototype.axios = axios
import './axios'

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
