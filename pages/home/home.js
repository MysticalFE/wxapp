var app = getApp()
Page({
    data:{
      "isDotIndicator":true,
      "autoplay":true,
      "currentIndex":0,
       "focus":false,
       "interval":3000,
       "circular":true,
       "isLoad":false,
       "pageNum":1,
       "onepagesize":10,
       "tipText":"查看更多",
       "imgDesc":[{
            imgId:1,
            imgUrl:"images/home_group_icon.png",
            iconDesc: "爱拼团"
       },{
            imgId:2,
            imgUrl:"images/home_global_icon.png",
            iconDesc: "全球好货"
       },{
            imgId:3,
            imgUrl:"images/home_icon_kuajinxuzhi.png",
            iconDesc: "跨境须知"
       },{
            imgId:4,
            imgUrl:"images/home_fanxian_icon.png",
            iconDesc: "邀请返现"
       }]
    },
    onLoad:function () {
      this.bannerReq()
      wx.showToast({
          title:'加载中...',
          icon:'loading',
          mask:true
      })
    },
    bannerReq: function(){
      const _this = this;
      wx.request({
        // url: 'https://auth.iluxday.com/RestHome/Index',
        url:'http://10.10.0.101:91/RestHome/Index',
        data: {
          pageNumber:this.data.pageNum,
          pagesize:this.data.onepagesize
        },
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
           'content-type':'applicstion/json'
         }, 
        success: function(res){
          console.log(res)
          var data = res.data.data;
          var shoppingList = data.ProductListItems; 
          const slideList = [];
          for(var imgurl of data.BannerList){
            slideList.push(imgurl.ImageURL)
          }
          console.log(slideList);
          _this.setData({
            imgUrls: slideList,
            shoppingListItems:shoppingList
          })
          wx.hideToast()
        },
        fail: function() {
          console.log('图片加载失败')
        },
        complete:function(){
          const curpageNum = _this.data.pageNum + 1;
          _this.setData({
              "pageNum":curpageNum
          })
        }
      })
    },
    loadMore:function(){
        var _this = this;
        this.setData({
          tipText:'正在加载中...'
        })
        wx.showToast({
          title:'努力加载中...',
          icon:'loading',
          duration:2000,
          mask:true,
          success:function(){

          },
          complete:function(){

          }
        })
        this.getMoreShopping()
    },
    getMoreShopping:function(){
      var _this = this;
      wx.request({
        // url: 'https://auth.iluxday.com/RestHome/Index',
        url:'http://10.10.0.101:91/RestHome/Index',
        data: {
          pageNumber:_this.data.pageNum,
          pagesize:_this.data.onepagesize
        },
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
          'content-type':'applicstion/json'
        }, // 设置请求的 header
        success: function(res){
          console.log(res)
          if(res.statusCode == 200){
            var data = res.data.data;
            var shoppingList = data.ProductListItems;
            var lastpagesize = data.PageInfo.PageSize;
            var objects =_this.data.shoppingListItems.concat(shoppingList);
            if(lastpagesize>=1){
              _this.data.isLoad = false
              _this.setData({
                shoppingListItems:objects,
                tipText:'查看更多',
              })
            }else{
              _this.data.isLoad = true
              _this.setData({
                tipText:'没有更多了...'
              })
            }
            wx.hideToast()
          }
          this.setData({
              "pageNum":this.data.pageNum + 1
      })
        },
        fail: function() {
          _this.setData({
            tipText:'查看更多'
          })
          wx.hideToast()
        }
      })
    },
    viewSearch:function(){
        wx.navigateTo({
            url: '../search/search'
        })
    },
    bindLogin:function(){
      wx.switchTab({
        url:'../myCenter/myCenter'
      })
    }
})