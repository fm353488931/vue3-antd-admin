const Validate = {
  idCard(num) {
    num = num.toUpperCase()
    if (!/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num)) {
      return false
    }
    var len, re
    len = num.length
    if (len == 15) {
      re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/)
      var arrSplit = num.match(re)
      var dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4])
      var bCorrectDay
      bCorrectDay =
        dtmBirth.getYear() == Number(arrSplit[2]) &&
        dtmBirth.getMonth() + 1 == Number(arrSplit[3]) &&
        dtmBirth.getDate() == Number(arrSplit[4])
      if (!bCorrectDay) {
        return false
      } else {
        var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2)
        var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2')
        var nTemp = 0,
          i
        num = num.substr(0, 6) + '19' + num.substr(6, num.length - 6)
        for (i = 0; i < 17; i++) {
          nTemp += num.substr(i, 1) * arrInt[i]
        }
        num += arrCh[nTemp % 11]
        return true
      }
    }
    if (len == 18) {
      re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/)
      arrSplit = num.match(re)
      dtmBirth = new Date(arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4])
      bCorrectDay
      bCorrectDay =
        dtmBirth.getFullYear() == Number(arrSplit[2]) &&
        dtmBirth.getMonth() + 1 == Number(arrSplit[3]) &&
        dtmBirth.getDate() == Number(arrSplit[4])
      if (!bCorrectDay) {
        return false
      } else {
        var valnum
        arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2)
        arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2')
        ;(nTemp = 0), i
        for (i = 0; i < 17; i++) {
          nTemp += num.substr(i, 1) * arrInt[i]
        }
        valnum = arrCh[nTemp % 11]
        if (valnum != num.substr(17, 1)) {
          return false
        }
        return true
      }
    }
    return false
  }, // 国标身份证
  email(str) {
    const reg = /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/
    return reg.test(str)
  }, //邮箱
  phone(str) {
    const reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
    return reg.test(str)
  }, // 手机号
  carNumber(value) {
    let flag = false
    const creg =
      /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/
    const xreg =
      /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/
    if (value.length === 7) {
      flag = creg.test(value)
    } else if (value.length === 8) {
      flag = xreg.test(value)
    } else {
      flag = false
    }
    return flag
  }, //车牌号
  USCC(str) {
    const reg = /^[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}$/g
    return reg.test(str)
  }, // 统一社会信用代码
}

export default Validate
