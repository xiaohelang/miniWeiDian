// pages/KanList/KanList.js
const api = require('../../utils/api.js');
const stateType = require('../../utils/state.js');
const Time = require('../../utils/timeUtil.js');

var PAGESIZE = 5

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabData: ['砍价中', '已超时'],
    currentTab: 0, // tab切换状态
    listData: [],
    releseTime: '',
    currentPage: 1,
    state_val: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getKanJiaList(this.data.state_val, this.data.currentPage)
  },

  getKanJiaList(state_val, currentPage) {
    let that = this
    let token = wx.getStorageSync('token')
    api.getKanJiaList(
      {
        token: token,
        pageIndex: currentPage,
        pageSize: PAGESIZE,
        vGroupProductLogState: state_val
      },
      function (res) {
        console.log(res)
        if (res.data.code == 0) {
          that.setKanJiaList(res.data.data.rows)
        }
      },
      function (err) {
        console.log(err)
      }
    )
  },
  setKanJiaList (rowsData) {
    let kanArray = []
    for (let idx in rowsData) {
      // 计算砍价已砍价格
      let kanRrice = parseFloat((rowsData[idx].originalPrice - rowsData[idx].price).toFixed(2))
      // 砍价状态
      let kanJiaStateVal = ''
      if (rowsData[idx].vGroupProductLogState == stateType.KAN_JIA_ZHONG) {
        kanJiaStateVal = '砍价中'
      } else {
        kanJiaStateVal = '已超时'
      }
      this.setTime(rowsData[idx].createDate)

      let temp = {
        productImg: rowsData[idx].shopProductLogo,
        title: rowsData[idx].vShopProductName,
        des_title: rowsData[idx].shortIntro,
        originalPrice: rowsData[idx].originalPrice,
        price: rowsData[idx].price,
        kanRrices: kanRrice,
        kanJiaState: kanJiaStateVal,
        releseTime: this.data.releseTime,
        isMinCurret: true,
        vGroupProductLogGuid: rowsData[idx].vGroupProductLogGuid
      }
      kanArray.push(temp)
    }
    this.setData({
      listData: this.data.listData.concat(kanArray)
    })
  },
  setTime(creatTime) {
    let nowTime = Time.getNowFormatDate()
    nowTime = nowTime.replace(new RegExp('-', 'gm'), '/')
    let timeMill = (new Date(nowTime)).getTime()
    creatTime = creatTime.replace(new RegExp('-', 'gm'), '/')
    let millSecond = (new Date(creatTime)).getTime()
    let timeDiffer = timeMill - millSecond
    let days = Math.floor(timeDiffer / (24 * 3600 * 1000))
    let leavs1 = timeDiffer % (24 * 3600 * 1000)    //  计算天数后剩余的毫秒数
    let hour = Math.floor(leavs1 / (3600 * 1000))
    var leaves2 = leavs1 % (3600 * 1000)        //  计算小时数后剩余的毫秒数
    var minute = Math.floor(leaves2 / (60 * 1000))
    if (days === 0) {
      if (hour === 0) {
        if (minute === 0) {
          return this.data.releseTime = '刚刚'
        } else {
          return this.data.releseTime = minute + '分钟前'
        }
      } else {
        return this.data.releseTime = hour + '个小时前'
      }
    } else {
      return this.data.releseTime = days + '天前'
    }
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
    let curretVal
    if (event.target.dataset.current == 0 || event.target.dataset.current == 1) {
      curretVal = event.target.dataset.current + 1
    }
    this.setData({
      state_val: curretVal
    })
    this.data.currentPage = 1
    this.data.listData = []
    this.getKanJiaList(curretVal, this.data.currentPage)
  },

  // 跳转到砍价详情页
  jumpKanDetail: function (event) {
    let vGroupProductLogGuid = event.currentTarget.dataset.vgroupproductlogguid;
    wx.navigateTo({
      url: '../kanJiaDetail/kanJiaDetail?vGroupProductLogGuid=' + vGroupProductLogGuid + '',
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
  
    this.data.currentPage += 1
    this.getKanJiaList(this.data.state_val, this.data.currentPage)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})