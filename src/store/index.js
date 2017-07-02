/**
 * Created by Aaronzm on 2017/7/2 0002.
 */
import Vue from 'vue'
import Vuex from 'vuex'

// import PlayService from './PlayService'
import ApiService from './api/ApiService'
import ScoketService from './api/ScoketService'
// import NotifyService from './NotifyService'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    // PlayService,
    ApiService,
    ScoketService
    // NotifyService
  }
})
