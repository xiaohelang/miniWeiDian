// pages/orderDetails/orderDetails.js
const api = require('../../utils/api.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    productInfo: {},
    addressInfo: {},
    productImg: '',
    vShopName:'',
    realPrice: 0,
    num: 1,
    addressState: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    this.getProductInfo(options.vShopProductGuid)
    // this.getAllAddressInfo()
    wx.getStorage({
      key: 'realPrice',
      success: function(res){
        that.setData({
          realPrice: res.data
        })
        console.log('realPrice:' + res.data)
      }
    })
  },

  // 获取产品详情信息
  getProductInfo(vShopProductGuid){
    let that = this
    api.getDetails(
      {
        vShopProductGuid: vShopProductGuid,
      },
      function (res) {
        console.log(res)
        if (res.data.code == 0) {
          that.getShopInfo(res.data.data.vShopGuid)
          that.setData({
            productInfo: res.data.data,
            productImg: res.data.data.shopProductImages[0]
          })
        }
      },
      function (err) {
        console.log(err)
      }
    )
  },

  getShopInfo(vShopGuid) {
    let that = this
    api.getShopInfo(
      {
        vShopGuid: vShopGuid,
      },
      function (res) {
        console.log(res)
        if (res.data.code == 0) {
          that.setData({
            vShopName: res.data.data.shopName
          })
        }
      },
      function (err) {
        console.log(err)
      }
    )
  },

  // 点击减号
  bindMinus: function () {
    let num = this.data.num
    if (num > 1) {
      num --
    }
    this.setData({
      num: num
    })
  },
  // 点击加号
  bindAdd: function () {
    let num = this.data.num
    console.log(num)
    num ++
    this.setData({
      num: num
    })
  },
  // 获取所有用户地址信息
  getAllAddressInfo() {
    let that = this
    let token = wx.getStorageSync('token')
    api.getAllAddressInfo(
      {
        token: token
      },
      function (res) {
        if (res.data.code == 0) {
          console.log(res)
          console.log('======所有地址数据=======')
          if (res.data.data.recordList.length > 0) {
            // addressData 表示存储存已有地址数据长度变量
            wx.setStorageSync('addressData', res.data.data.recordList.length)
          } else {
            that.setData({
              addressState: false
            })
          }
          for (let i = 0; i < res.data.data.recordList.length; i++) {
            if (res.data.data.recordList[i].isDefault == true) {
              console.log('======isDefault==========')
              that.getAddressInfo(res.data.data.recordList[i].vReceiverGuid)
            } else {
              that.setData({
                addressState: false
              })
            }
          }
        }
      },
      function (err) {
        console.log(err)
      }
    )
  },
  // 获取收货地址信息
  getAddressInfo(vReceiverGuid) {
    let that = this
    let token = wx.getStorageSync('token')
    api.getAddressInfo(
      {
        token: token,
        vReceiverGuid: vReceiverGuid,
      },
      function (res) {
        console.log(res)
        console.log('=========999999999999===========')
        if (res.data.code == 0) {
          that.setData({
            addressInfo: res.data.data,
            addressState: true
          })
        }
      },
      function (err) {

      }
    )
  },
  // 填写收货地址
  editAddressBtn: function () {
    let addressLength = wx.getStorageSync('addressData')
    console.log(addressLength)
    if (addressLength > 0) {
      wx.navigateTo({
        url: '../addressList/addressList',
      })
    } else {
      wx.navigateTo({
        url: '../editAddress/editAddress',
      })
    }
    
  },
  // 跳转到选择地址列表
  jumpAddress: function () {
    wx.navigateTo({
      url: '../addressList/addressList',
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
    console.log('=====监听页面显示======')
    this.getAllAddressInfo()
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