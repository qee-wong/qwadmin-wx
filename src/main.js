// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
//import Vuex from 'vuex'
import App from './App'
import router from './router'
import {AjaxPlugin} from 'vux'
const FastClick = require('fastclick')
Vue.use(AjaxPlugin)

//import './api/wx'

FastClick.attach(document.body)
Vue.config.productionTip = false

import '../static/css/reset.css'
import store from './store'
import './permission' // permission control

/* eslint-disable no-new */
var vue = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
//console.log(Vue.wechat) // 可以直接访问 wx 对象。