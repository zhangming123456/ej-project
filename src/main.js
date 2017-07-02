import Vue from 'vue'
import FastClick from 'fastclick'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import { querystring } from 'vux'

import App from './App'
import store from './store'
import router from './router'
import './filters'
// import Api from './store/Api/api'

import '../static/libs/css/reset.css'
import '../static/libs/css/common.less'

(function (document) {
  /* 长宽占位 rem算法, 根据root的rem来计算各元素相对rem, 默认html 375/5 = 75px */
  function placeholderPic () {
    let w = document.documentElement.offsetWidth
    let h = document.documentElement.offsetHeight
    var app = document.querySelector('body')
    app.style.minHeight = h + 'px'
    document.documentElement.style.fontSize = w / 5 + 'px'
  }

  placeholderPic()
  window.onresize = function () {
    placeholderPic()
  }
}(document))
/**
 * 截取token值
 * @returns {{paramStr: string, paramObj}}
 * @private
 */
const __getUrlQuerystring = function () {
  // 获取url地址
  const url = window.location.href
  let [start, end] = [url.indexOf('/?'), url.indexOf('#/')]
  if (start >= 0 && end >= 0 && start + 2 < end - 1) {
    const param = url.substring(start + 2, end)
    return {
      paramStr: param,
      paramObj: querystring.parse(param)
    }
  }
}
Vue.prototype.__getUrlQuerystring = __getUrlQuerystring
Vue.prototype.__$ = function () {
  return require('zepto')
}
import Utils from './utils'
// Api.api.getParamPath(__getUrlQuerystring())
Vue.directive('set-suffix', {
  isLiteral: true,
  update (el, obj) {
    // suffix
    const ele = el.querySelector('input').parentElement
    console.log(ele)
    console.log(Utils(ele).addClass(document, 'suffix-temperature'))
  }
})
router.beforeEach((to, from, next) => {
  // ...
  // console.log(this)
  next()
})

Vue.use(VueRouter)
Vue.use(VueResource)
FastClick.attach(document.body)

Vue.config.productionTip = false
/* eslint-disable no-new */

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
