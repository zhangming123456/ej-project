/*******************************************************************************
 *
 * Created by ccd on 2017/6/30.
 *
 * Copyright © 2017年 EJCloud Technology Co.,Ltd.
 * All rights reserved.
 *
 *******************************************************************************/
import { querystring } from 'vux'
import Api from './socketConfig'
import Paho from '../../libs/js/mqttws31'

const __getUrlQuerystring = () => {
  // 获取url地址
  const url = window.location.href
  let [start, end] = [url.indexOf('/?'), url.indexOf('#/')]
  if (start >= 0 && end >= 0 && start + 2 < end - 1) {
    const param = url.substring(start + 2, end)
    return {
      Str: param,
      Obj: querystring.parse(param)
    }
  }
}
console.log(__getUrlQuerystring(), 11112112211)
// const a = {
//   'ejcloud_message_sender': 10065,
//   'ejcloud_message_receiver': 10106,
//   'ejcloud_message_push_date': '2017-07-04 11:51:57',
//   'ejcloud_message_type': 20010,
//   'ejcloud_message_message': 'AA02002E00210F210001000002000000000002000000000B000B000000000000000000000000000000000000000064',
//   'ejcloud_message_message_url': '',
//   'ejcloud_message_ext': '',
//   'ejcloud_message_message_type': 1,
//   'ejcloud_message_send_state': 1,
//   'ejcloud_message_receiver_state': 2
// }

/**
 * ************************个人写的webSocket服务*******************
 */

/**
 * 创建webSocket服务实例
 * @param url
 * @returns {Promise}
 */
function startSocket (url) {
  return new Promise((resolve, reject) => {
    let socket = new WebSocket(url, ['mqtt']) || 0
    if (socket.readyState === 1 || socket.readyState === 0) {
      socket.binaryType = 'arraybuffer'
      resolve(socket)
    } else {
      socket.binaryType = 'arraybuffer'
      reject(socket)
    }
  })
}

/**
 * 注册webSocket服务监听事件
 * @param socket
 * @param callback
 * @param name
 * @param isRemove
 */
function setEvent (socket, callback, name = 'open', isRemove = false) {
  let socketData = {
    data: null,
    status: socket.readyState,
    url: socket.url,
    sendStatus: socket.bufferedAmount === 0,
    bufferedAmount: socket.bufferedAmount
  }
  if (isRemove) {
    socket.removeEventListener(name, (data) => {
      socketData.data = data
      callback && callback(socketData, socket)
    })
  } else {
    socket.addEventListener(name, (data) => {
      socketData.data = data
      callback && callback(socketData, socket)
    })
  }
}

/**
 * 创建webSocket服务实例类
 */
class RunMonitor {
  constructor (url, options = {}, isKey = true) {
    // let path = querystring.stringify(Api.paramPath)
    this.path = ''
    // if (isKey && param) {
    //   this.path = '/?' + path
    // }
    this.host = url
    this.promise = startSocket(url + this.path)
    this.socket = null
    this.Error = null
    this.open = false
  }

  /**
   * 开启通道
   * @param callback
   * @returns {RunMonitor}
   */
  toSocket (callback) {
    this.promise.then(
      (socket) => {
        this.Error = socket.readyState
        this.socket = socket
        callback && callback()
      },
      (socket) => {
        this.Error = socket.readyState
        this.socket = socket
        callback && callback()
      }
    )
    return this
  }

  /**
   * 开启通道并返回链接状态
   * @param callback
   * @returns {RunMonitor}
   */
  receive (callback) {
    let _this = this
    this.toSocket(() => {
      setEvent(_this.socket, (data, socket) => {
        if (socket.readyState === 1) {
          _this.open = true
        }
        callback && callback(data)
      })
    })
    console.log(this)
    return this
  }

  /**
   * 一个用于消息事件的事件监听器
   * @param callback
   * @returns {RunMonitor}
   */
  message (callback) {
    if (!this.open) {
      console.log('Socket通道未开启')
      return this
    }
    setEvent(this.socket, (data, socket) => {
      callback && callback(data)
    }, 'message')
    return this
  }

  /**
   * 发送数据
   * @param a
   * @param callback
   * @returns {RunMonitor}
   */
  sendDate (a, callback) {
    if (!this.open) {
      console.log('Socket通道未开启')
      return this
    }
    this.socket.send(a)
    return this
  }

  /**
   * 关闭通道数据
   * @param callback
   */
  closeSocket (callback) {
    let l = this.socket.close()
    callback && callback(this.socket, l)
  }
}

/**
 * ************************ScoketService的Vuex状态*************************
 */
const ScoketService = {
  actions: {
    createdRunMonitor (a, url) {
      url = url || ''
      return new RunMonitor(url)
    },
    /**
     * 121.40.165.18:8088
     * 基于mqttws31.js创建webSocket服务
     * @param host
     * @param port
     * @param path
     * @param clientId
     * @constructor
     */
    createdPaho (a, params) {
      let [host, port, path, clientId] = [params.host, params.port || null, params.path || null, params.clientId || null]
      // console.log(host, port, path, clientId)
      if (path && !/^\//.test(path)) {
        path = '/' + path
      }
      return new Paho.MQTT.Client(host, Number(port), path, clientId)
    },
    createdMessage (a, str) {
      return new Paho.MQTT.Message(str)
    },
    createdRunMonitorSocket (a) {
      console.log(Api, 12211)
    }
  }
}

export default ScoketService

