/**
 * JavaScript 库
 */
const weapon = {}

/**
 * @description 获取URL参数
 * @param {String} name
 * @returns {String} value
 */
const getUrlParam = weapon.getUrlParam = (name) => {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)') // 构造一个含有目标参数的正则表达式对象
  var r = window.location.search.substr(1).match(reg) // 匹配目标参数
  if (r != null) {
    return unescape(r[2]) // 返回参数值
  }
  return null
}

/**
 * @description 16进制颜色转rgba
 * @param {String} color
 * @param {Number} opacity
 * @returns {String}
 */
const color2Rgba = weapon.color2Rgba = (color, opacity) => {
  // 十六进制颜色值的正则表达式
  const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
  // 如果参数不是有效的16进制颜色
  if (typeof color !== 'string' && reg.test(color)) {
    return color
  }
  let sColor = color.toLowerCase()
  if (sColor.length === 4) {
    let sColorNew = '#'
    for (let i = 1; i < 4; i += 1) {
      sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1))
    }
    sColor = sColorNew
  }
  // 处理六位的颜色值
  const sColorChange = []
  for (let i = 1; i < 7; i += 2) {
    sColorChange.push(parseInt(`0x${sColor.slice(i, i + 2)}`))
  }
  let opacityNew = parseFloat(opacity)
  if (isNaN(opacityNew) || opacityNew < 0 || opacityNew > 1) {
    opacityNew = 1
  }
  return `rgba(${sColorChange.join(',')},${opacityNew})`
}

/**
 * @description 格式化数字，千分化，保留小数点
 */
const formatNumber = weapon.formatNumber = (num, precision, separator) => {
  var parts
  // 判断是否为数字
  if (!isNaN(parseFloat(num)) && isFinite(num)) {
    // 把类似 .5, 5. 之类的数据转化成0.5, 5, 为数据精度处理做准, 至于为什么
    // 不在判断中直接写 if (!isNaN(num = parseFloat(num)) && isFinite(num))
    // 是因为parseFloat有一个奇怪的精度问题, 比如 parseFloat(12312312.1234567119)
    // 的值变成了 12312312.123456713
    num = Number(num)
    // 处理小数点位数
    num = (typeof precision !== 'undefined' ? num.toFixed(precision) : num).toString()
    // 分离数字的小数部分和整数部分
    parts = num.split('.')
    // 整数部分加[separator]分隔, 借用一个著名的正则表达式
    parts[0] = parts[0].toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, `$1${separator || ','}`)

    return parts.join('.')
  }
  return NaN
}

/**
 * @description 判断客户端是否iphone
 */
const isIPhone = weapon.isIPhone = () => {
  return window.navigator.appVersion.match(/iphone/gi)
}

/**
 * @description 判断客户端是否android
 */
const isAndroid = weapon.isAndroid = () => {
  return window.navigator.appVersion.match(/android/gi)
}

/**
 * @description 生成uuid
 */
const uuid = weapon.uuid = () => {
  let d = new Date().getTime()
  let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
  })
  return uuid
}

/**
 * @description 生成guid
 */
const guid = weapon.guid = () => {
  function S4 () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  }
  return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4())
}

export {
  getUrlParam,
  color2Rgba,
  formatNumber,
  isIPhone,
  isAndroid,
  uuid,
  guid
}

export default weapon
