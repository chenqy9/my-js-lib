/**
 * JavaScript 库
 */
const weapon = {}

// 判断客户端是否iphone
const isIPhone = () => {
  return window.navigator.appVersion.match(/iphone/gi)
}

// 判断客户端是否android
const isAndroid = () => {
  return window.navigator.appVersion.match(/android/gi)
}

weapon.isIPhone = isIPhone
weapon.isAndroid = isAndroid

export {
  isIPhone,
  isAndroid
}

export default weapon
