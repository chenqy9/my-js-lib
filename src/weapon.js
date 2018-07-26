/**
 * JavaScript 库
 */
const weapon = {}

/**
 * @description 获取URL参数
 * @param {String} name
 * @returns {String} value
 */
function getUrlParam (name) {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`) // 构造一个含有目标参数的正则表达式对象
  const r = window.location.search.substr(1).match(reg) // 匹配目标参数
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
function color2Rgba (color, opacity) {
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

function formatNumber (num, precision, separator) {
  let parts
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
const isIPhone = () => window.navigator.appVersion.match(/iphone/gi)

/**
 * @description 判断客户端是否android
 */
const isAndroid = () => window.navigator.appVersion.match(/android/gi)

weapon.getUrlParam = getUrlParam
weapon.formatNumber = formatNumber
weapon.color2Rgba = color2Rgba
weapon.isIPhone = isIPhone
weapon.isAndroid = isAndroid

export {
  getUrlParam,
  formatNumber,
  color2Rgba,
  isIPhone,
  isAndroid
}

export default weapon
