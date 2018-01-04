// 获取系统当前时间
function getNowFormatDate() {
  let date = new Date()
  let seperator1 = '-'
  let seperator2 = ':'
  let month = date.getMonth() + 1
  let strDate = date.getDate()
  if ((month >= 1 && month <= 9)) {
    month = '0' + month
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate
  }
  let currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + ' ' + date.getHours() + seperator2 + date.getMinutes() + seperator2 + date.getSeconds()
  return currentdate
}

// 产品倒计时
function setDownTime(sendTime) {
  const endTime = new Date(sendTime)
  const nowTime = new Date()
  let timeDifference = parseInt((endTime.getTime() - nowTime.getTime()) / 1000)
  let day = parseInt(timeDifference / (24 * 60 * 60))
  let hour = parseInt(timeDifference / (60 * 60) % 24)
  let min = parseInt(timeDifference / 60 % 60)
  let second = parseInt(timeDifference % 60)
  if (day > 0) {
    return day + "天" + hour + "小时" + min + "分" + second + "秒后结束"
  } else if (hour > 0) {
    return hour + "小时" + min + "分" + second + "秒后结束"
  } else if (min > 0) {
    return min + "分" + second + "秒后结束"
  } else if (second > 0) {
    return second + "秒后结束"
  } else {
    return false
  }
  
}

module.exports = {
  getNowFormatDate,
  setDownTime,
}