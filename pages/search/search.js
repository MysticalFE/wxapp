var app = getApp()
Page({
    data:{
        inputKeyword:'',
        searchType:'keyword',
        hotKeywordList:'',
        tipKeyword:'',
        tipKeywordList:null,
        historyKeyword:[],
        protectList:null,
        pageNum:1,
        pagesize:10,
        hideHistory:true
    },
    onLoad:function(){
        const _this = this
        _this.searchByHotWord()
        _this.showSearchstorage()
    },
    search:function(e){
        console.log(e)
        var _this = this
        var keyword = e.detail.value.keyword
        console.log(keyword)
        if(keyword == ''){
           _this.setData({
                inputKeyword:_this.data.defaultKeyword
            })
            wx.showModal({
                title:'提示',
                content:'输入不能为空哟',
                showCancel:false,
                success:function(res){
                    if(res.confirm){
                        console.log('点击了')
                    }
                }
            })
        }else{
            wx.request({
            //   url: 'https://auth.iluxday.com/Search/Search',
            url:'http://10.10.0.101:91/Search/Search',
              data: {
                  keyword:keyword
              },
              method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
              header: {
                  'content-type':'application/json'
              }, // 设置请求的 header
              success: function(res){
                console.log(res)
                _this.setData({
                    'inputKeyword':keyword
                })
              }
            })
        }
        _this.setSearchstorage();
    },
    bindKeywordInput:function (e) {
        const _this = this
        _this.setData({
            inputKeyword:e.detail.value,
            hideHistory:true
        })
        _this.bindTipKeyword()
    },
    searchByHotWord:function(){
        var _this = this
        wx.request({
        //   url: 'https://auth.iluxday.com/Search/HotKey',
        url:'http://10.10.0.101:91/Search/HotKey',
          data: {

          },
          method: 'GET',
          header: {
              'content-type':'application/json'
          },
          success: function(res){
              var hotKeyList = res.data.data.SearchKeyList
              _this.setData({
                  hotKeywordList:hotKeyList,
                  defaultKeyword:res.data.data.DefaultKey
              })
          }
        })
    },
    bindTipKeyword:function(){
        var _this = this
        wx.request({
            // url:'https://auth.iluxday.com/Search/Autokeywords',
            url:'http://10.10.0.101:91/Search/Autokeywords',
            data:{
                keyword:_this.data.inputKeyword
            },
            method:'GET',
            header:{
                'content-type':'application/json'
            },
            success:function(res){
                console.log(res)
                if(res.data.data.UIKeywordItemInfo){
                    _this.setData({
                        tipKeywordList:res.data,
                        tipKeyword:res.data.data.UIKeywordItemInfo
                    })
                }
                
            }
        })
    },
    setSearchstorage:function(){
        var _this = this
        var searchArr = _this.data.historyKeyword
        var hasTag = false;
        for(var item in searchArr){
            if(_this.data.inputKeyword == searchArr[item]){
                hasTag = true;
            }
        };
        if(!hasTag){
            searchArr.unshift(_this.data.inputKeyword);
            _this.setData({
                historyKeyword: searchArr
            });
        }
        wx.setStorage({
          key: 'search',
          data: searchArr
        })
    },
    getSearchstorage:function(){
        var _this = this
        wx.getStorage({
          key: 'search',
          success: function(res){
            _this.setData({
                historyKeyword:res.data,
                hideHistory:true
            })
          }
        })
    },
    showSearchstorage:function(){
        var _this = this
        var searchArr = _this.getSearchstorage()
        _this.setData({
            history:searchArr
        })
    },
    clearSearchstorage:function(){
        var _this = this
        wx.removeStorage({
          key: 'search',
          data:[]
        })
        _this.setData({
            hideHistory:false
        })
    }
})