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

function startSocket (url) {
  return new Promise((resolve, reject) => {
    let socket = new WebSocket(url) || 0
    if (socket.readyState === 1 || socket.readyState === 0) {
      resolve(socket)
    } else {
      reject(socket)
    }
  })
}
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
 * 运行监控Socker服务
 */
class RunMonitor {
  constructor (url, options = {}, isKey = true) {
    let param = querystring.stringify(Api.paramPath)
    this.secretKey = ''
    if (isKey && param) {
      this.secretKey = '/?' + param
    }
    this.url = url
    this.promise = startSocket(url + this.secretKey)
    this.socket = null
    this.Error = null
    this.open = false
  }

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

// 开启通道
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

// 一个用于消息事件的事件监听器
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

// 发送数据
  sendDate (a, callback) {
    if (!this.open) {
      console.log('Socket通道未开启')
      return this
    }
    this.socket.send(a)
    return this
  }

  closeSocket (callback) {
    let l = this.socket.close()
    callback && callback(this.socket, l)
  }
}
const ScoketService = {
  actions: {
    createdRunMonitor (a, url) {
      url = url || Api.RunMonitor.url
      return new RunMonitor(url)
    }
  }
}

export default ScoketService

