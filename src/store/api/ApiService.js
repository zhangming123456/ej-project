/*******************************************************************************
 *
 * Created by ccd on 2017/6/30.
 *
 * Copyright © 2017年 EJCloud Technology Co.,Ltd.
 * All rights reserved.
 *
 *******************************************************************************/
import Vue from 'vue'
import Api from './api'

console.log(Api.paramPath, 123)

function apiFactory (api) {
  return (id = null) => Vue.http[api.method](
    api.url,
    {
      params: api.params(id),
      jsonp: api.callback
    }
  )
}

const apiService = {
  actions: {
    getRunMonitor ({}, id) {
      return apiFactory(Api.RunMonitor)(id)
    }
  }
}
export default apiService
