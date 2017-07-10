<template>
  <div class="bgcolor">
    <div class="bgcolor-header">
      <div class="logo"></div>
      <ul class="control_info">
        <li>当前档位：<span></span></li>
        <li>运行温度：<span>95℃</span></li>
        <li>运行时间：<span>1小时50分</span></li>
      </ul>
    </div>
    <div class="quarantine"></div>
    <div style="display: block;"></div>
    <group class="operation nextChioce">
      <cell title='选择模式' class='item'>
        <checker class='from-box' type='radio' @on-change='onButtonEvent(backData.SelectMode)'
                 v-model="backData.SelectMode.value"
                 default-item-class="from-button"
                 selected-item-class="from-button-selected">
          <checker-item v-for="(item,i) in backData.SelectMode.list" :key="i" :value="i">{{item}}
          </checker-item>
        </checker>
      </cell>
      <!--@on-change='onChange(backData.setTemperature)'-->
      <x-input title="设置温度" placeholder="请选择范围值 0~300"
               placeholder-align='right'
               text-align='right' :is-type='max300'
               v-model='backData.setTemperature.value'
               @on-change='onChange(backData.setTemperature)'
               @on-enter='submit(backData.setTemperature)'
               @on-blur='submit(backData.setTemperature)' :max='3'></x-input>
      <datetime class='item' :format="'HH:mm'" :title="'预约时间'" @on-change='dateTimeSubmit(backData.Appointment)'
                :display-format="formatValueFunction"
                v-model="backData.Appointment.value"
                placeholder="请选择时间">
      </datetime>
      <datetime class='item' :format="'HH:mm'" :title="'定时时间'" @on-change='dateTimeSubmit(backData.TimingTime)'
                :display-format="formatValueFunction"
                v-model="backData.TimingTime.value"
                placeholder="请选择时间"></datetime>
      <x-number button-style='round' :title="'调整档位'" v-model="backData.AdjustStalls.value" :min="0" :max="5"
                @on-change="onButtonEvent(backData.AdjustStalls)"></x-number>
    </group>
    <!--:class='{"suspend-selected":backData.StatusButton.value==1}'-->
    <x-button class="suspend" :class='{"suspend-selected":backData.StatusButton.value==1}'
              @click.native='buttonSubmit(backData.StatusButton,$event)'>
      {{backData.StatusButton.list[backData.StatusButton.value]}}
    </x-button>
  </div>
</template>
<script>
  import Utils from '../utils'

  export default {
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
            typeStr: 'number',
            type: 'C',
            max: 300,
            min: 0,
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
          },
          StatusButton: {
            key: 56,
            list: ['开始', '暂停'],
            value: 0,
            oldValue: 0,
            type: '',
            isFlag: false,
            label: '待机状态'
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
      this.$emit('transfer', this.transferObj)//子传父
      // 进入页面开启SocketService
      this.openSocket()
    },
    methods: {
      // on-change事件
      onChange (item) {
        item.isFlag = Utils.isMaxNum(item.value, item.max)
      },
      // 按钮触发事件
      onButtonEvent (item) {
        if (item) {
          if (item.value === '') {
            item.value = item.oldValue
          } else if (item.oldValue !== item.value) {
            item.isFlag = true
            this.submit(item)
          }
        }
      },
      // 时间选择器提交事件
      dateTimeSubmit (item) {
        item.isFlag = true
        this.submit(item)
      },
      // 按钮提交事件
      buttonSubmit (item) {
        if (item.value) {
          item.value = 0
        } else {
          item.value = 1
        }
        item.isFlag = true
        this.submit(item)
      },
      // 表单提交事件
      submit (item) {
        console.log(arguments, 'submit')
        if (item.isFlag) {
          item.isFlag = false
          item.oldValue = item.value
          this.send(item.value)
          console.log('发送数据')
        }
        return false
      },
      max300: function (value) {
//        console.log(value, 2833)
        return {
          valid: /[0-9]+/.test(value) && value <= 300 && value >= 0,
          msg: '错误信息'
        }
      },
      formatFilter (value) {
        return value[0] + value[1]
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
        this.$store.dispatch('createdRunMonitor', 'ws://iot.ej-cloud.com:8083/mqtt').then((res) => {
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
      },
      formatValueFunction (value) {
        return Utils.formatValueFunction(value)
      }
    }
    ,
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
        background: #fff url('../../static/libs/images/i-con.png') no-repeat -677px -116px;
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
    .nextChioce {
      .item {
        padding: 5.5px 15px 5.5px 23px;
        height: 32px;
        line-height: 32px;
        font-size: 13px;
        .item-input {
          height: 32px;
          text-align: right;
          width: 200px;
          padding-right: 0 !important;
          font-size: 12.5px !important;
          color: #000;
        }
      }
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
    .suspend-selected {
      background: #6bff2b;
    }
  }
</style>
