/**
 * Created by Aaronzm on 2017/7/2 0002.
 */
const ip = 'wss://iot.ej-cloud.com'
const socket = {
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

export default socket
