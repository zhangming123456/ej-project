/**
 * Created by Aaronzm on 2017/7/3 0003.
 */
import Vue from 'vue'
// import Reg from '../config/reg'
Vue.filter('numberFilter', function (value) {
  return parseInt(value / 1000) + '万'
})

Vue.filter('limitBy', function (arr, ...arg) {
  let [a, i, flag] = [{}, 0, false]
  return arr
})
export default {
  numberFilter: Vue.filter('numberFilter'),
  limitBy: Vue.filter('limitBy')
}
