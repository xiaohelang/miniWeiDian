// pages/me/me.js
const api = require('../../utils/api.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getPersonal()
    this.getIconCount()
  },
  // 获取用户信息
  getPersonal () {
    let that = this
    let token = wx.getStorageSync('token')
    api.getPersonal(
      {
        token: token,
      },
      function (res) {
        console.log(res)
        if (res.data.code == 0) {
          that.setData({
            userInfo: res.data.data
          })
        }
      },
      function (err) {
        console.log(err)
      }
    )
  },

  // 获取订单数量提示图标
  getIconCount () {
    let that = this
    let token = wx.getStorageSync('token')
    api.getIconCount(
      {
        token: token
      },
      function (res) {
        console.log(res)
        if (res.data.code == 0) {
          that.setData({
            iconData: res.data.data
          })
        }
      },
      function (err) {
        console.log(err)
      }
    )
  },

  // 跳转到订单列表
  jumpallOrder: function (event) {
    let currentTab = event.currentTarget.dataset.currenttab;
    wx.setStorageSync('currentTab', currentTab)
    console.log(currentTab)
    wx.navigateTo({
      url: '../myOrder/myOrder',
    })
  },
  // 跳转到收货地址列表页
  jumAddress: function () {
    wx.navigateTo({
      url: '../addressList/addressList',
    })
  },

  // 跳转到我的拼单列表
  jumpGroup: function () {
    wx.navigateTo({
      url: '../group/group',
    })
  },

  // 跳转到分享砍价页面
  jumpKanJiaList: function () {
    wx.navigateTo({
      url: '../KanList/KanList',
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