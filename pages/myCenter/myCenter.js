
Page({
    data:{
        
    },
    onLoad:function(){
        this.login()
    },
    login:function(e){
        console.log(e)
        var _this = this
        // if(app.globalData.userInfo != null){
        //     this.setData({
        //         userInfo:app.globalData.userInfo
        //     })
        //     console.log(this.data.userInfo)
        // }else{
                var customer = wx.getStorageSync('Customer')
                if(customer && customer != ''){
                    wx.navigateTo({
                        url: '../login_success/login_success',
                    })
                }else{

                this.setData({
                    userName:e.detail.value.userName,
                    userPassword:e.detail.value.userPassword
                })

                if(this.data.userName && this.data.userPassword != ''){
                    wx.request({
                        // url:'https://auth.iluxday.com/login/login',
                        url:'http://10.10.0.101:91/login/login',
                        data:{
                            name:this.data.userName,
                            password:this.data.userPassword
                            // devicename:'iOS',
                            // version:'1.5.1'
                        },
                        method:'POST',
                        header:{
                            'content-type':'application/json'
                        },
                        success:function(res){
                            console.log(res)
                            wx.setStorage({
                                key: 'Customer',
                                data: res.data.data.Customer
                            })
                            if(res.data.code == 0){
                                wx.navigateTo({
                                url: '../login_success/login_success',
                                })
                            }else{
                                wx.showToast({
                                    title:'您输入的用户名或密码不正确'
                                })
                            }
                        }
                    }) 
                }else{
                    wx.showToast({
                        title:'请输入用户名和密码'
                    })
                }
            }
        // }
    },
    bindExitLogin:function(e){
        wx.removeStorageSync('Customer')
        wx.showToast({
            title:'已退出登录'
        })

    }
})