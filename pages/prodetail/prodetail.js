var app = getApp()
Page({
    data:{
        projectId:null,
        isDotIndicator:true,
        autoplay:true,
        currentIndex:0,
        interval:3000,
        circular:true,
        changeSelectCount:1,
        cartCount:wx.getStorageSync('shopCartCount')
    },
    onLoad:function(options) {
        console.log(options)
        this.setData({
            projectId:options.productID
        })
        this.getData()
    },
    getData:function() {
        var _this = this
        wx.request({
            // url:'https://auth.iluxday.com/UIProduct/Detail',
            url:'http://10.10.0.101:91/UIProduct/Detail',
            data:{
                itemID:this.data.projectId
            },
            header:{
                'content-type':'application/json'
            },
            success:function(res){
                console.log(res)
                const data = res.data.data
                _this.setData({
                    prodetailBannerList:data.ImageList,
                    productName:data.ProductName,
                    productPrice:data.Price,
                    productItemID:data.ProductItemID
                })
            } 
        })
    },
    inputCount: function(e) {
        var num = e.detail.value;
        this.setData({
            changeSelectCount: num
        });
    },
    bindMinus: function() {
        var num = this.data.changeSelectCount;
        if (num > 1) {
            num --;
        }
        this.setData({
            changeSelectCount: num
        });
    },
    bindPlus: function() {
        var num = this.data.changeSelectCount;
        if (num > 0) {
            num ++;
        }
        this.setData({
            changeSelectCount: num
        });
    },
    onJoinCart:function(){
        var _this = this
        var customer = wx.getStorageSync('Customer')
        // var shopCartCount = wx.getStorageSync('shopCartCount')
        var itemList = []
        itemList.push({
            Quantity:this.data.changeSelectCount,
            ID:this.data.productItemID
        })
        wx.request({
          url: 'http://10.10.0.101:91/UIProduct/AddShopping',
          data: {
             CustomerID:customer.CustomerID,
             TempID:"Cart5e1dba34-a3c4-4615-9063-54ce18b1b298",
             ItemList:itemList
          },
          method: 'POST', 
          header: {
              'content-type':'application/json'
          }, 
          success: function(res){
            console.log(res)
            wx.setStorage({
              key: 'tempID',
              data: res.data.data.TempID
            })
            _this.setData({
                cartCount:_this.data.changeSelectCount + _this.data.cartCount
            })
            if(res.data.code == 0){
                wx.showToast({
                    icon:'success',
                    title:'加入成功'
                })
            }
          }
        })
    },
    jumpCartPage:function(){
        var productInfoList = {
            count : this.data.changeSelectCount,
            smallPic : this.data.prodetailBannerList[0].smallImageSrc,
            productName : this.data.productName,
            productPrice : this.data.productPrice,
            productID : this.data.projectId
        }
        // var count = this.data.changeSelectCount;
        // var smallPic = this.data.prodetailBannerList[0].smallImageSrc;
        // var productName = this.data.productName;
        // var productPrice = this.data.productPrice;
        // var productID = this.data.projectId;
        wx.switchTab({
          url: '../cart/cart?productInfoList=' + productInfoList 
        })
    }
})