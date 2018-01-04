// pages/groupDetail/groupDetail.js
const api = require('../../utils/api.js');
const stateType = require('../../utils/state.js');
const Time = require('../../utils/timeUtil.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isGroupState: true,  // 当前产品团购状态属性
    isDefaultOperat: true,
    isquestion: true,
    groupInfoText: '该订单已拼单成功，请您重新开团'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getGroupDetails(options.vGroupOrderGuid)
    this.getGroupUser(options.vGroupOrderGuid)
    // this.getGroupDetails()
    // this.getGroupUser()
  },

  // 获取详情信息
  getGroupDetails(vGroupOrderGuid) {
    let that = this
    let token = wx.getStorageSync('token')
    api.getGroupDetails(
      {
        token: token,
        vGroupOrderGuid: vGroupOrderGuid
      },
      function (res) {
        console.log(res)
        if (res.data.code == 0) {
          that.setGroupData (res.data.data)
        }
      },
      function (err) {
        console.log(err)
      }
    )
  },

  setGroupData (detailData) {
    // 计算剩余拼单名额
    let that = this
    let shenyuNumber = detailData.groupSize - detailData.orderSize
    // console.log('计算剩余拼单名额:' + shenyuName)
    let intervarTime = setInterval(function () {
      let downtime = Time.setDownTime(detailData.expiredDate)
      if (!downtime) {
        clearInterval(intervarTime);
        that.setData({
          countDown: '该团结束'
        })
      } else {
        that.setData({
          countDown: downtime
        })
      }
      
    },1000)

    // 判断团购状态
    if (detailData.vGroupOrderState == stateType.PIN_DAN_ZHONG) {
      this.setData({
        isGroupState: true
      })
    } else if (detailData.vGroupOrderState == stateType.PIN_WAN_WHENG || detailData.vGroupOrderState == stateType.PIN_QUO_QI) {
      this.setData({
        isGroupState: false,
      })
    }
    
    if (detailData.isHost && detailData.isGroupMember) {
      this.setData({
        isDefaultOperat: true
      })
    } else if (!detailData.isHost && detailData.isGroupMember) {
      this.setData({
        isDefaultOperat: true
      })
    } else if (!detailData.isHost && !detailData.isGroupMember) {
      this.setData({
        isDefaultOperat: false
      })
    }

    if (detailData.vGroupOrderState == stateType.PIN_WAN_WHENG) {
      this.setData({
        groupInfoText: '该订单已拼单成功，请您重新开团',
      })
    } else if (detailData.vGroupOrderState == stateType.PIN_QUO_QI) {
      this.setData({
        groupInfoText: '该订单已过时效，请您重新开团'
      })
    }

    var temp = {
      productImg: detailData.vShopProductLogo,
      title: detailData.vShopProductName,
      groupSize: detailData.groupSize,
      salesVolume: detailData.salesVolume,
      groupPrice: detailData.groupPrice,
      peopleNumber: shenyuNumber
    }
    this.setData({
      items: temp
    })
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
            userItems: res.data.data.recordList
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