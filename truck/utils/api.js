const baseUrl = 'http://vshop-t.wxsapp.com'
// 1.获取店铺信息
const shopInfoUrl = baseUrl + '/vshop/info.do'
// 2.获取产品
const productUrl = baseUrl + '/vshop/product/page.do'
// 3.获取产品详情页数据
const detailsUrl = baseUrl + '/vshop/product/info.do'
// 4.微店商品活动
const activesUrl = baseUrl + '/vgroup/product/all.do'
// 5.获取所有用户地址信息
const allAddressInfoUrl = baseUrl + '/user/vreceiver/all.do'
// 6.获取收货地址信息
const addressInfoUrl = baseUrl + '/user/vreceiver/info.do'
// 7.修改地址
const updataAddressUrl = baseUrl + '/user/vreceiver/update.do'
// 8.保存填写地址信息
const saveAddressUrl = baseUrl + '/user/vreceiver/add.do'
// 9.删除地址
const deleteAddressUrl = baseUrl + '/user/vreceiver/delete.do'
// 10.获取个人用户信息
const personalUrl = baseUrl + '/user/personal.do'
// 11.我的订单列表
const orderListUrl = baseUrl + '/user/vorder/page.do'
// 12.订单详情
const OrderDetailUrl = baseUrl + '/user/vorder/info.do'
// 13. 虚拟服务类，获取二维码信息
const QrCodeUrl = baseUrl + '/user/vorder/qrcode.do'
// 14.我的拼单
const groupUrl = baseUrl + '/user/vgroup/order/page.do'
// 15.拼单详情
const groupDetailUrl = baseUrl + '/user/vgroup/order/info.do'
// 16.拼单用户列表
const groupUserUrl = baseUrl + '/vgroup/order/member/all.do'
// 17.我的订单数量提示图标
const iconCountUrl = baseUrl + '/user/vorder/order_count.do'
// 18.拼团成员列表
const groupMemberUrl = baseUrl + '/vgroup/order/all.do'
// 19.我的砍价列表
const kanJiaListUrl = baseUrl + '/user/vgroup/product/log/page.do'
// 20.砍价详情
const kanJiaDetailUrl = baseUrl + '/user/vgroup/product/log/info.do'
// 21.砍价用户列表
const userKanListUrl = baseUrl + '/vshop/product/share/log/all.do'
// 22.帮忙砍价
const userKanHelpUrl = baseUrl + '/user/vshop/product/share/log/add.do'
// 23.取消订单
const cancelOrderUrl = baseUrl + '/user/vorder/cancel.do'
// 24.实物订单确认收货
const confirmReceiptUrl = baseUrl + '/user/vorder/update_complete.do'


// 1.获取店铺信息
function getShopInfo(data, success, error) {
  request(shopInfoUrl, data,
    function (res) {
      success && success(res)
    },
    function (err) {
      error && error(err)
    }
  )
}

// 2.获取产品
function getProduct(data, success, error) {
  request(productUrl, data,
    function (res) {
      success && success(res)
    },
    function (err) {
      error && error(err)
    }
  )
}

// 3.获取产品详情页数据
function getDetails(data, success, error) {
  request(detailsUrl, data,
    function (res) {
      success && success(res)
    },
    function (err) {
      error && error(err)
    }
  )
}

// 4.微店商品活动
function getActives(data, success, error) {
  request(activesUrl, data,
    function (res) {
      success && success(res)
    },
    function (err) {
      error && error(err)
    }
  )
}

// 5.获取所有用户地址信息
function getAllAddressInfo(data, success, error) {
  request(allAddressInfoUrl, data,
    function (res) {
      success && success(res)
    },
    function (err) {
      error && error(err)
    }
  )
}

// 6.获取收货地址信息
function getAddressInfo(data, success, error) {
  request(addressInfoUrl, data,
    function (res) {
      success && success(res)
    },
    function (err) {
      error && error(err)
    }
  )
}

// 7.修改地址
function updataAddress(data, success, error) {
  request(updataAddressUrl, data,
    function (res) {
      success && success(res)
    },
    function (err) {
      error && error(err)
    }
  )
}

// 8.保存填写地址信息
function saveAddressInfo(data, success, error) {
  request(saveAddressUrl, data,
    function (res) {
      success && success(res)
    },
    function (err) {
      error && error(err)
    }
  )
}

// 9.删除地址
function deleteAddress(data, success, error) {
  request(deleteAddressUrl, data,
    function (res) {
      success && success(res)
    },
    function (err) {
      error && error(err)
    }
  )
}

// 10.获取个人用户信息
function getPersonal(data, success, error) {
  request(personalUrl, data,
    function (res) {
      success && success(res)
    },
    function (err) {
      error && error(err)
    }
  )
}

// 11.我的订单列表
function getOrderList(data, success, error) {
  request(orderListUrl, data,
    function (res) {
      success && success(res)
    },
    function (err) {
      error && error(err)
    }
  )
}

// 12.订单详情
function getOrderDetail(data, success, error) {
  request(OrderDetailUrl, data,
    function (res) {
      success && success(res)
    },
    function (err) {
      error && error(err)
    }
  )
}

// 13. 虚拟服务类，获取二维码信息
function getQrCode(data, success, error) {
  request(QrCodeUrl, data,
    function (res) {
      success && success(res)
    },
    function (err) {
      error && error(err)
    }
  )
}

// 14.我的拼单
function getGroup(data, success, error) {
  request(groupUrl, data,
    function (res) {
      success && success(res)
    },
    function (err) {
      error && error(err)
    }
  )
}

// 15.拼单详情
function getGroupDetails(data, success, error) {
  request(groupDetailUrl, data,
    function (res) {
      success && success(res)
    },
    function (err) {
      error && error(err)
    }
  )
}

// 16.拼单用户列表
function getGroupUser(data, success, error) {
  request(groupUserUrl, data,
    function (res) {
      success && success(res)
    },
    function (err) {
      error && error(err)
    }
  )
}

// 17.我的订单数量提示图标
function getIconCount(data, success, error) {
  request(iconCountUrl, data,
    function (res) {
      success && success(res)
    },
    function (err) {
      error && error(err)
    }
  )
}

// 18.拼团成员列表
function getGroupMember(data, success, error) {
  request(groupMemberUrl, data,
    function (res) {
      success && success(res)
    },
    function (err) {
      error && error(err)
    }
  )
}

// 19.我的砍价列表
function getKanJiaList(data, success, error) {
  request(kanJiaListUrl, data,
    function (res) {
      success && success(res)
    },
    function (err) {
      error && error(err)
    }
  )
}

// 20.砍价详情
function getKanJiaDetail(data, success, error) {
  request(kanJiaDetailUrl, data,
    function (res) {
      success && success(res)
    },
    function (err) {
      error && error(err)
    }
  )
}

// 21.砍价用户列表
function getUserKanList(data, success, error) {
  request(userKanListUrl, data,
    function (res) {
      success && success(res)
    },
    function (err) {
      error && error(err)
    }
  )
}

// 22.帮忙砍价
function getUserKanHelp(data, success, error) {
  request(userKanHelpUrl, data,
    function (res) {
      success && success(res)
    },
    function (err) {
      error && error(err)
    }
  )
}

// 23.取消订单
function cancelOrder(data, success, error) {
  request(cancelOrderUrl, data,
    function (res) {
      success && success(res)
    },
    function (err) {
      error && error(err)
    }
  )
}

// 24.实物订单确认收货confirmReceiptUrl
function confirmReceipt(data, success, error) {
  request(confirmReceiptUrl, data,
    function (res) {
      success && success(res)
    },
    function (err) {
      error && error(err)
    }
  )
}

// 封装请求
function request(strUrl, data, success, error) {
  wx.request({
    url: strUrl,
    data: data,
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function (res) {
      success && success(res)
    },
    error: function (err) {
      error && error(err)
    }
  })
}

module.exports = {
  getShopInfo,
  getProduct,
  getDetails,
  getActives,
  getAllAddressInfo,
  getAddressInfo,
  updataAddress,
  saveAddressInfo,
  deleteAddress,
  getPersonal,
  getOrderList,
  getOrderDetail,
  getQrCode,
  getGroup,
  getGroupDetails,
  getGroupUser,
  getIconCount,
  getGroupMember,
  getKanJiaList,
  getKanJiaDetail,
  getUserKanList,
  getUserKanHelp,
  cancelOrder,
  confirmReceipt
}