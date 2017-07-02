<template>
  <div class='tap-box'>
    <nav class='nav'>
      <tab class='tap-fixed' :line-width='1' active-color="#178dff" v-model="index">
        <tab-item class="vux-center" :selected="demo === item" v-for="(item, index) in list"
                  @on-item-click="onItemClick(item)"
                  :key="index">{{item}}
        </tab-item>
      </tab>
    </nav>
    <!--tap内容-->
    <ul>
      <li v-if='index === 0'>
        <group class="settingChioce clearfix">
          <ul class="clearfix">
            <!--功率选择/档位选择-->
            <li v-for="(value,key,index) in data" v-if="index < 2">
              <div class="titlePower">
                <i></i><span>{{value.label}}</span>
              </div>
              <div class="powerNumber">
                <checker class='button-power' type='radio' @on-change='submit(value)' v-model="value.value"
                         default-item-class="button-power-default"
                         selected-item-class="button-power-selected">
                  <checker-item v-for="(item,i) in value.list" :key="i" :value="i">{{item}}</checker-item>
                </checker>
              </div>
            </li>
            <!--自定义档位-->
            <li>
              <div class="titlePower">
                <i></i><span>自定义档位</span>
              </div>
              <div class="customPower">
                <x-switch title="自定义档位" v-model="data.customizeStalls.list[0]"></x-switch>
                <p><span>自定义档位</span><i class="slider fr">滑块</i></p>
                <p><span>当前位值</span><i class="slider fr">88</i></p>
              </div>
              <div class="smallTitle">
                选择档位
              </div>
              <!--选择档位-->
              <ul class="nextChioce clearfix">
                <li><i>1</i><span>23</span>
                  <small class="fr fonSize">请输入当前档位值，范围0~255</small>
                </li>
                <li><i>2</i><span>23</span>
                  <small class="fr fonSize">请输入当前档位值，范围0~255</small>
                </li>
                <li><i>3</i><span>23</span>
                  <small class="fr fonSize">请输入当前档位值，范围0~255</small>
                </li>
                <li><i>4</i><span>23</span>
                  <small class="fr fonSize">请输入当前档位值，范围0~255</small>
                </li>
                <li><i>5</i><span>23</span>
                  <small class="fr fonSize">请输入当前档位值，范围0~255</small>
                </li>
                <li><i>6</i><span>23</span>
                  <small class="fr fonSize">请输入当前档位值，范围0~255</small>
                </li>
                <li><i>7</i><span>23</span>
                  <small class="fr fonSize">请输入当前档位值，范围0~255</small>
                </li>
                <li><i>8</i><span>23</span>
                  <small class="fr fonSize">请输入当前档位值，范围0~255</small>
                </li>
              </ul>
            </li>
            <!--锅具判断-->
            <li class="clearfix nextLine">
              <div class="titlePower clearfix">
                <i></i><span>锅具判断</span>
              </div>
              <p class="allLine"><span class="fl bigSize">锅具判断校准</span>
                <small class="fr">请输入校准值0~500</small>
              </p>
            </li>
            <!--温度开关-->
            <li>
              <div class="titlePower">
                <p><i></i><span>温度开关</span></p>
              </div>
              <p class="allLine"><span class="bigSize">温度开关使能</span></p>
            </li>
          </ul>
        </group>
      </li>
      <li v-if='index === 1'>
        <div class="tempsSetting">
          <ul class="tempsBox">
            <!--电压设定-->
            <li>
              <div class="titlePower">
                <i></i><span>电压设定</span>
              </div>
              <ul class="nextChioce clearfix whiteBg">
                <li><i>1</i><span>电压保护使能</span>
                  <small class="fr fonSize">滑块</small>
                </li>
                <li><i>2</i><span>高压</span>
                  <small class="fr fonSize">请输入当前档位值，范围0~255</small>
                </li>
                <li><i>3</i><span>低压</span>
                  <small class="fr fonSize">请输入当前档位值，范围0~255</small>
                </li>
                <li><i>4</i><span>校准</span>
                  <small class="fr fonSize">请输入当前档位值，范围0~255</small>
                </li>
              </ul>
            </li>
            <!--温度设定-->
            <li>
              <div class="titlePower">
                <i></i><span>温度设定</span>
              </div>
              <ul class="nextChioce clearfix whiteBg">
                <li><i>1</i><span>模块最高温度设定</span>
                  <small class="fr fonSize">请输入当前档位值，范围0~255</small>
                </li>
                <li><i>2</i><span>线盘温度保护点</span>
                  <small class="fr fonSize">请输入当前档位值，范围0~255</small>
                </li>
                <li><i>3</i><span>锅底温度保护点</span>
                  <small class="fr fonSize">请输入当前档位值，范围0~255</small>
                </li>
              </ul>
            </li>
            <!--其他设定-->
            <li>
              <div class="titlePower">
                <i></i><span>其他设定</span>
              </div>
              <ul class="nextChioce clearfix whiteBg">
                <li><i>1</i><span>恒功率使能</span>
                  <small class="fr fonSize">请输入当前档位值，范围0~255</small>
                </li>
                <li><i>2</i><span>起始电压</span>
                  <small class="fr fonSize">请输入当前档位值，范围0~255</small>
                </li>
                <li><i>3</i><span>缺相检测使能</span>
                  <small class="fr fonSize">请输入当前档位值，范围0~255</small>
                </li>
                <li><i>3</i><span>磁控开关复位使能</span>
                  <small class="fr fonSize">请输入当前档位值，范围0~255</small>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </li>
      <li v-if='index === 2'>
        <div class="displayer clearfix">
          <div class="screenBox clearfix">
            <button class="screenBtn">专模专款</button>
            <button class="smallBtn">应用</button>
          </div>
          <div class="screenBox clearfix">
            <button class="screenBtn">专模专款</button>
            <button class="smallBtn">应用</button>
          </div>
          <div class="screenBox clearfix">
            <button class="screenBtn">专模专款</button>
            <button class="smallBtn">应用</button>
          </div>
          <div class="screenBox clearfix">
            <button class="screenBtn">专模专款</button>
            <button class="smallBtn">应用</button>
          </div>
          <div class="screenBox clearfix">
            <button class="screenBtn">专模专款</button>
            <button class="smallBtn">应用</button>
          </div>
          <div class="screenBox clearfix">
            <button class="screenBtn">专模专款</button>
            <button class="smallBtn">应用</button>
          </div>
          <div class="screenBox clearfix">
            <button class="screenBtn">专模专款</button>
            <button class="smallBtn">应用</button>
          </div>
          <div class="screenBox clearfix">
            <button class="screenBtn">专模专款</button>
            <button class="smallBtn">应用</button>
          </div>
          <div class="screenBox clearfix">
            <button class="screenBtn">专模专款</button>
            <button class="smallBtn">应用</button>
          </div>
          <div class="screenBox clearfix">
            <button class="screenBtn">专模专款</button>
            <button class="smallBtn">应用</button>
          </div>
        </div>
      </li>
      <li v-if='index === 3'>
        <div class="argtSetting">
          <ul>
            <li>
              <div class="titlePower">
                <i></i><span>时间设定</span>
              </div>
              <ul class="nextChioce clearfix whiteBg">
                <li><i>1</i><span>授权工作时间</span>
                  <small class="fr fonSize">请输入当前档位值，范围0~255</small>
                </li>
                <li><i>2</i><span>上电时间</span>
                  <small class="fr fonSize">请输入当前档位值，范围0~255</small>
                </li>
                <li><i>3</i><span>工作时间</span>
                  <small class="fr fonSize">请输入当前档位值，范围0~255</small>
                </li>
              </ul>
            </li>
            <!--控制设定-->
            <li>
              <div class="titlePower">
                <i></i><span>时间设定</span>
              </div>
              <ul class="nextChioce clearfix whiteBg">
                <li><i>3</i><span>控制设定</span>
                  <small class="fr fonSize">滑块</small>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </li>
    </ul>
    <!--底部-->
    <div class="seting-footer" :class='{"isFooter":index === 3}'>
      <p class="upLine">华维科技</p>
      <p class="btmLine">联系习电话 ：1382389048</p>
    </div>
  </div>

</template>

<script>
  import {
    Group,
    Cell,
    Tab,
    TabItem,
    XHeader,
    Checker,
    CheckerItem,
    Flexbox,
    FlexboxItem,
    ColorPicker,
    XSwitch
  } from 'vux'

  const list = () => ['功能及档位', '电压及温度', '显示器选择', '高级设置']
  export default {
    components: {
      Group,
      Cell,
      Tab,
      TabItem,
      XHeader,
      Checker,
      CheckerItem,
      Flexbox,
      FlexboxItem,
      ColorPicker,
      XSwitch
    },
    name: 'Setting',
    data () {
      return {
        colos: ['#ccc'],
        msg: 'Hello World!',
        list: list(),
        index: 0,
        demo: '',
        transferObj: {
          title: '参数设置',
          isPreventGoBack: false
        },
        data: {
          power: {
            key: 20,
            list: [],
            value: 0,
            oldValue: 0,
            type: 'KW',
            isFlag: false,
            label: '功率选择'
          },
          stalls: {
            key: 21,
            list: ['5档', '5档+', '6档', '8档', '8档+', '10档'],
            value: 0,
            oldValue: 0,
            type: 'D',
            isFlag: false,
            label: '档位选择'
          },
          customizeStalls: {
            key: 22,
            list: [false],
            value: 0,
            oldValue: 0,
            type: 'D',
            isFlag: false,
            label: '档位选择'
          }
        }
      }
    },
    created () {
      this.$emit('transfer', this.transferObj)
      for (let i = 0; i < 9; i++) {
        let power = this.data.power
        power.list.push(i + 8 + power.type)
      }
    },
    methods: {
      onScrollBottom () {
        console.log(this.index)
      },
      onItemClick (item) {
        this.demo = item
      },
      getHeight () {
        return this.listH[this.index]
      },
      submit (item) {
        if (item.value === '') {
          item.value = item.oldValue
        }
        if (item.oldValue !== item.value) {
          item.oldValue = item.value
          console.log(item)
        }
      }
    },
    watch: {
      index: (val, oldVal) => {
        console.log(val, oldVal)
        if (val !== oldVal) {
        }
      }
    }
  }
</script>
<style lang="less">
  .tap-box {
    .vux-no-group-title {
      margin-top: 0 !important;
    }

  }
</style>
<style scoped lang='less'>
  /*功率和档位*/
  .settingChioce {
    background: #fff;
    width: 100%;
    font-size: 14px;
  }

  .titlePower {
    height: 33px;
    line-height: 33px;
    background: #ebebeb;
  }

  .titlePower i {
    width: 5px;
    height: 5px;
    background: #2490ff;
    border-radius: 50%;
    position: relative;
    top: -2px;
    margin: 0 5px 0 10px;
  }

  .titlePower span {
    color: #adaaaa;
  }

  .powerNumber {
    position: relative;
    .button-power {
      padding: 12.5px 17px;
      .button-power-default {
        text-align: center;
        height: 25px;
        background: #FFF;
        width: 70px;
        margin: 6px;
        border: 1px solid #2490ff;
        border-radius: 3px;
        line-height: 26px;
        font-size: 11px;
        &.button-power-selected {
          background: #2490ff;
          color: #FFF;
        }
      }
    }
  }

  .customPower p {
    height: 44px;
    line-height: 44px;
    font-size: 16px;
    margin-left: 21px;
    padding-right: 15px;
    border-bottom: 1px solid #ebebeb;
  }

  li .smallTitle {
    background: #ebebeb;
    height: 23px;
    line-height: 23px;
    color: #adaaaa;
    padding-left: 22px;
  }

  .nextChioce li {
    height: 44px;
    line-height: 44px;
    margin-left: 21px;
    padding-right: 15px;
    border-bottom: 1px solid #EBEBEB;
  }

  li small {
    color: #adaaaa;
  }

  .titlePower small {
    padding-right: 15px;
  }

  li .bigSize {
    font-size: 16px;
  }

  /*公共样式*/
  .seting-footer {
    position: relative;
    text-align: center;
    background: #ebebeb;
    padding: 80px 0 22px 0;
    color: #787676;
    p {
      font-size: 15px;
    }
  }

  .isFooter {
    position: fixed;
    bottom: 0;
    width: 100%;
  }

  .allLine {
    padding-left: 20px;
    height: 44px;
    line-height: 44px;
    padding-right: 15px;
  }

  .small {
    color: #adaaaa;
  }

  .Itag {
    width: 5px;
    height: 5px;
    background: #2490ff;
    border-radius: 50%;
    position: relative;
    top: -2px;
    margin: 0 0 17px 14px;
  }

  .bgCor {
    background: #ebebeb;
  }

  .whiteBg {
    background: #fff;
  }

  /*显示器选择*/
  .displayer {
    background: #ebebeb;
  }

  .screenBox {
    float: left;
    width: 120px;
    margin: 10px 0 10px 42px
  }

  .screenBox button {
    border: 1px solid #2c6afd;
    border-radius: 7px;
    color: #2c6afd;
    background: #ebebeb;
  }

  .screenBox .screenBtn {
    width: 120px;
    height: 80px;
  }

  .screenBox .smallBtn {
    width: 73px;
    height: 23px;
    margin: 20px 22px;
  }

  .tap-box {
    position: relative;
    margin-top: 46px;
  }

  .nav {
    position: relative;
    height: 35px;
    top: 0;
    .tap-fixed {
      position: fixed;
      top: 46px;
      height: 35px;
      width: 100%;
      z-index: 9999;
      .vux-center {
        line-height: 35px;
        font-size: 11px;
      }
    }
  }

  .scroller-box {
    top: 46px;
  }
</style>
