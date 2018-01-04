// pages/myOrder/myOrder.js
const api = require('../../utils/api.js');
const stateType = require('../../utils/state.js');
// const currentPage = 1
const PAGESIZE = 5

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabData: ['全部','待付款','待发货','待收货'],
    currentTab: 0, // tab切换状态
    listDatas:[],
    isFlat: true,
    currentPage: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let currentTabVal = wx.getStorageSync('currentTab')
    this.setData({
      currentTab: currentTabVal
    })

    if (currentTabVal == 2 || currentTabVal == 3) {
      currentTabVal = parseInt(currentTabVal) + 1
    }
    this.getOrderList(currentTabVal, this.data.currentPage)
  },

  // 切换tab状态
  tabSwitch: function (event) {
    let that = this
    console.log(event.target.dataset.current)
    if (this.data.currentTab === event.target.dataset.current) {
      return false
    } else {
      that.setData({
        currentTab: event.target.dataset.current
      })
    }
    that.data.listDatas = []
    let curret_val = event.target.dataset.current
    if (curret_val == 2 || curret_val == 3) {
      curret_val = curret_val + 1
    }
    this.data.currentPage = 1 // 重新初始化页数
    // console.log('页数' + this.data.currentPage)
    that.getOrderList(curret_val, this.data.currentPage)
  },

  // 获取订单列表数据
  getOrderList(state_val, currentPage) {
    let that = this
    let token = wx.getStorageSync('token')
    api.getOrderList(
      {
        token: token,
        pageIndex: currentPage,
        pageSize: PAGESIZE,
        state: state_val
      },
      function (res) {
        console.log(res)
        if (res.data.code == 0) {
          that.setOrdersData(res.data.data.rows)
        }
      },
      function (err) {
        console.log(err)
      }
    )
  },
  setOrdersData (rows) {
    
    var listData = []
    let stateVal= ''
    for (var idx in rows) {
      // 状态类型处理
      if (rows[idx].vOrderState == stateType.DAI_FU_KUAN){
        stateVal = '待付款'
      } else if (rows[idx].vOrderState == stateType.DAI_FA_HUO){
        if (rows[idx].vShopProductType == stateType.SHI_WU_GOODS){
          stateVal = '待发货'
        } else {
          stateVal = '待消费'
        }
      } else if (rows[idx].vOrderState == stateType.DAI_SHOU_HUO) {
        stateVal = '待收货'
      } else if (rows[idx].vOrderState == stateType.WAN_CHENG) {
        stateVal = '交易完成'
      } else if (rows[idx].vOrderState == stateType.TUI_KUAN_IN) {
        stateVal = '退款中'
      } else if (rows[idx].vOrderState == stateType.TUI_KUAN_OUT) {
        stateVal = '已退款'
      } else if (rows[idx].vOrderState == stateType.GUO_QI) {
        stateVal = '过期'
      }
      var temp = {
        shopName: rows[idx].vShopName,
        productImg: rows[idx].vShopProductLogo,
        title: rows[idx].vShopProductName,
        des_title: rows[idx].shortIntro,
        price: rows[idx].price,
        marketPrice: rows[idx].marketPrice,
        num: rows[idx].quantity,
        totalMoney: rows[idx].totalMoney,
        stateType: stateVal,
        type_value: rows[idx].vOrderState,
        vOrderGuid: rows[idx].vOrderGuid,
      }
      listData.push(temp)
    }
    this.setData({
      listDatas: this.data.listDatas.concat(listData)
    })
  },

  // 取消订单功能
  cancelBtn: function (event) {
    let that = this
    let vOrderGuid = event.currentTarget.dataset.vorderguid
    wx.showModal({
      title: '提示',
      content: '是否取消该订单',
      success: function (res){
        if (res.confirm) {
          console.log(vOrderGuid)
          that.cancelOrder(vOrderGuid)
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  cancelOrder(vOrderGuid) {
    let that = this
    let token = wx.getStorageSync('token')
    api.cancelOrder(
      {
        token: token,
        vOrderGuid: vOrderGuid
      },
      function (res) {
        if (res.data.code == 0) {
          wx.showToast({
            title: '取消成功',
            icon: 'success',
            duration: 1500,
            success: function () {
              setTimeout(function () {
                that.data.listDatas = []
                that.getOrderList(that.data.currentTab, 1)
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

  // 跳转到订单详情页
  jumOrder: function (event) {
    let vOrderGuid = event.currentTarget.dataset.vorderguid;
    wx.navigateTo({
      url: '../orderPage/orderPage?vOrderGuid=' + vOrderGuid + '',
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
    // console.log('111')
    this.data.currentPage += 1
    // console.log(this.data.currentPage)
    this.getOrderList(this.data.currentTab, this.data.currentPage)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})