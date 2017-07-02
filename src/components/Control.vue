<template>
  <div class="bgcolor">
    <div class="bgcolor-header">
      <div class="logo"></div>
      <ul class="control_info">
        <li>当前档位：<span>60</span></li>
        <li>运行温度：<span>95℃</span></li>
        <li>运行时间：<span>1小时50分</span></li>
      </ul>
    </div>
    <div class="quarantine"></div>
    <div style="display: block;"></div>
    <group class="operation">
      <cell title='选择模式' class='item'>
        <checker class='from-box' type='radio' @on-change='submit(backData.SelectMode)'
                 v-model="backData.SelectMode.value"
                 default-item-class="from-button"
                 selected-item-class="from-button-selected">
          <checker-item v-for="(item,i) in backData.SelectMode.list" :key="i" :value="i">{{item}}
          </checker-item>
        </checker>
      </cell>
      <!--v-set-suffix="{data:backData.setTemperature,elName:'input'}"-->
      <x-input title="设置温度" :type='"number"' placeholder="请选择范围值 0~300" placeholder-align='right'
               v-model='backData.setTemperature.value' text-align='right' @on-enter='submit(backData.setTemperature)'
               @on-blur='submit(backData.setTemperature)'
               :max="3"></x-input>
      <datetime class='item' :format="'HH:mm'" :title="'预约时间'" @on-change='submit(backData.Appointment)'
                v-model="backData.Appointment.value"
                placeholder="请选择时间">
      </datetime>
      <datetime class='item' :format="'HH:mm'" :title="'定时时间'" @on-change='submit(backData.TimingTime)'
                v-model="backData.TimingTime.value"
                placeholder="请选择时间"></datetime>
      <x-number :title="'调整档位'" v-model="backData.AdjustStalls.value" :min="0" :max="5"
                @on-change="submit(backData.AdjustStalls)"></x-number>
    </group>
    <x-button class="suspend" type="primary">开始</x-button>
  </div>
</template>
<script>
  import {
    Group,
    Cell,
    DatetimeRange,
    XButton,
    Flexbox,
    FlexboxItem,
    Checker,
    CheckerItem,
    Datetime,
    PopupPicker,
    XNumber,
    XInput
  } from 'vux'

  export default {
    components: {
      Group,
      Cell,
      DatetimeRange,
      XButton,
      Flexbox,
      FlexboxItem,
      Checker,
      CheckerItem,
      Datetime,
      PopupPicker,
      XNumber,
      XInput
    },
    data () {
      return {
        socketRunMonitor: {}, // SocketService实例
        backData: {
          Appointment: {
            key: 55,
            value: '',
            oldValue: '',
            type: 'T',
            isFlag: false,
            label: '预约时间'
          },
          TimingTime: {
            key: 55,
            value: '',
            oldValue: '',
            type: 'T',
            isFlag: false,
            label: '定时时间'
          },
          setTemperature: {
            key: 55,
            value: 0,
            oldValue: 0,
            type: 'C',
            isFlag: false,
            label: '设置温度'
          },
          AdjustStalls: {
            key: 55,
            value: 0,
            oldValue: 0,
            type: '',
            isFlag: false,
            label: '调整档位'
          },
          SelectMode: {
            key: 52,
            list: ['煎炸', '蒸煮', '手动'],
            value: 0,
            oldValue: 0,
            type: '',
            isFlag: false,
            label: '选择模式'
          }
        },
        data: {
          modeDemo: null,
          list: [
            {
              key: 52,
              value: '',
              type: '',
              label: '煎炸'
            },
            {
              key: 53,
              value: '',
              type: '',
              label: '蒸煮'
            },
            {
              key: 54,
              value: '',
              type: '',
              label: '手动'
            }
          ]
        },
        transferObj: {
          title: '智能控制',
          isPreventGoBack: false
        }
      }
    },
    created () {
      this.$emit('transfer', this.transferObj)
//      this.data.modeDemo = this.data.mode[0]
      // 进入页面开启SocketService
      this.openSocket()
    },
    methods: {
      onChange (val) {
        console.log('change', val)
      },
      submit (item) {
        console.log(item)
        if (item) {
          if (item.value === '') {
            item.value = item.oldValue
          }
          if (item.oldValue !== item.value) {
            item.oldValue = item.value
            console.log(item)
            this.send(item.value)
          }
        }
      },
      formatFilter (value, name) {
        return value[0] + value[1]
      },
      isTypeReg (a) {
        this.backData.setTemperature.isFlag = false
        return {valid: false, msg: '错误信息'}
      },
      /**
       * 开启数据通道并实时接收数据
       * @private
       */
      openSocket () {
        let _this = this
        /**
         * 实时接收数据
         */
        this.$store.dispatch('createdRunMonitor', 'ws://123.207.167.163:9010/ajaxchattest').then((res) => {
          _this.socketRunMonitor = res.receive(() => {
            _this.socketRunMonitor.message(data => {
              console.log(data.data.data, 2222)
            })
          })
        })
      },
      /**
       * 发送数据
       * @param a 需要发送的数据（未处理）
       */
      send (a) {
        this.socketRunMonitor.sendDate(a)
      }
    },
    beforeDestroy () {
      /**
       * 离开页面注销SocketService
       */
      this.socketRunMonitor.closeSocket()
    }
  }
</script>
<style>
  .weui-cell {
    padding: 7px 19px !important;
    height: 30px !important;
    line-height: 30px !important;
    font-size: 15px !important;
  }
</style>
<style scoped lang='less'>
  .bgcolor {
    padding-top: 46px;
    .from-box {
      display: inline-block;
      height: 100%;
      width: 100%;
      .from-button {
        margin-left: 10px;
        width: 45px;
        height: 20px;
        line-height: 20px;
        font-size: 12px;
        border: 1px solid #2369b2;
        color: #2369b2;
        border-radius: 3.5px;
        text-align: center;
        &.from-button-selected {
          border: 1px solid #fff;
          color: #fff;
          background: #1965b2;
        }
      }
    }
    .bgcolor-header {
      height: 100px;
      padding: 10px 18px;
      background: #fff;
      .logo {
        float: left;
        width: 114px;
        height: 85px;
        background: #fff url(/static/libs/images/i-con.png) no-repeat -677px -116px;
        background-size: 960px 840px;
        display: inline-block;
      }
    }
    .control_info {
      font-size: 16px;
      float: left;
      li {
        margin-left: 32px;
        margin-bottom: 7px;
        list-style: none;
      }
    }
    .quarantine {
      float: left;
      height: 9px;
      width: 100%;
      background: #ebebeb;

    }
    .operation {
      display: block;
      .item {
        list-style: none;
        padding: 7px 19px;
        background: #fff;
        font-size: 15px;
        height: 30px;
        line-height: 30px;
        &:nth-child(3) input {
          width: 70px;
        }
        &:nth-child(4) input {
          width: 70px;
        }
        &:nth-child(5) {
          span {
            width: 29px;
            height: 14px;
            border: 1px solid #999999;
            border-radius: 5px;
            margin-top: 5px;
            margin-left: 15px;
            text-align: center;
            line-height: 14px;
            color: #999999;
          }
        }
        span {
          float: right;
          margin-left: 5px;
          width: 45px;
          height: 20px;
          border-radius: 5px;
          border: 1px solid #2490ff;
          font-size: 12px;
          color: #2490ff;
          text-align: center;
          line-height: 20px;
          &:nth-child(3) {
            background: #2490ff;
            color: white;

          }
        }
        input {
          float: right;
          outline: none;
          border: 0px;
          width: 130px;
        }
      }
      .item-popup {
        font-size: 15px;
      }
    }
    .suspend {
      width: 200px;
      height: 35px;
      background: #2490ff;
      text-align: center;
      line-height: 35px;
      margin: 21px 0px 0px 87px;
      color: white;
      font-size: 17px;
      border-radius: 5px;
    }
  }
</style>
