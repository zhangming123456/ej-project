<template>
  <div id="tap-setting" class='tap-box'>
    <nav class='nav'>
      <tab class='tap-fixed' :line-width='1' active-color="#178dff" v-model="index">
        <tab-item class="vux-center" :selected="demo === item" v-for="(item, index) in list"
                  @on-item-click="onItemClick(item)"
                  :key="index">{{item}}
        </tab-item>
      </tab>
    </nav>
    <!--tap内容-->
    <ul class="tap-connet">
      <li v-if='index === 0'>
        <group class="settingChioce clearfix">
          <ul class="clearfix">
            <!--功率选择/档位选择-->
            <li v-for="(value,key,index) in data" v-if="index < 2">
              <div class="titlePower">
                <i></i><span>{{value.label}}</span>
              </div>
              <div class="powerNumber">
                <checker class='button-power' type='radio' @on-change='onButtonEvent(value)' v-model="value.value"
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
                <x-switch class="item" title="自定义档位" v-model="data.customizeStalls.list[0]"
                          @on-change='buttonSubmit(data.customizeStalls)'></x-switch>
                <x-input class="item" title="当前档位值" :disabled="true"
                         v-model="data.customizeStalls.value" :text-align="'right'"></x-input>
              </div>
              <div class="smallTitle">
                选择档位
              </div>
              <!--选择档位-->
              <group class="nextChioce clearfix">
                <div v-for="(v,i) in data.SelectGear">
                  <cell class="item" :title='i+1'>
                    <x-input class="item-input" placeholder="请输入当前档位值，范围0~255"
                             placeholder-align='right'
                             text-align='right' novalidate :icon-type='v.iconType'
                             v-model='v.value'
                             @on-change='onChange(v)'
                             @on-enter='submit(v)'
                             @on-blur='submit(v)'
                             :max="3"></x-input>
                  </cell>
                </div>
              </group>
            </li>
            <!--锅具判断-->
            <li class="clearfix nextLine customPower">
              <div class="titlePower clearfix">
                <i></i><span>{{data.PotToJudge.label}}</span>
              </div>
              <group style='position: relative'>
                <cell class="item" :title="data.PotToJudge.label+'校准'">
                  <x-input class="item-input" placeholder="请输入当前档位值，范围0~500"
                           placeholder-align='right'
                           v-model='data.PotToJudge.value'
                           novalidate :icon-type='data.PotToJudge.iconType'
                           @on-change='onChange(data.PotToJudge)'
                           @on-enter='submit(data.PotToJudge)'
                           @on-blur='submit(data.PotToJudge)'
                           :max="3"></x-input>
                </cell>
              </group>
            </li>
            <!--温度开关-->
            <li class="customPower">
              <div class="titlePower">
                <p><i></i><span>温度开关</span></p>
              </div>
              <x-switch class="item" title="温度开关使能" v-model="data.TemperatureSwitches.list[0]"
                        @on-change='buttonSubmit(data.TemperatureSwitches)'></x-switch>
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
              <group class="nextChioce clearfix">
                <x-switch class="item" title="电压保护使能" v-model="data.VoltageSetting.value"
                          @on-change='buttonSubmit(data.VoltageSetting)'></x-switch>
                <div v-for="(v,i) in data.VoltageSetting">
                  <cell class="item" v-if="i > 0" :title='v.label'>
                    <x-input class="item-input" placeholder="请输入电压值，范围0~500"
                             placeholder-align='right'
                             novalidate :icon-type='v.iconType'
                             v-model='v.value' text-align='right'
                             @on-change='onChange(v)'
                             @on-enter='submit(v)'
                             @on-blur='submit(v)'
                             :max="3" :min='1'></x-input>
                  </cell>
                </div>

              </group>
            </li>
            <!--温度设定-->
            <li>
              <div class="titlePower">
                <i></i><span>温度设定</span>
              </div>
              <group class="nextChioce clearfix">
                <cell class="item" :title='data.TemperatureSetting[0].label'>
                  <x-input class="item-input" placeholder="请输入温度值，范围0~100"
                           placeholder-align='right'
                           v-model='data.TemperatureSetting[0].value' text-align='right'
                           novalidate :icon-type='data.TemperatureSetting[0].iconType'
                           @on-change='onChange(data.TemperatureSetting[0])'
                           @on-enter='submit(data.TemperatureSetting[0])'
                           @on-blur='submit(data.TemperatureSetting[0])'
                           :max="3"></x-input>
                </cell>
                <div v-for="(v,i) in data.TemperatureSetting">
                  <cell class="item" v-if="i > 0" :title='v.label'>
                    <x-input class="item-input" placeholder="请输入温度值，范围0~300"
                             placeholder-align='right'
                             v-model='v.value' text-align='right'
                             novalidate :icon-type='v.iconType'
                             @on-change='onChange(v)'
                             @on-enter='submit(v)'
                             @on-blur='submit(v)'
                             :max="3"></x-input>
                  </cell>
                </div>
              </group>
            </li>
            <!--其他设定-->
            <li>
              <div class="titlePower">
                <i></i><span>其他设定</span>
              </div>
              <!--OtherSettings-->
              <group class="nextChioce clearfix whiteBg">
                <x-switch class="item" title="恒功率使能" v-model="data.OtherSettings[0].value"
                          @on-change='buttonSubmit(data.OtherSettings[0])'></x-switch>
                <cell class="item" :title='data.OtherSettings[1].label'>
                  <x-input class="item-input" placeholder="请输入电压值，范围0~500"
                           placeholder-align='right'
                           v-model='data.OtherSettings[1].value' text-align='right'
                           novalidate :icon-type='data.OtherSettings[1].iconType'
                           @on-change='onChange(data.OtherSettings[1])'
                           @on-enter='submit(data.OtherSettings[1])'
                           @on-blur='submit(data.OtherSettings[1])'
                           :max='3'></x-input>
                </cell>
                <x-switch class="item" title="缺相检测使能" v-model="data.OtherSettings[2].value"
                          @on-change='buttonSubmit(data.OtherSettings[2])'></x-switch>
                <x-switch class="item" title="磁控开关复位使能" v-model="data.OtherSettings[3].value"
                          @on-change='buttonSubmit(data.OtherSettings[3])'></x-switch>
              </group>
            </li>
          </ul>
        </div>
      </li>
      <li v-if='index === 2'>
        <!--:style='"background-position: "+data.DisplaySelection[0].list[i][0]+"px "+data.DisplaySelection[0].list[i][1]+"px"'-->
        <ul class="displayer clearfix powerNumber button-box">
          <li class="clearfix">
            <checker class='button-display clearfix' type='radio'
                     @on-change='onButtonEvent(data.DisplaySelection[0])'
                     v-model="data.DisplaySelection[0].value"
                     default-item-class="button-power-default button-display-default"
                     selected-item-class="button-power-selected">
              <div class='screenBox button-power' v-for="(item,i) in 10">
                <div class="button-btn screenBtn"></div>
                <checker-item :key="i" :value="i">{{data.DisplaySelection[0].label}}</checker-item>
              </div>
            </checker>
          </li>
        </ul>
      </li>
      <li v-if='index === 3'>
        <div class="argtSetting">
          <ul>
            <li>
              <div class="titlePower">
                <i></i><span>时间设定</span>
              </div>
              <group class="nextChioce clearfix whiteBg">
                <cell class="item" :title='data.TimeSetting[0].label'>
                  <x-input class="item-input" placeholder="请输入时间，范围0 ~ 9999小时"
                           placeholder-align='right' typeof='number'
                           v-model='data.TimeSetting[0].value' text-align='right'
                           novalidate :icon-type='data.TimeSetting[0].iconType'
                           @on-change='onChange(data.TimeSetting[0])'
                           @on-enter='submit(data.TimeSetting[0])'
                           @on-blur='submit(data.TimeSetting[0])'
                           :max='4'></x-input>
                </cell>
                <datetime class="item" v-model="data.TimeSetting[1].value" format="HH:mm"
                          :display-format="formatValueFunction"
                          @on-change="dateTimeSubmit(data.TimeSetting[1])"
                          :title="data.TimeSetting[1].label"></datetime>
                <datetime class="item" v-model="data.TimeSetting[2].value" format="HH:mm"
                          :display-format="formatValueFunction"
                          @on-change="dateTimeSubmit(data.TimeSetting[2])"
                          :title="data.TimeSetting[2].label"></datetime>
              </group>
            </li>
            <!--控制设定-->
            <li>
              <!--ControlSettings-->
              <div class="titlePower">
                <i></i><span>控制设定</span>
              </div>
              <group class="nextChioce clearfix whiteBg">
                <x-switch class="item" title="控制设定" v-model="data.ControlSettings[0].value"
                          @on-change='buttonSubmit(data.ControlSettings[0])'></x-switch>
              </group>
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
  import Utils from '../utils'

  const list = () => ['功能及档位', '电压及温度', '显示器选择', '高级设置']
  export default {
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
          },
          SelectGear: [
            {
              key: 23,
              list: [],
              value: 0,
              oldValue: 0,
              type: '',
              max: 255,
              min: 0,
              iconType: '',
              isFlag: false,
              label: '选择档位'
            },
            {
              key: 24,
              list: [],
              value: 0,
              oldValue: 0,
              type: '',
              max: 255,
              min: 0,
              iconType: '',
              isFlag: false,
              label: '选择档位'
            },
            {
              key: 25,
              list: [],
              value: 0,
              oldValue: 0,
              type: '',
              max: 255,
              min: 0,
              iconType: '',
              isFlag: false,
              label: '选择档位'
            },
            {
              key: 26,
              list: [],
              value: 0,
              oldValue: 0,
              type: '',
              max: 255,
              min: 0,
              iconType: '',
              isFlag: false,
              label: '选择档位'
            },
            {
              key: 27,
              list: [],
              value: 0,
              oldValue: 0,
              type: '',
              max: 255,
              min: 0,
              iconType: '',
              isFlag: false,
              label: '选择档位'
            },
            {
              key: 28,
              list: [],
              value: 0,
              oldValue: 0,
              type: '',
              max: 255,
              min: 0,
              iconType: '',
              isFlag: false,
              label: '选择档位'
            },
            {
              key: 29,
              list: [],
              value: 0,
              oldValue: 0,
              type: '',
              max: 255,
              min: 0,
              iconType: '',
              isFlag: false,
              label: '选择档位'
            },
            {
              key: 30,
              list: [],
              value: 0,
              oldValue: 0,
              type: '',
              max: 255,
              min: 0,
              iconType: '',
              isFlag: false,
              label: '选择档位'
            }
          ],
          PotToJudge: {
            key: 32,
            list: [],
            value: '',
            oldValue: '',
            type: '',
            max: 500,
            min: 0,
            iconType: '',
            isFlag: false,
            label: '锅具判断'
          },
          TemperatureSwitches: {
            key: 31,
            list: [false],
            value: 0,
            oldValue: 0,
            type: 'D',
            isFlag: false,
            label: '档位选择'
          },
          VoltageSetting: [
            {
              key: 33,
              list: [],
              value: false,
              oldValue: false,
              type: '',
              max: 500,
              min: 0,
              iconType: '',
              isFlag: false,
              label: '电压保护使能'
            },
            {
              key: 34,
              list: [],
              value: '',
              oldValue: '',
              type: '',
              max: 500,
              min: 0,
              iconType: '',
              isFlag: false,
              label: '电压'
            },
            {
              key: 35,
              list: [],
              value: '',
              oldValue: '',
              type: '',
              max: 500,
              min: 0,
              iconType: '',
              isFlag: false,
              label: '低压'
            },
            {
              key: 36,
              list: [],
              value: '',
              oldValue: '',
              type: '',
              max: 500,
              min: 0,
              iconType: '',
              isFlag: false,
              label: '校准'
            }
          ],
          TemperatureSetting: [
            {
              key: 37,
              list: [],
              value: '',
              oldValue: '',
              type: '',
              max: 100,
              min: 0,
              iconType: '',
              isFlag: false,
              label: '模块最高温度设定'
            },
            {
              key: 38,
              list: [],
              value: '',
              oldValue: '',
              type: '',
              max: 300,
              min: 0,
              iconType: '',
              isFlag: false,
              label: '线盘温度保护点'
            },
            {
              key: 39,
              list: [],
              value: '',
              oldValue: '',
              type: '',
              max: 300,
              min: 0,
              iconType: '',
              isFlag: false,
              label: '锅底温度保护点'
            }
          ],
          OtherSettings: [
            {
              key: 40,
              list: [],
              value: false,
              oldValue: false,
              type: '',
              max: 500,
              min: 0,
              iconType: '',
              isFlag: false,
              label: '恒功率使能'
            },
            {
              key: 41,
              list: [],
              value: '',
              oldValue: '',
              type: '',
              max: 500,
              min: 0,
              iconType: '',
              isFlag: false,
              label: '起始电压'
            },
            {
              key: 42,
              list: [],
              value: false,
              oldValue: false,
              type: '',
              max: 500,
              min: 0,
              iconType: '',
              isFlag: false,
              label: '缺相检测使能'
            },
            {
              key: 43,
              list: [],
              value: false,
              oldValue: false,
              type: '',
              max: 500,
              min: 0,
              iconType: '',
              isFlag: false,
              label: '磁控开关复位使能'
            }
          ],
          TimeSetting: [
            {
              key: 40,
              list: [],
              value: '',
              oldValue: '',
              type: '',
              max: 9999,
              min: 0,
              iconType: '',
              isFlag: false,
              label: '授权工作时间'
            },
            {
              key: 41,
              list: [],
              value: '',
              oldValue: '',
              type: '',
              isFlag: false,
              label: '上电时间'
            },
            {
              key: 42,
              list: [],
              value: '',
              oldValue: '',
              type: '',
              isFlag: false,
              label: '工作时间'
            }
          ],
          ControlSettings: [
            {
              key: 40,
              list: [],
              value: false,
              oldValue: false,
              type: '',
              isFlag: false,
              label: '控制设定'
            }
          ],
          DisplaySelection: [
            {
              key: 40,
              list: [],
              value: 0,
              oldValue: 0,
              type: '',
              isFlag: false,
              label: '应用'
            }
          ]
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
      onChange (item) {
        console.log(Utils.isMaxNum(item.value, item.max))
        item.isFlag = Utils.isMaxNum(item.value, item.max)
        if (item.value === '') {
          item.iconType = ''
        } else if (item.isFlag) {
          item.iconType = 'success'
        } else {
          item.iconType = 'error'
        }
      },
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
      dateTimeSubmit (item) {
        item.isFlag = true
        this.submit(item)
      },
      buttonSubmit (item) {
//        if (item.list[0]) {
//          item.value = 0
//        } else {
//          item.value = 1
//        }
        item.isFlag = true
        this.submit(item)
      },
      submit (item) {
        console.log(arguments, 'submit')
        if (item.isFlag) {
          item.isFlag = false
          item.oldValue = item.value
          console.log('发送数据')
        }
        return false
      },
      max300: function (value) {
//        console.log(value, 2833)
        return {
          valid: /[0-9]+/.test(value) && value <= 300 && value >= 0
        }
      },
      onScrollBottom () {
        console.log(this.index)
      },
      onItemClick (item) {
        this.demo = item
      },
      getHeight () {
        return this.listH[this.index]
      },
      formatValueFunction (val) {
        return Utils.formatValueFunction(val)
      },
      getStyle (i) {
//        let str = 'background-position: ' + this.data.DisplaySelection[0].list[i][0] + 'px ' + this.data.DisplaySelection[0].list[i][1] + 'px;'
        return ''
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

  .weui-switch:checked, .weui-switch-cp__input:checked ~ .weui-switch-cp__box {
    border-color: #2490ff !important;
    background-color: #2490ff !important;
  }

  .weui-cell_switch .weui-cell__ft {
    height: inherit;
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
    font-size: 13px;
    height: 33px;
    line-height: 33px;
    background: #ebebeb;
    i {
      width: 5px;
      height: 5px;
      background: #2490ff;
      border-radius: 50%;
      position: relative;
      top: -2px;
      margin: 0 5px 0 10px;
    }
    span {
      color: #adaaaa;
    }
  }

  .powerNumber {
    position: relative;
    padding: 0 17px;
    .button-power {
      padding: 12.5px 0;
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

  .customPower {
    .item {
      padding: 5.5px 15px 5.5px 23px;
      height: 32px !important;
      line-height: 32px !important;
      font-size: 14.5px !important;
      border-bottom: 0.5px solid #ebebeb;
      .item-input {
        width: 210px;
        padding-right: 0 !important;
        font-size: 12.5px !important;
        color: #000;
      }
    }
  }

  .nextChioce {
    .item {
      padding: 5.5px 15px 5.5px 23px;
      height: 32px !important;
      line-height: 32px !important;
      font-size: 13px !important;
      border-bottom: 0.5px solid #ebebeb;
      .item-input {
        width: 210px;
        padding-right: 0 !important;
        font-size: 12.5px !important;
        color: #000;
      }
    }
  }

  li .smallTitle {
    background: #ebebeb;
    height: 23px;
    line-height: 23px;
    color: #adaaaa;
    padding-left: 20px;
    font-size: 10.5px;
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
    position: relative;
    padding: 200px 0 0 0;
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
    padding: 7.5px 2px;
  }

  .screenBox {
    float: left;
    width: 50%;
    text-align: center;
    position: relative;
    .screenBtn {
      margin-bottom: 9.5px;
      width: 120px;
      height: 80px;
    }
    .button-btn {
      display: inline-block;
      border: 1px solid #2c6afd;
      border-radius: 7px;
      color: #2c6afd;
      background: #ebebeb;
      background: url('../../static/libs/images/i-con.png') no-repeat;
      background-size: 960px 840px;
    }
    &:nth-of-type(1) {
      .button-btn {
        background: none;
        &:before {
          content: '专属专款';
          position: absolute;
          margin: 0;
          top: 14px;
          left: 0;
          bottom: 62px;
          right: 0;
          line-height: 82px;
        }
      }
    }
    &:nth-of-type(2) {
      .button-btn {
        background-position: -726px -18px;
      }
    }
    &:nth-of-type(3) {
      .button-btn {
        background-position: -584px -18px;
      }
    }
    &:nth-of-type(4) {
      .button-btn {
        background-position: -26px -109px;
      }
    }
    &:nth-of-type(5) {
      .button-btn {
        background-position: -307px -20px;
      }
    }
    &:nth-of-type(6) {
      .button-btn {
        background-position: -155px -113px;
      }
    }
    &:nth-of-type(7) {
      .button-btn {
        background-position: -170px -17px;
      }
    }
    &:nth-of-type(8) {
      .button-btn {
        background-position: -33px -20px;
      }
    }
    &:nth-of-type(9) {
      .button-btn {
        background-position: -290px -117px;
      }
    }
    &:nth-of-type(10) {
      .button-btn {
        background-position: -445px -20px;
      }
    }
    .button-display-default {
      border-radius: 8px !important;
      width: 70px !important;
      height: 20px !important;
      line-height: 20px !important;
    }
  }

  .screenBox .smallBtn {
    width: 73px;
    height: 23px;
    margin: 20px 22px;
  }

  .tap-setting {
    position: fixed;
    top: 46px;
    height: 35px;
    width: 100%;
    z-index: 9990;

  }

  .tap-box {
    position: relative;
  }

  .nav {
    /*position: relative;*/
    /*height: 35px;*/
    /*top: 0;*/
    padding-top: 46px;
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 9998;
    .tap-fixed {
      height: 100%;
      .vux-center {
        height: 100%;
        line-height: 35px;
        font-size: 11.5px;
      }
    }
  }

  .tap-connet {
    padding-top: 82px;
  }

  .scroller-box {
    top: 46px;
  }

</style>
