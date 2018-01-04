// pages/groupSuccess/groupSuccess.js
const api = require('../../utils/api.js');
const stateType = require('../../utils/state.js');
const Time = require('../../utils/timeUtil.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    verfiCode: false,
    isquestion: false,
    addressInfo: true,
    qqNumber: false,
    isquestion: true,
    userItems: {},
    contactsData: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getGroupUser(options.vGroupOrderGuid)
    this.getContacts(options.vOrderGuid)
  },

  // 获取用户头像列表
  getGroupUser(vGroupOrderGuid) {
    let that = this
    let token = wx.getStorageSync('token')
    api.getGroupUser(
      {
        token: token,
        vGroupOrderGuid: vGroupOrderGuid
      },
      function (res) {
        console.log(res)
        if (res.data.code == 0) {
          that.setData({
            userItems: res.data.data.recordList,
          })
        }
      },
      function (err) {
        console.log(err)
      }
    )
  },

  // 获取联系人详情信息
  getContacts(vOrderGuid) {
    let that = this
    let token = wx.getStorageSync('token')
    api.getOrderDetail (
      {
        token: token,
        // 70B2F750-A86A-4D7B-B4AD-2DEFCB100721
        // 59160F90-7639-4F5B-9430-3644D3AB3A42
        vOrderGuid: vOrderGuid,
      },
      function (res) {
        console.log(res)
        if (res.data.code == 0) {
          that.setContacts(res.data.data)
        }
      },
      function (err) {
        console.log(err)
      }
    )
  },
  
  setContacts (modleData) {

    // 处理虚拟，实物产品联系信息
    let consigneeInfo
    let iphoneInfo
    if (modleData.vShopProductType == stateType.SHI_WU_GOODS) {
      consigneeInfo = modleData.consignee,
      iphoneInfo = modleData.phone
    } else {
      consigneeInfo = modleData.contactName,
      iphoneInfo = modleData.mobilePhone
      this.setData({
        addressInfo: false,
        qqNumber: true
      })
    }
    // 处理虚拟产品消费码
    if (modleData.vShopProductType == stateType.XU_NI_GOODS) {
      this.getQrCode(modleData.vOrderGuid)
      this.setData({
        verfiCode: true
      })
    }
    let temp = {
      shopName: modleData.vShopProductName,
      consignee: consigneeInfo,
      iphone: iphoneInfo,
      detailAddress: modleData.detailAddress,
      groupCompleteDate: modleData.groupCompleteDate,
      verifyCode: modleData.verifyCode,
      qqNum: modleData.qq
    }
    this.setData({
      contactsData: temp
    })
  },

  // 获取虚拟消费二维码
  getQrCode(vOrderGuid) {
    let that = this
    let token = wx.getStorageSync('token')
    api.getQrCode(
      {
        token: token,
        vOrderGuid: vOrderGuid
      },
      function (res) {
        console.log(res)
        if (res.data.code == 0) {
          that.setData({
            codeImg: res.data.data.qrcodeUrl
          })
        }
      },
      function (err) {
        console.log(err)
      }
    )
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
})