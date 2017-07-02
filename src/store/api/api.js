/*******************************************************************************
 *
 * Created by ccd on 2017/6/30.
 *
 * Copyright © 2017年 EJCloud Technology Co.,Ltd.
 * All rights reserved.
 *
 *******************************************************************************/
const ip = 'http://iot.ej-cloud.com'
const api = {
  paramPath: '',
  getParamPath (a) {
    this.paramPath = a
  },
  /**
   * 运行监控API
   */
  RunMonitor: {
    url: ip + '/sap/device/control',
    params (id) {
      return {
        uin: this.paramPath.uin,
        token: this.paramPath.token,
        format: 'json',
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        topid: id,
        _: new Date().getTime()
      }
    },
    method: 'post',
    callback: 'callback'
  }
}

export default api
