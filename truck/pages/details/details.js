// pages/details/details.js
const api = require('../../utils/api.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    detailsInfo: {},
    bannerList: [],
    price: 0,
    originaPrice: 0,
    vGroupProductType: 0,
    pingGrounpNum: 0,
    // groupList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.vShopProductGuid)
    this.getDetails(options.vShopProductGuid)
  },

  /**
   * 获取详情页数据
   */
  getDetails(vShopProductGuid) {
    let that = this
    console.log(vShopProductGuid)
    api.getDetails(
      {
        vShopProductGuid: vShopProductGuid,
      },
      function (res) {
        console.log(res)
        if (res.data.code == 0) {
          that.setData({
            bannerList: res.data.data.shopProductImages,
            detailsInfo: res.data.data,
            price: res.data.data.price,
            originaPrice: res.data.data.price,
            vGroupProductType: res.data.data.vGroupProductType
          })
          if (res.data.data.vGroupProductType == 1 || res.data.data.vGroupProductType == 2) {
            that.getActives(vShopProductGuid)
          }
        }
      },
      function (err) {
        console.log(err)
      }
    )
  },
  
  // 商品活动
  getActives(vShopProductGuid) {
    let that = this
    api.getActives(
      {
        vShopProductGuid: vShopProductGuid,
      },
      function (res) {
        console.log(res)
        if (res.data.code == 0) {
          that.setData({
            price: res.data.data.recordList[0].groupPrice,
            pingGrounpNum: res.data.data.recordList[0].groupSize
          })
          that.getGroupMember(res.data.data.recordList[0].vGroupProductGuid)
        }
      },
      function (err) {
        console.log(err)
      }
    )
  },
  // 拼团列表
  getGroupMember(vGroupProductGuid) {
    let that = this
    api.getGroupMember(
      {
        vGroupProductGuid: vGroupProductGuid,
        pinSize: 2
      },
      function (res) {
        console.log(res)
        if (res.data.code == 0) {
          that.setGroupMember(res.data.data.recordList)
          // that.setData({
          //   groupList: res.data.data.recordList
          // })
        }
      },
      function (err) {
        console.log(err)
      }
    )
  },

  setGroupMember (recordData) {
    let groupLists = []
    for (var idx in recordData) {
      // 计算人数
      let shenyuNumber = recordData[idx].groupSize - recordData[idx].orderSize
      console.log('计算人数' + shenyuNumber)
      let temp = {
        headImgUrl: recordData[idx].headImgUrl,
        memberName: recordData[idx].memberName,
        peopleNumber: shenyuNumber
      }
      groupLists.push(temp)
    }
    this.setData({
      groupList: groupLists
    })
  },

  // 单独购买
  sigerToBuy: function (event){
    let vShopProductGuid = event.currentTarget.dataset.id;
    console.log(this.data.originaPrice)
    wx.setStorage({
      key:'realPrice',
      data: this.data.originaPrice
    })
    wx.navigateTo({
      url: '../orderDetails/orderDetails?vShopProductGuid=' + vShopProductGuid +'',
    })
  },
  // 团购购买
  groudToBuy: function (event) {
    let vShopProductGuid = event.currentTarget.dataset.id;
    console.log(this.data.price)
    wx.setStorage({
      key: 'realPrice',
      data: this.data.price
    })
    wx.navigateTo({
      url: '../orderDetails/orderDetails?vShopProductGuid=' + vShopProductGuid + '',
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