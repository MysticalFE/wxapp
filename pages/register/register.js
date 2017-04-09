var app = getApp()
Page({
    data:{
         mobileNum:'',
         validateCode:'',
         msgvalidateText:'获取短信验证码',
         registerPassword:''       
    },
    getValidateCode:function(e){
        console.log(e)
        var _this = this
        this.setData({
            mobileNum:e.detail.value.mobileNum
        })
        if(!(/^1[3|4|5|7|8]\d{9}$/.test((this.data.mobileNum)))){
            wx.showToast({
                title:'输入的手机号码格式不对哦',
                duration:1000
            })
        }
        wx.request({
            url:'http://10.10.0.101:91/System/SendSMS',//测试线
            data:{
                Mobile:_this.data.mobileNum,
                Type:1
            },
            method:'POST',
            header:{
                'content-type':'application/json'
            },
            success:function(res){
                console.log(res)
                if(res.data.code == 1 && res.data.desc == '此手机号码已被注册或被绑定'){
                    wx.showToast({
                        title:'此手机号码已被注册或被绑定',
                        duration:1000
                    })
                }
            }
        })
    },
    onRegister:function(){

    }
})