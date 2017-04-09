// pages/cart/cart.js
var app = getApp()
Page({
  data:{
    shopCart:null,
    cartProductList:null,
    total:0,
    itemList:[]
  },
  onShow:function(options){//此处用onShow 或 onLoad方法是不一样的
    // 页面初始化 options为页面跳转所带来的参数
    var _this = this
    const customer = wx.getStorageSync('Customer')
    const tempID = wx.getStorageSync('tempID')
    wx.request({
      url: 'http://10.10.0.101:91/Shopping/ShopCart',
      data: {
        CustomerID:customer.CustomerID,
        TempID:tempID
      },
      method: 'POST',
      header: {
        'content-type':'application/json'
      },
      success: function(res){
        // console.log(res)
        _this.setData({
          shopCart:res.data.data.ShopCart,
          cartProductList:res.data.data.ShopCartProduct
        })
        wx.setStorageSync('shopCartCount', _this.data.shopCart.ShopCartCount)
        console.log(_this.data.cartProductList)
        _this.sum()
      }
    })
  },
  bindMinus: function(e) {
    // console.log(e)
      var index = parseInt(e.currentTarget.dataset.index);
      var num = this.data.cartProductList[index].Num;
      if (num > 1) {
          num --;
      }
      if(num == 1){
        wx.showToast({
              title:'至少选择一件商品哟'
          })
      }
      this.data.cartProductList[index].Num = num;
      this.setData({
        cartProductList:this.data.cartProductList
      })
      this.sum()
  },
  bindPlus: function(e) {
      var index = parseInt(e.currentTarget.dataset.index);
      var num = this.data.cartProductList[index].Num;
      if (num > 0) {
          num ++;
      }
      this.data.cartProductList[index].Num = num;
      this.setData({
        cartProductList:this.data.cartProductList
      })
      this.sum()
  },
  bindCheckbox:function(e){
    console.log(e)
    var index = parseInt(e.currentTarget.dataset.index);
    var selected = this.data.cartProductList[index].IsCheck
    if(selected == 0){
        this.data.cartProductList[index]. IsCheck = 1 
    }else{
        this.data.cartProductList[index]. IsCheck = 0 
    }
    this.setData({
      cartProductList:this.data.cartProductList
    })
    this.sum()
  },
  bindSeclectAll:function(){
    
  },
  JumpProdetail:function(){

  },
  bindDelectOne:function(e){
    var index = parseInt(e.currentTarget.dataset.index);
    var _this = this;
    wx.showModal({
      title:'提示',
      content:'确定要删除该商品？',
      success:function(){
        wx.request({
          url: 'http://10.10.0.101:91/UIProduct/DeleteShopping',
          data: {
            ShopCartProductID:_this.data.cartProductList[index].ShopCartProductID
          },
          method: 'DELETE', 
          header: {
            'content-type':'application/json'
          }, 
          success: function(res){
            console.log(res)
          },
          fail: function() {
            
          }
        })
      }
    })
  },
  bindDelectAll:function(){

  },
  bindCheckout:function(){
    var itemList = [];
    const shopItemList = this.data.cartProductList
    for(const i in shopItemList){
      // if(shopItemList[i].IsCheck == 1){
        itemList.push({
            quantity:shopItemList[i].Num,
            ID:shopItemList[i].ProductItemID
          })
      // }
      wx.navigateTo({
        url: '../order/order'
      })
      // }else{
      //   wx.showModal({
      //     title:'提示',
      //     content:'至少选择一件商品才能结算哟'
      //   })
      // }
    }
    this.setData({
      itemList:itemList
    })
    wx.setStorage({
      key:'itemList',
      data:this.data.itemList
    })
  },
  sum:function(){
    var total = 0
    var shopItemList = this.data.cartProductList

    // for(var i = 0;i<this.data.cartProductList;i++){
      for(const i in shopItemList){
        if(shopItemList[i].IsCheck == 1){
          total += shopItemList[i].Num * shopItemList[i].Price;
        }
      }
    // }
    total = total.toFixed(2);
    this.setData({
      total:total
    })
  }
})