// pages/order/order.js
Page({
  data: {
    customerID: wx.getStorageSync('Customer').CustomerID
  },
  onShow(options) {
    this.renderData()
  },
  renderData() {
    wx.request({
      url: 'http://10.10.0.101:91/Shopping/CheckOutOrder',
      data: {
        CustomerID: this.data.customerID,
        ShipAddressID: wx.getStorageSync('Customer') || '',
        CrossBorder: 1,
        FromSource: 'WAP',
        ItemList: wx.getStorageInfoSync('itemList')
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        var _this = this
        let orderInfo = res.data;
        _this.isAddress(orderInfo)
      }
    })
  },
  isAddress(orderInfo) {
    console.log(orderInfo)
    if (orderInfo.code == 0) {
        if(orderInfo.data.Address.length > 0){

        } else {
            wx.showModal({
              title:'提示',
              content:'您还没有添加地址,请点击确定,添加地址',
              showCancel:false,
              success:(res) => {
                  if(res.confirm){
                      wx.navigateTo({
                        url: '../address/address'
                      })
                  }
              }
            })
        }
    } else {
        if(orderInfo.desc == "当前地区暂不支持配送,请重新选择收货地址。" || orderInfo.desc == "收货地址不存在！"){

        }
    }
  },
  showShopOrder() {

  },
  deliveryMethod() {

  },
  payMethod() {

  },
  discountMethod() {

  },
  submitOrder() {

  },
  ShoppingCost() {

  }
})