// pages/addAddress/addAddress.js
const api = require('../../utils/api.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: '',
    userInphone: '',
    userDetailAddress: '',
    region: ['广东省', '广州市', '天河区'],
    isDefault: true,
    iconType: ['circle', 'success'],
    addressInfo: {},
    buttonState: true,
    vReceiverGuid: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    console.log(options.vReceiverGuid)
    this.getAddressInfo(options.vReceiverGuid)
    if (options.vReceiverGuid == undefined) {
      this.setData({
        buttonState: false
      })
    } else {
      this.setData({
        buttonState: true
      })
    }
    this.setData({
      vReceiverGuid: options.vReceiverGuid
    })
  },

  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  //获取用户输入的用户名
  userNameInput: function (event) {
    this.setData({
      userName: event.detail.value
    })
  },
  //获取用户输入的联系电话号码
  userInphoneInput: function (event) {
    this.setData({
      userInphone: event.detail.value
    })
  },
  //获取用户输入的详情地址
  userDetailAddressInput: function (event) {
    this.setData({
      userDetailAddress: event.detail.value
    })
  },
  // 提交填写资料
  submiBtn: function () {
    console.log('111')
    let token = wx.getStorageSync('token')
    let that = this
    let province = this.data.region[0]
    let city		 = this.data.region[1]
    let area     = this.data.region[2]
    if (!(/^1[34578]\d{9}$/.test(this.data.userInphone))) {
      wx.showToast({
        title: '号码不正确',
        image: '../../images/error.png',
        duration: 1500
      })
      return false
    }
    api.saveAddressInfo(
      {
        token: token,
        consignee: that.data.userName,
        phone: that.data.userInphone,
        province: province,
        city: city,
        area: area,
        detailAddress: that.data.userDetailAddress,
        isDefault: that.data.isDefault
      },
      function (res) {
        console.log(res)
        if (res.data.code == 0) {
          wx.showToast({
            title: '添加成功',
            icon: 'success',
            duration: 1500,
            success: function () {
              setTimeout(function () {
                wx.navigateBack({
                  delta: 1
                })
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

      }
    )
  },
  // 获取地址详情信息
  getAddressInfo (vReceiverGuid) {
    let that = this
    let token = wx.getStorageSync('token')
    api.getAddressInfo(
      {
        token: token,
        vReceiverGuid: vReceiverGuid,
      },
      function (res) {
        console.log(res)
        if (res.data.code == 0) {
          that.setData({
            addressInfo: res.data.data,
            userName: res.data.data.consignee,
            userInphone: res.data.data.phone,
            userDetailAddress: res.data.data.detailAddress,
            isDefault: res.data.data.isDefault,
            region: [res.data.data.province, res.data.data.city, res.data.data.area]
          })
        }
      },
      function (err) {
        console.log(err)
      }
    )
  },
  // 修改地址
  updataBtn: function (event) {
    console.log(this.data.vReceiverGuid)
    console.log(this.data.isDefault)
    if (!(/^1[34578]\d{9}$/.test(this.data.userInphone))) {
      wx.showToast({
        title: '号码不正确',
        image: '../../images/error.png',
        duration: 1500
      })
      return false
    }
    this.updataAddress(this.data.vReceiverGuid)
  },
  updataAddress(vReceiverGuid) {
    let that = this
    let token = wx.getStorageSync('token')
    api.updataAddress(
      {
        token: token,
        vReceiverGuid: vReceiverGuid,
        consignee: that.data.userName,
        phone: that.data.userInphone,
        detailAddress: that.data.userDetailAddress,
        province: that.data.region[0],
        city: that.data.region[1],
        area: that.data.region[2],
        isDefault: that.data.isDefault,
      },
      function (res) {
        console.log(res)
        if (res.data.code == 0) {
          wx.showToast({
            title: '修改成功',
            icon: 'success',
            duration: 1500,
            success: function () {
              setTimeout(function () {
                wx.navigateBack({
                  delta: 1
                })
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
      function (res) {
        console.log(res)
      }
    )
  },
  // 选择默认地址属性
  seletDefault: function () {
    let isDefault = this.data.isDefault
    if (isDefault) {
      this.setData({
        isDefault: false,
      })
    } else {
      this.setData({
        isDefault: true
      })
    }
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