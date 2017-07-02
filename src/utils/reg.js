/**
 * Created by ccd on 2017/7/1.
 * Copyright © 2017年 EJCloud. All rights reserved.
 */
export default class Reg {
  constructor () {
    this.degreesCelsius = /^[0-9]+[\℃]{1}$/
  }

  isDegreesCelsius (val) {
    let a = this.val || val
    return this.degreesCelsius.test(a)
  }
}
