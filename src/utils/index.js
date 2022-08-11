export function getType(obj) {
  const toString = Object.prototype.toString
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object',
  }
  if (obj instanceof Element) {
    return 'element'
  }
  return map[toString.call(obj)]
}
/* 解析时间 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}/{m}/{d} {h}:{i}:{s}'
  let date
  try {
    const type = getType(time)
    if (type === 'string') {
      const reg = new RegExp('-', 'g')
      time = time.replace(reg, '/')
      date = new Date(time)
    } else if (type === 'number') {
      if (time.length === 10) {
        time = parseInt(time) * 1000
      }
      date = new Date(time)
    } else {
      date = time
    }
  } catch (e) {
    console.error(e)
    return false
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    i: date.getMinutes(),
    h: date.getHours(),
    s: date.getSeconds(),
    a: date.getDay(),
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['日', '一', '二', '三', '四', '五', '六'][value]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}
/* 解析距离当前时间 */
export function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()
  const diff = (now - d) / 1000
  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
    )
  }
}
/* 获取当前周 */
export function getWeekNow() {
  const end = new Date(parseTime(new Date(), '{y}/{m}/{d}'))
  const start = new Date(parseTime(new Date(), '{y}/{m}/{d}'))
  start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
  return [start, end]
}
/* 身份证脱敏 */
export const formatIdcard = (idcard) => {
  if (idcard) {
    idcard = idcard.split('')
    idcard.splice(6, 10, '**********')
    return idcard.join('')
  } else {
    return '--'
  }
}
/* 获取url内的编码 */
export const getUrlParam = (value) => {
  return (
    decodeURIComponent(
      (new RegExp('[?|&]' + value + '=([^&;]+?)(&|#|;|$)').exec(location.href) || [
        '',
        '',
      ])[1].replace(/\+/g, '%20')
    ) || null
  )
}
/* 下载文件 */
export const download = (url, filename) => {
  const xhr = new XMLHttpRequest()
  xhr.open('GET', `${url}?t=${Date.now()}`, true)
  xhr.responseType = 'blob'
  xhr.onload = function () {
    if (xhr.status === 200) {
      console.log(xhr.response)
      if (window.navigator.msSaveOrOpenBlob) {
        navigator.msSaveBlob(xhr.response, filename)
      } else {
        const link = document.createElement('a')
        const body = document.querySelector('body')
        link.href = window.URL.createObjectURL(xhr.response)
        link.download = filename
        link.style.display = 'none'
        body.appendChild(link)
        link.click()
        body.removeChild(link)
        window.URL.revokeObjectURL(link.href)
      }
    }
  }
  xhr.send()
}
