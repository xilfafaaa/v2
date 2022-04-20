import axios from 'axios'
import Element from 'element-ui'
import router from './router'
import store from './store'


// axios.defaults.baseURL = "http://127.0.0.1:8082"
axios.defaults.baseURL = "http://42.192.229.75:8082"

// 前置拦截
axios.interceptors.request.use(config => {
  return config
})

axios.interceptors.response.use(response => {
    let res = response.data;

    // console.log(res)

    if (res.code === 200) {
      return response
    } else {

      Element.Message.error(response.data.msg, {duration: 3 * 1000})

      return Promise.reject(response.data.msg)
    }
  },
  error => {
    // console.log(error)
    if(error.response.data) {
      error.message = error.response.data.msg
    }
    if(error.response.status === 401) {
      store.commit("REMOVE_INFO")
      router.push("/login")
    }
    Element.Message.error(error.message, {duration: 3 * 1000})
    return Promise.reject(error)
  }
)
