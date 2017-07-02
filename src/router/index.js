import Vue from 'vue'
import Router from 'vue-router'
// import Vux from 'vux'
// import Home from '@/components/Home'
// import RunMonitor from '@/components/RunMonitor'
// import Control from '@/components/Control'
// import Setting from '@/components/Setting'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: function (resolve) {
        require(['@/components/Home'], resolve)
      }
    },
    {
      path: '/RunMonitor',
      name: 'RunMonitor',
      component: function (resolve) {
        require(['@/components/RunMonitor'], resolve)
      }
    },
    {
      path: '/Control',
      name: 'Control',
      component: function (resolve) {
        require(['@/components/Control'], resolve)
      }
    },
    {
      path: '/Setting',
      name: 'Setting',
      component: function (resolve) {
        require(['@/components/Setting'], resolve)
      }
    }
  ]
})
