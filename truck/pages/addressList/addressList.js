// pages/addressList/addressList.js
const api = require('../../utils/api.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList: [],
    iconType: ['circle', 'success']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
        console.log(res)
        if (res.data.code == 0) {
          that.setData({
            addressList: res.data.data.recordList
          })
          if (res.data.data.recordList <= 0) {
            // addressData变量表示已存在地址数量长度
            wx.setStorageSync('addressData', 0)
          }
        }
      },
      function (err) {
        console.log(err)
      }
    )
  },
  // 编辑地址
  editAddress: function (event) {
    let vReceiverGuid = event.currentTarget.dataset.editid;
    console.log("id:"+vReceiverGuid)
    wx.navigateTo({
      url: '../editAddress/editAddress?vReceiverGuid=' + vReceiverGuid +'',
    })
  },
  // 删除地址
  deleteBtn: function (event) {
    console.log(event.currentTarget.dataset.editid)
    this.deleteAddress(event.currentTarget.dataset.editid)
  },
  deleteAddress(vReceiverGuid) {
    let that = this
    let token = wx.getStorageSync('token')
    api.deleteAddress(
      {
        token: token,
        vReceiverGuid: vReceiverGuid
      },
      function (res) {
        console.log(res)
        if (res.data.code == 0) {
          wx.showToast({
            title: '删除成功',
            icon: 'success',
            duration: 1500,
            success: function () {
              setTimeout(function () {
                that.getAllAddressInfo()
              }, 1500)
            }
          })
        } else {
          wx.showToast({
            title: res.data.message,
            image: '../../images/error.png',
            duration: 1500
          })
        }
      },
      function (err) {
        console.log(err)
      }
    )
  },

  // 跳转添加地址界面
  addAddress: function () {
    wx.navigateTo({
      url: '../editAddress/editAddress',
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
    console.log('=======监听页面显示=======')
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