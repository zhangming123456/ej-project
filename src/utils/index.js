/**
 * Created by ccd on 2017/7/1.
 * Copyright © 2017年 EJCloud. All rights reserved.
 */
import Reg from './reg'

class Utils extends Reg {
  constructor (val, ...args) {
    super(...args)
    this.val = val || ''
  }

  hasClass (obj, cls) {
    let a = this.val || obj
    return a.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
  }

  addClass (obj, cls) {
    let a = this.val || obj
    if (!this.hasClass(a, cls)) a.className += ' ' + cls
    return this
  }

  removeClass (obj, cls) {
    let a = this.val || obj
    if (this.hasClass(a, cls)) {
      var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
      a.className = a.className.replace(reg, ' ')
    }
    return this
  }

  toggleClass (obj, cls) {
    let a = this.val || obj
    if (this.hasClass(a, cls)) {
      this.removeClass(a, cls)
    } else {
      this.addClass(a, cls)
    }
    return this
  }

  formatValueFunction (val) {
    return val.replace(/:/g, '小时') + '分钟'
  }

  isNumber (val) {
    return this.numberReg.test(val)
  }

  isString (val) {
    return typeof val === 'string'
  }

  isMaxNum (val, max) {
    return this.isNumber(val) && val <= max
  }

  strSplit (str, start, end) {
    if (!this.isString(str)) {
      return
    }
    let a = str.split('')
    if (start >= 0) {
      return a.slice(start, end).join('')
    } else {
      return a.slice(start).join('')
    }
  }

  unStrSplit (str, end) {
    return this.strSplit(str, 0, end)
  }
}

export default new Utils()
