//index.js
//获取应用实例
const app = getApp();
const api = require('../../utils/api.js');

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onReady: function() {
    api.wx({
      url: '/vshop/product/page.do',
      param: {
        vShopGuid: 'EFC717FD-88ED-4E95-8706-41BDF35141AD',
      },
      success: function(res){
        console.log(res)
      }
    })
  }
  
})
