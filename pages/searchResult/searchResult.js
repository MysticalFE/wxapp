Page({
    data:{
        keyword:'',
        shoppingListItems:null,
        isnull:false,//false 结果为不空
        isLoad:false,
        pageNum:1,
        onepagesize:10,
        nullTip:{
            tipText:"没有搜索到商品，返回换个关键词试试吧"
        }
    },
    onLoad:function(options){
        console.log(options)
        const _this = this
        this.setData({
            keyword:options.keyword
        })
        console.log(this.data.keyword)
        wx.request({
          url: 'https://auth.iluxday.com/Search/Search?keyword=' + this.data.keyword,
          data: {
            page:this.data.pageNum,
            pagesize:this.data.onepagesize
          },
          method: 'GET', 
          header: {
              'content-type':'application/json'
          }, 
          success: function(res){
              console.log(res)
              _this.setData({
                  shoppingListItems:res.data.data.ProductListItems
              })
          },
          fail: function(){
              console.log(请求失败)
          },
          complete: function() {
            // complete
            const curpageNum = _this.data.pageNum + 1;
            _this.setData({
                pageNum:curpageNum
            })
          }
        })
    },
    onReachBottom:function(){
        console.log('到底了')
        wx.showToast({
            title:'加载中...',
            icon:'loading',
            dduration:2000,
            mask:true
        })
        var _this = this;
        wx.request({
            url:'https://auth.iluxday.com/Search/Search?keyword=' + this.data.keyword,
            data:{
                page:_this.data.pageNum,
                pagesize:_this.data.onepagesize
            },
            method:'GET',
            header:{
                'content-type':'application/json'
            },
            success:function(res){
                console.log(res)
                var shoppingList = res.data.data.ProductListItems
                var lastpagesize = res.data.data.PageInfo.PageSize;
                var objects =_this.data.shoppingListItems.concat(shoppingList);
                if(shoppingList.length>=1){
                _this.data.isLoad = false
                    _this.setData({
                        shoppingListItems:objects,
                    })
                    wx.hideToast()
                }else{
                    _this.data.isLoad = true
                    wx.showToast({
                        title:'没有更多了',
                        icon:'success',
                        dduration:1000,
                        mask:true
                    })
                }
                _this.setData({
                    "pageNum":_this.data.pageNum + 1
                })
            }
        })
    }
})