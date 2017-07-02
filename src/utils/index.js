/**
 * Created by ccd on 2017/7/1.
 * Copyright © 2017年 EJCloud. All rights reserved.
 */
import Reg from './reg'

class Utils extends Reg {
  constructor (val, ...args) {
    super(...args)
    this.val = val
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
}

export default (val) => {
  return new Utils(val)
}
