<template>
  <div id="app">
    <x-header class='header' :left-options="{backText: '',preventGoBack:transferObj.isPreventGoBack}"
              :title="transferObj.title"></x-header>
    <router-view @transfer='transferFun'></router-view>
    <div class="footer" v-if='transferObj.title === "智能控制"'>
      <p class="upLine">华维科技</p>
      <p class="btmLine">联系习电话 ：1382389048</p>
    </div>
  </div>
</template>

<script>
//  import { XHeader } from 'vux'

  export default {
//    components: {
//      XHeader
//    },
    name: 'app',
    data () {
      return {
        data: {},
        transferObj: {
          title: '',
          isPreventGoBack: false
        }
      }
    },
    created () {
      console.log(this.__getUrlQuerystring, 1122)
      var _this = this
      if (!(this.__getUrlQuerystring && this.__getUrlQuerystring.Obj && this.__getUrlQuerystring.Obj.token)) {
        this.$vux.alert.show({
          title: '提示',
          content: '用户未登录',
          onShow () {
//            _this.$router.go('baidu.com')
          },
          onHide () {
//            _this.$router.go(-1) // 没有token值 用户未登录跳回上一个页面
          }
        })
      }
    },
    methods: {
      transferFun (a) {
        console.log(a)
        this.transferObj = a
      }
    }
  }
</script>
<style lang='less'>
  @import '~vux/src/styles/reset.less';

  body {
    background-color: #ebebeb;
    font-size: 15px;
  }

  #app {
    width: 100%;
    height: 100%;
    .header {
      position: fixed !important;
      top: 0;
      width: 100%;
      background-color: #178dff !important;
      z-index: 9999;
      .vux-header-left .left-arrow:before {
        border-color: #fff !important;
      }
    }

    .footer {
      position: relative;
      width: 100%;
      text-align: center;
      padding-top: 140px;
      color: #999;
      p {
        font-size: 15px;
      }
    }
  }

  /*温度input样式*/
  .suffix-temperature {
    position: relative;
    padding-right: 17px;
    font-size: 15px;
    &:before {
      content: '℃';
      position: absolute;
      right: 0;
    }
  }
</style>
