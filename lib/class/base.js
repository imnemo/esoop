const _ = require('lodash')

class Base {
  constructor(option = {}) {
    this.name = 'base'
    this.defOption = {}
    this.option = {}
    this._hasInitOptions = false
    this.setOptions(option)
  }
  /**
   * 只用于初始化时批量设置option
   * 多次调用setOptions会多次重置option
   * 如果要批量设置option，请用setOption({})
   * @param {any} opt
   * @memberof Base
   */
  setOptions(opt = {}, reset = false) {
    if(this._hasInitOptions && reset === false){
      throw new Error(`
        Can not init ${this.name} options multi times!\n
        invoke resetOptions(opt) if you want to reset options
      `)
    }
    if(!_.isPlainObject(opt)){
      throw new Error('${this.name} setOptions Must be a plain object!')
    }
    this.option = _.merge({}, this.defOption, opt)
    this._hasInitOptions = true
    this.afterSetOption(opt)
  }
  /**
   * 重置options
   * @param {any} opt
   * @memberof Base
   */
  resetOptions(opt) {
    this.setOptions(opt, true)
  }
  /**
   * 后续运行时设置option，可批量，可key&value形式
   * @param {any} opt
   * @param {any} [val=undefined]
   * @memberof Base
   */
  setOption(opt = {}, val = undefined) {
    if(_.isString(opt) && val !== undefined){
      let key = opt
      opt = {}
      opt[key] = val
    }else if(!_.isPlainObject(opt)){
      throw new Error(`${this.name} setOption must be key&value or plainObject!`)
    }
    _.merge(this.option, opt)
    this.afterSetOption(opt)
  }
  /**
   * 设置option后的一些处理，比如对某些option项做额外处理
   * @param {any} opt 格式化后的{}
   * @memberof Base
   */
  afterSetOption(opt = {}) {

  }
}

module.exports = Base