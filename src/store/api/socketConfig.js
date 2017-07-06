/**
 * Created by Aaronzm on 2017/7/2 0002.
 */
class Api {
  constructor () {
    this.host = 'iot.ej-cloud.com'
    this.port = '8083'
    this.path = ''
  }

  params (path, msg) {
    this.path = path
    let _this = this
    return {
      token: _this.token,
      topic: _this.topic,
      did: _this.did,
      url: 'ws://' + _this.host + ':' + _this.port + (/^\//.test(path) ? path : '/' + path),
      format: 'json',
      inCharset: 'utf-8',
      outCharset: 'utf-8',
      msg: msg,
      _: new Date().getTime()
    }
  }
}

class SocketConfig extends Api {
  constructor (param, type = null, ...args) {
    super(...args)
    this.token = param.token || ''
    this.topic = param.topic || ''
    this.did = param.did || ''
    if (type) {
      this.msgData = this[type]()
    }
  }

  /**
   * 运行监控API
   */
  RunMonitor () {
    this.path = '/sap/device/control'
    return this.params(this.path, '运行监控API')
  }
}

export default {
  param: '',
  paramStr: '',
  setToken (param) {
    if (param) {
      this.param = param.obj || ''
      this.paramStr = param.str || ''
    }
  },
  createSocketConfig (type) {
    if (this.param && this.param.did) {
      return new SocketConfig(this.param, type)
    } else {
      return {
        start: 400,
        msg: '没有did值'
      }
    }
  }
}
