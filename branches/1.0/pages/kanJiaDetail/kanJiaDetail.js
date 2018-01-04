// pages/kanJiaDetail/kanJiaDetail.js
const api = require('../../utils/api.js');
const stateType = require('../../utils/state.js');
const Time = require('../../utils/timeUtil.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    kanText: '我想用最低价购买，兄弟姐妹们出力帮忙砍价喔！',
    isMinCurret: false,
    isHost: false,
    isKan: false,
    showHidden: false,
    vGroupProductLogGuid: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getKanJiaDetail(options.vGroupProductLogGuid)
    this.getUserKanList(options.vGroupProductLogGuid)
    this.setData({
      vGroupProductLogGuid: options.vGroupProductLogGuid
    })
  },

  getKanJiaDetail(vGroupProductLogGuid) {
    let that = this
    let token = wx.getStorageSync('token')
    api.getKanJiaDetail(
      {
        token: token,
        vGroupProductLogGuid: vGroupProductLogGuid,
      },
      function (res) {
        console.log(res)
        if (res.data.code == 0){
          that.setKanJiaDetail(res.data.data)
        }
      },
      function (err) {
        console.log(err)
      }
    )
  },
  setKanJiaDetail(receiveData) {
    // 计算差价
    let chaPrice = (receiveData.price - receiveData.minPrice).toFixed(2)
    // 计算已砍价格
    let kanPrice = (receiveData.originalPrice - receiveData.price).toFixed(2)
    // 处理截止时间
    let expiredDateArr = receiveData.expiredDate.split(' ')
    let date = expiredDateArr[0]
    let time = expiredDateArr[1]

    if (receiveData.isHost !== undefined){
      this.setData({
        isHost: receiveData.isHost
      })
    }

    let temp = {
      productImg: receiveData.shopProductLogo,
      title: receiveData.vShopProductName,
      des_title: receiveData.shortIntro,
      originalPrice: receiveData.originalPrice,
      nowPrice: receiveData.price,
      userHead: receiveData.headImgUrl,
      userText: receiveData.content,
      lowPrice: receiveData.minPrice,
      chaPrice: chaPrice,
      kanPrice: kanPrice,
      date: date,
      time: time
    }
    this.setData({
      items: temp
    })
  },

  getUserKanList(vGroupProductLogGuid) {
    let that = this
    let token = wx.getStorageSync('token')
    api.getUserKanList(
      {
        token: token,
        vGroupProductLogGuid: vGroupProductLogGuid
      },
      function (res) {
        console.log(res)
        if (res.data.code == 0) {
          that.setData({
            userList: res.data.data.recordList
          })
        }
      },
      function (err) {
        console.log(err)
      }
    )
  },

  helpKan: function (event) {
    let vGroupProductLogGuid = this.data.vGroupProductLogGuid
    this.setUserKanHelp(vGroupProductLogGuid)
  },

  // 帮忙砍价数据请求
  setUserKanHelp(vGroupProductLogGuid) {
    let that = this
    let token = wx.getStorageSync('token')
    api.getUserKanHelp(
      {
        token: token,
        vGroupProductLogGuid: vGroupProductLogGuid
      },
      function (res) {
        if (res.data.code == 0){
          that.setData({
            isKan: true
          })
          that.getKanJiaDetail()
          that.getUserKanList()
        }
        console.log(res)
      },
      function (err) {
        console.log(err)
      }
    )
  },

  // 活动说明
  openShow: function () {
    this.setData({
      showHidden: true
    })
  },

  // 关闭说明
  closeShow: function () {
    this.setData({
      showHidden: false
    })
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
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})