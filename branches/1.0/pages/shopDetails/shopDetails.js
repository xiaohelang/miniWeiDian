// pages/shopDetails/shopDetails.js
const api = require('../../utils/api.js');
var WxParse = require('../../wxParse/wxParse.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopInfo: {},
    article: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getShopInfo()
    // var that = this;
    // var temp = WxParse.wxParse('article', 'html', that.data.article, that, 5);
    // that.setData({
    //   article: temp
    // })
  },

  /**
   * 获取微店信息
  */
  getShopInfo: function () {
    let that = this
    api.getShopInfo(
      {
        vShopGuid: 'FE1DD6E1-F344-49CE-9EA5-23A698793159',
      },
      function (res) {
        console.log(res)
        if (res.data.code == 0) {
          that.setData({
            shopInfo: res.data.data,
            // article: WxParse.wxParse('article', 'html', res.data.data.vShopIntro, that, 0)
          })
        }
      },
      function (err) {
        console.log(err)
      }
    )
  },
})