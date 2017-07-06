<template>
  <div class="runing">
    <div class="container clearfix">
      <div class="onGoing clearfix">
        <div class="_Image fl"></div>
        <div class="states fl">
          <p v-for='item in data.other'>{{item.label}}：<i>{{item.value + item.type}}</i></p>
        </div>
      </div>
      <!-- 显示温度-->
      <ul class="temps">
        <li class="clearfix" v-for='item in data.list'>
          <span class="fl">{{item.label}}</span>
          <span v-if='item.type === "T"' class="fr">t</span>
          <span v-if='item.type !== "T"' class="fr">{{item.value + item.type}}</span>
        </li>
      </ul>
    </div>
    <div class="run-footer">
      <p class="upLine">华维科技</p>
      <p class="btmLine">联系习电话 ：1382389048</p>
    </div>
  </div>
</template>

<script>
  import { CellFormPreview, Group, Cell } from 'vux'

  export default {
    components: {
      CellFormPreview,
      Group,
      Cell
    },
    data () {
      return {
        msg: 'Hello World!',
        transferObj: {
          title: '运行监控',
          isPreventGoBack: false
        },
        data: {
          other: {
            stalls: {
              key: 4,
              list: [false],
              value: '',
              type: 'V',
              label: '电压'
            },
            status: {
              key: 5,
              list: [false],
              value: '',
              type: '',
              label: '状态'
            }
          },
          list: [
            {
              key: 6,
              list: [false],
              value: '',
              type: 'V',
              label: '电压'
            },
            {
              key: 7,
              list: [false],
              value: '',
              type: 'KW',
              label: '机型'
            },
            {
              key: 8,
              list: [false],
              value: '',
              type: 'C',
              label: '线盘温度'
            },
            {
              key: 9,
              list: [false],
              value: '',
              type: 'C',
              label: '锅底温度'
            },
            {
              key: 10,
              list: [false],
              value: '',
              type: 'KHZ',
              label: '频率'
            },
            {
              key: 11,
              list: [false],
              value: '',
              type: 'A',
              label: '目标电流'
            },
            {
              key: 12,
              value: '',
              type: 'A',
              label: '实际电流'
            },
            {
              key: 13,
              value: '',
              type: 'A',
              label: '实际电流'
            },
            {
              key: 14,
              value: '',
              type: 'KHZ',
              label: '高频'
            },
            {
              key: 15,
              value: '',
              type: 'KHZ',
              label: '低频'
            },
            {
              key: 16,
              value: '',
              type: '',
              label: '相差位'
            },
            {
              key: 17,
              value: '',
              type: 'T',
              label: '工作时间'
            },
            {
              key: 18,
              value: '',
              type: '',
              label: '档位值'
            },
            {
              key: 19,
              value: '',
              type: 'KW',
              label: '火力'
            }
          ]
        }
      }
    },
    created () {
      this.$emit('transfer', this.transferObj)
    },
    methods: {}
  }
</script>

<style scoped lang='less'>
  .runing {
    padding-top: 46px;
  }

  .runingTitle {
    text-align: center;
    color: #FBF9FE;
    font-size: 20px;
    padding: 30px 0;
    background: #2c6afd;
  }

  .container {
    background: #ebebeb;
  }

  .onGoing {
    background: #fff;
    padding: 7.5px 0;
    ._Image {
      width: 114px;
      height: 85px;
      background: #fff url('../../static/libs/images/i-con.png') no-repeat -677px -117px;
      background-size: 960px 840px;
      display: inline-block;
    }
  }

  .states {
    position: relative;
    left: 20px;
  }

  .states p {
    height: 20px;
    line-height: 20px;
    font-size: 20px;
    padding-top: 20px;
  }

  .states p i {
    color: #2c6afd;
  }

  .temps {
    background: #fff;
    margin-top: 10px;
    > li {
      height: 45px;
      line-height: 45px;
      padding: 0 10px;
      border-bottom: 1px solid #EBEBEB;
    }
  }

  .run-footer {
    height: 53px;
    text-align: center;
    padding-top: 80px;
    p {
      color: #999;
      font-size: 15px;
      line-height: 20px;
    }
  }

</style>
