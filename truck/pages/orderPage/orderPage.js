// pages/orderPage/orderPage.js
const api = require('../../utils/api.js');
const stateType = require('../../utils/state.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    verfiCode: false,
    fukuanState: false,
    sureShouhuo: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getOrderDetail(options.vOrderGuid)
  },

  getOrderDetail(vOrderGuid) {
    let that =  this
    let token = wx.getStorageSync('token')
    api.getOrderDetail(
      {
        token: token,
        vOrderGuid: vOrderGuid,
      },
      function (res) {
        console.log(res)
        if (res.data.code == 0) {
          that.orderInfo (res.data.data)
        }
      },
      function (err) {
        console.log(err)
      }
    )
  },

  orderInfo (Info) {
    var stateVal = ''
    if (Info.vOrderState == stateType.DAI_FU_KUAN) {
      stateVal = '待付款'
    } else if (Info.vOrderState == stateType.DAI_FA_HUO) {
      if (Info.vShopProductType == stateType.SHI_WU_GOODS) {
        stateVal = '待发货'
      } else {
        stateVal = '待消费'
      }
    } else if (Info.vOrderState == stateType.DAI_SHOU_HUO) {
      stateVal = '待收货'
    } else if (Info.vOrderState == stateType.WAN_CHENG) {
      stateVal = '交易完成'
    } else if (Info.vOrderState == stateType.TUI_KUAN_IN) {
      stateVal = '退款中'
    } else if (Info.vOrderState == stateType.TUI_KUAN_OUT) {
      stateVal = '已退款'
    } else if (Info.vOrderState == stateType.GUO_QI) {
      stateVal = '过期'
    }
    // 处理消费码
    if (Info.vShopProductType == stateType.XU_NI_GOODS && Info.vOrderState == stateType.DAI_FA_HUO) {
      this.getQrCode(Info.vOrderGuid)
      this.setData({
        verfiCode: true
      })
    }

    if (Info.vOrderState == stateType.DAI_FU_KUAN){
      this.setData({
        fukuanState: true
      })
    }
    if (Info.vOrderState == stateType.DAI_SHOU_HUO && Info.vShopProductType == stateType.SHI_WU_GOODS) {
      this.setData({
        sureShouhuo: true
      })
    }

    var temp = {
      shopName: Info.vShopName,
      productImg: Info.vShopProductLogo,
      title: Info.vShopProductName,
      price: Info.price,
      des_title: Info.shortIntro,
      marketPrice: Info.marketPrice,
      num: Info.quantity,
      totalMoney: Info.totalMoney,
      orderNo: Info.vOrderNo,
      stateType: stateVal,
      orderTime: Info.createDate,
      userName: Info.consignee,
      userIphone: Info.phone,
      userAddress: Info.detailAddress,
      verifyCode: Info.verifyCode,
      vOrderGuid: Info.vOrderGuid
    }
    this.setData({
      items: temp
    })
  },

  // 获取获取二维码信息
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

  // 确认收货功能
  sureGoodBtn: function (event) {
    let vOrderGuid = event.currentTarget.dataset.vorderguid
    this.confirmReceipt(vOrderGuid)
  },

  confirmReceipt(vOrderGuid) {
    let that = this
    let token = wx.getStorageSync('token')
    api.confirmReceipt(
      {
        token: token,
        vOrderGuid: vOrderGuid
      },
      function (res) {
        console.log(res)
        if (res.data.code == 0) {
          wx.showToast({
            title: '收货成功',
            icon: 'success',
            duration: 1500,
            success: function () {
              setTimeout(function () {
                that.getOrderDetail(vOrderGuid)
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