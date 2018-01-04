// pages/opendShop/opendShop.js
const api = require('../../utils/api.js');
var currentPage = 1
var PAGESIZE = 5

Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopInfo: {},
    produstList: [],
    loadingHidden: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getShopInfo()
    this.getProdust(currentPage)
  },
  onPullDownRefresh: function () {
    // Do something when pull down.
    console.log('刷新');
  },

  onReachBottom: function () {
    currentPage++
    this.getProdust(currentPage)
    console.log(currentPage);
  },

  // 跳转详情页面
  tapDetail: function (event) {
    let vShopProductGuid = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../details/details?vShopProductGuid=' + vShopProductGuid + '',
    })
    // console.log(vShopProductGuid)
  },

  // 获取微店信息
  getShopInfo: function () {
    let that = this
    api.getShopInfo(
      {
        // FE1DD6E1-F344 - 49CE-9EA5-23A698793159
        // EFC717FD-88ED-4E95 - 8706 - 41BDF35141AD
        vShopGuid: 'FE1DD6E1-F344-49CE-9EA5-23A698793159',
      },
      function (res) {
        if (res.data.code == 0) {
          that.setData({
            shopInfo: res.data.data
          })
        }
      },
      function (err) {
        console.log(err)
      }
    )
  },

  // 获取产品
  getProdust: function (currentPage) {
    let that = this
    api.getProduct(
      {
        vShopGuid: 'EFC717FD-88ED-4E95-8706-41BDF35141AD',
        pageIndex: currentPage,
        pageSize: PAGESIZE
      },
      function (res) {
        if (res.data.code == 0) {
          that.setData({
            produstList: that.data.produstList.concat(res.data.data.rows)
          })

          setTimeout(function () {
            that.setData({
              loadingHidden: true
            })
          }, 1500)

          if (res.data.data.rows.length == 0) {
            wx.stopPullDownRefresh()
          } else {
            console.log('2222222222')
          }
        }
      },
      function (err) {
        console.log('大树测试err')
        console.log(err)
      }
    )
  }
})