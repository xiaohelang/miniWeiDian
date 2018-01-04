// pages/group/group.js
const api = require('../../utils/api.js');
const stateType = require('../../utils/state.js');
const Time = require('../../utils/timeUtil.js');

const PAGESIZE = 5

Page({

  /**
   * 页面的初始数据
   */
  data: {
    releseTime: '',
    listArray: [],
    currentPage: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getGroup(this.data.currentPage)
  },

  // 获取我的拼单列表数据
  getGroup(currentPage) {
    let that = this
    let token = wx.getStorageSync('token')
    api.getGroup(
      {
        token: token,
        pageIndex: currentPage,
        pageSize: PAGESIZE,
      },
      function (res) {
        console.log(res)
        if (res.data.code == 0) {
          that.setGroupDate(res.data.data.rows)
        }
      },
      function (err) {
        console.log(err)
      }
    )
  },

  setGroupDate (groupList) {
    let that = this
    var listDate = []
    var stateVal = ''
    let headImgUrl = ''
    for (var idx in groupList) {
      // 处理拼单状态
      switch (groupList[idx].vGroupOrderState) {
        case stateType.PIN_QUO_QI:
          stateVal = '过期'
          break;
        case stateType.PIN_DAN_ZHONG:
          stateVal = '拼单中'
          break;
        case stateType.PIN_WAN_WHENG:
          stateVal = '拼单成功'
          break;
      }
      // 拼单用户头像处理
      if (groupList[idx].headImgUrl != undefined) {
        headImgUrl = groupList[idx].headImgUrl
      } else {
        headImgUrl = ''
      }
      that.setTime(groupList[idx].createDate)
      var temp = {
        productImg: groupList[idx].vShopProductLogo,
        title: groupList[idx].vShopProductName,
        groupSize: groupList[idx].groupSize,
        salesVolume: groupList[idx].salesVolume,
        groupPrice: groupList[idx].price,
        stateType: stateVal,
        message: groupList[idx].message,
        vGroupOrderGuid: groupList[idx].vGroupOrderGuid,
        vOrderGuid: groupList[idx].vOrderGuid,
        releseTime: that.data.releseTime,
        headImgUrl: headImgUrl,
        vGroupOrderState: groupList[idx].vGroupOrderState
      }
      listDate.push(temp)
    }
    this.setData({
      listArray: this.data.listArray.concat(listDate)
    })
  },

  setTime (creatTime) {
    let nowTime = Time.getNowFormatDate()
    nowTime = nowTime.replace(new RegExp('-', 'gm'), '/')
    let timeMill = (new Date(nowTime)).getTime()
    creatTime = creatTime.replace(new RegExp('-', 'gm'), '/')
    let millSecond = (new Date(creatTime)).getTime()
    let timeDiffer = timeMill - millSecond
    let days = Math.floor(timeDiffer / (24 * 3600 * 1000))
    let leavs1 = timeDiffer % (24 * 3600 * 1000)    //  计算天数后剩余的毫秒数
    let hour = Math.floor(leavs1 / (3600 * 1000))
    var leaves2 = leavs1 % (3600 * 1000)        //  计算小时数后剩余的毫秒数
    var minute = Math.floor(leaves2 / (60 * 1000))
    if (days === 0) {
      if (hour === 0) {
        if (minute === 0) {
          return this.data.releseTime = '刚刚'
        } else {
          return this.data.releseTime = minute + '分钟前'
        }
      } else {
        return this.data.releseTime = hour + '个小时前'
      }
    } else {
      return this.data.releseTime = days + '天前'
    }
  },

  // 跳转到拼单详情页
  jumpGroupDetail: function (event) {
    let vGroupOrderGuid = event.currentTarget.dataset.vgrouporderguid;
    let vOrderGuid = event.currentTarget.dataset.vorderguid;
    let groupState = event.currentTarget.dataset.groupstate;
    console.log(groupState)
    if (groupState == 2) {
      wx.navigateTo({
        url: '../groupSuccess/groupSuccess?vGroupOrderGuid=' + vGroupOrderGuid + '&vOrderGuid=' + vOrderGuid +'',
      })
    } else {
      wx.navigateTo({
        url: '../groupDetail/groupDetail?vGroupOrderGuid=' + vGroupOrderGuid + '',
      })
    }
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.data.currentPage += 1
    this.getGroup(this.data.currentPage)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})