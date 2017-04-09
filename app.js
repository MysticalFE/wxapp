//app.js
App({
    globalData:{
        userInfo:null,
        TempID:[]
    },
    onLaunch:function(){
        //监听小程序初始化
        var _this = this
        _this.getUserInfo()
    },
    getUserInfo:function(){
        var _this = this
        wx.login({
            success:function () {
                wx.getUserInfo({
                  success: function(res){
                    //   console.log(res)
                    _this.globalData.userInfo = res.userInfo
                  }
                })
            }
        })
    },
    onShow:function(){
        //监听小程序显示
    },
    onHide:function(){
        //监听小程序隐藏
    },
    onError:function(){
        //错误监听方法
    }
    //and so on...
})