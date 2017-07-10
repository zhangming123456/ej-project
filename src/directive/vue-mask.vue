<template>
<<<<<<< Updated upstream
	<div>

	</div>
</template>

<script>
  export default {
    data () {
      return {
        msg: 'Hello World!'
=======
  <div class="vue-mask" :class="{'weui-cell_warn': showWarn}">

  </div>
</template>

<script>
  import MaskedInput from 'vue-text-mask'

  const validators = {
    'email': {
      fn: isEmail,
      msg: '邮箱格式'
    },
    'china-mobile': {
      fn (str) {
        return isMobilePhone(str, 'zh-CN')
      },
      msg: '手机号码'
    },
    'china-name': {
      fn (str) {
        return str.length >= 2 && str.length <= 6
      },
      msg: '中文姓名'
    }
  }
  export default {
    name: 'mask-input',
    created () {
      this.currentValue = this.value || ''
      if (!this.title && !this.placeholder && !this.currentValue) {
        console.warn('no title and no placeholder?')
      }
      if (this.required && !this.currentValue) {
        this.valid = false
      }
      this.handleChangeEvent = true
      if (this.debounce) {
        this._debounce = Debounce(() => {
          this.$emit('on-change', this.currentValue)
        }, this.debounce)
      }
    },
    mounted () {
      if (this.$slots && this.$slots['restricted-label']) {
        this.hasRestrictedLabel = true
      }
    },
    beforeDestroy () {
      if (this._debounce) {
        this._debounce.cancel()
      }
    },
    mixins: [Base],
    components: {
      MaskedInput
    },
    props: {
      title: {
        type: String,
        default: ''
      },
      type: {
        type: String,
        default: 'number'
      },
      placeholder: String,
      value: [String, Number],
      name: String,
      readonly: Boolean,
      disabled: Boolean,
      keyboard: String,
      inlineDesc: String,
      isType: [String, Function],
      min: Number,
      max: Number,
      showClear: {
        type: Boolean,
        default: true
      },
      equalWith: String,
      textAlign: String,
      // https://github.com/yisibl/blog/issues/3
      autocomplete: {
        type: String,
        default: 'off'
      },
      autocapitalize: {
        type: String,
        default: 'off'
      },
      autocorrect: {
        type: String,
        default: 'off'
      },
      spellcheck: {
        type: String,
        default: 'false'
      },
      novalidate: {
        type: Boolean,
        default: false
      },
      iconType: String,
      debounce: Number,
      placeholderAlign: String,
      labelWidth: String
    },
    computed: {
      labelStyles () {
        return {
          width: this.labelWidthComputed || this.$parent.labelWidth || this.labelWidthComputed,
          textAlign: this.$parent.labelAlign,
          marginRight: this.$parent.labelMarginRight
        }
      },
      pattern () {
        if (this.keyboard === 'number' || this.isType === 'china-mobile') {
          return '[0-9]*'
        }
      },
      labelWidthComputed () {
        const width = this.title.replace(/[^x00-xff]/g, '00').length / 2 + 1
        if (width < 10) {
          return width + 'em'
        }
      },
      hasErrors () {
        return Object.keys(this.errors).length > 0
      },
      inputStyle () {
        if (this.textAlign) {
          return {
            textAlign: this.textAlign
          }
        }
      },
      showWarn () {
        return !this.novalidate && !this.equalWith && !this.valid && this.firstError && (this.touched || this.forceShowError)
      }
    },
    methods: {
      reset (value = '') {
        this.dirty = false
        this.currentValue = value
        this.firstError = ''
        this.valid = true
      },
      clear () {
        this.currentValue = ''
        this.focus()
      },
      focus () {
        this.$refs.input.focus()
      },
      blur () {
        this.$refs.input.blur()
      },
      focusHandler () {
        this.$emit('on-focus', this.currentValue)
      },
      onBlur () {
        this.setTouched()
        this.validate()
        this.$emit('on-blur', this.currentValue)
      },
      onKeyUp (e) {
        if (e.key === 'Enter') {
          e.target.blur()
          this.$emit('on-enter', this.currentValue)
        }
      },
      getError () {
        let key = Object.keys(this.errors)[0]
        this.firstError = this.errors[key]
      },
      validate () {
        if (typeof this.equalWith !== 'undefined') {
          this.validateEqual()
          return
        }
        this.errors = {}

        if (!this.currentValue && !this.required) {
          this.valid = true
          return
        }

        if (!this.currentValue && this.required) {
          this.valid = false
          this.errors.required = '必填哦'
          this.getError()
          return
        }

        if (typeof this.isType === 'string') {
          const validator = validators[this.isType]
          if (validator) {
            this.valid = validator['fn'](this.currentValue)
            if (!this.valid) {
              this.errors.format = validator['msg'] + '格式不对哦~'
              return
            } else {
              delete this.errors.format
            }
          }
        }

        if (typeof this.isType === 'function') {
          const validStatus = this.isType(this.currentValue)
          this.valid = validStatus.valid
          if (!this.valid) {
            this.errors.format = validStatus.msg
            this.forceShowError = true
            if (!this.firstError) {
              this.getError()
            }
            return
          } else {
            delete this.errors.format
          }
        }

        if (this.min) {
          if (this.currentValue.length < this.min) {
            this.errors.min = `最少应该输入${this.min}个字符哦`
            this.valid = false
            if (!this.firstError) {
              this.getError()
            }
            return
          } else {
            delete this.errors.min
          }
        }

        if (this.max) {
          if (this.currentValue.length > this.max) {
            this.errors.max = `最多可以输入${this.max}个字符哦`
            this.valid = false
            this.forceShowError = true
            return
          } else {
            this.forceShowError = false
            delete this.errors.max
          }
        }

        this.valid = true
      },
      validateEqual () {
        if (!this.equalWith && this.currentValue) {
          this.valid = false
          this.errors.equal = '输入不一致'
          return
        }
        let willCheck = this.dirty || this.currentValue.length >= this.equalWith.length
        // 只在长度符合时显示正确与否
        if (willCheck && this.currentValue !== this.equalWith) {
          this.valid = false
          this.errors.equal = '输入不一致'
          return
        } else {
          if (!this.currentValue && this.required) {
            this.valid = false
          } else {
            this.valid = true
            delete this.errors.equal
          }
        }
      }
    },
    data () {
      let data = {
        hasRestrictedLabel: false,
        firstError: '',
        forceShowError: false,
        hasLengthEqual: false,
        valid: true,
        currentValue: ''
      }
      return data
    },
    watch: {
      valid () {
        this.getError()
      },
      value (val) {
        this.currentValue = val
      },
      equalWith (newVal) {
        if (newVal && this.equalWith) {
          if (newVal.length === this.equalWith.length) {
            this.hasLengthEqual = true
          }
          this.validateEqual()
        } else {
          this.validate()
        }
      },
      currentValue (newVal) {
        if (!this.equalWith && newVal) {
          this.validateEqual()
        }
        if (newVal && this.equalWith) {
          if (newVal.length === this.equalWith.length) {
            this.hasLengthEqual = true
          }
          this.validateEqual()
        } else {
          this.validate()
        }
        this.$emit('input', newVal)
        if (this._debounce) {
          this._debounce()
        } else {
          this.$emit('on-change', newVal)
        }
>>>>>>> Stashed changes
      }
    }
  }
</script>

<<<<<<< Updated upstream
<style scoped lang='less'>
=======
<style lang="less">
>>>>>>> Stashed changes

</style>
