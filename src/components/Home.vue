<template>
  <div class="byFurnace">
    <div class="byControl">
      <div class="_Image"></div>
      <div class="fonTitle">
        <p class="account ">
          商用电磁炉
        </p>
        <p class="account ">
          智能控制系统
        </p>
      </div>
      <div class="buttonBox">
        <router-link to="/RunMonitor">运行监控</router-link>
        <router-link to="/Control">智能控制</router-link>
        <router-link to="/Setting">参数设置</router-link>
      </div>
    </div>
    <div class="footer">
      <p class="upLine">华维科技</p>
      <p class="btmLine">联系习电话 ：1382389048</p>
    </div>
  </div>
</template>

<script>
  import { Group, Cell } from 'vux'

  export default {
    components: {
      Group,
      Cell
    },
    data () {
      return {
        socketService: null,
        msg: 'Hello World!',
        setData: null,
        transferObj: {
          title: '首页',
          isPreventGoBack: true
        }
      }
    },
    created () {
      this.$emit('transfer', this.transferObj)
      let _this = this
      console.log(this.__getUrlQuerystring, 111)
      let param = {
        host: 'iot.ej-cloud.com',
        port: '8083 ',
        path: _this.__getUrlQuerystring ? _this.__getUrlQuerystring.Obj.topic : '/',
        clientId: _this.__getUrlQuerystring ? _this.__getUrlQuerystring.Obj.did : ''
      }
//      this.$store.dispatch('createdPaho', param).then((res) => {
//        res.onMessageArrived = function (data) {
//          console.log(data, 111)
//        }
//        res.onConnectionLost = function (data) {
//          console.log(data, 222)
//        }
//        res.connect({
//          onSuccess: function () {
//            _this.socketService = res
//            _this.sockerSuccess(res)
//          }
//        })
//
//      })
      if (!this.__getUrlQuerystring) {
        this.$store.dispatch('createdRunMonitorSocket').then((res) => {

        })
      }
    },
    methods: {
      sockerSuccess (res) {
        console.log('连接建立成功', res)
        this.messageSend(JSON.stringify({ss: 2}))
      },
      messageSend (json) {
        let _this = this
        this.$store.dispatch('createdMessage', json).then(res => {
          let message = res
          message.destinationName = '/World'
          if (_this.socketService) {
            _this.socketService.send(message)
          }
        })
      }
    }
  }
</script>
<style>
</style>
<style scoped lang='less'>
  .byFurnace {
    background: #2c6afd;
    padding-top: 80px;
  }

  .byControl {
    width: 50%;
    margin: 0 auto;
  }

  .byControl ._Image {
    margin: 0 auto;
    width: 187.5px;
    height: 105px;
    background: url('../../static/libs/images/i-con.png') no-repeat -450px -102px;
    background-size: 960px 840px;
  }

  .fonTitle {
    margin-top: 10px;
    font-family: monospace
  }

  .fonTitle p {
    font-size: 25px;
    color: #fff;
    text-align: center;
    line-height: 25px;
    padding: 5px 0;
  }

  .buttonBox {
    padding: 37.5px 0;
    a {
      display: block;
      width: 120px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      letter-spacing: 2px;
      background: #2490ff;
      border-radius: 12px;
      border: none;
      margin: 12.5px auto;
      color: #fff;
      font-size: 18px;
    }
  }

  .buttonBox button i {
    color: red;
    font-size: 20px;
  }

  .footer {
    bottom: 20px;
    padding: 55px 0 !important;
    text-align: center;
    font-size: 15px;
    p {
      color: #fff;
    }
  }

  .byControl .tagjump {
    color: #fff;
    font-size: 30px;
    font-weight: 200;
    position: absolute;
    top: 35px;
    left: 18px;
  }

</style>
