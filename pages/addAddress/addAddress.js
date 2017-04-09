// pages/addAddress/addAddress.js
Page({
  data:{
    previceID:0,
    previceNameStr:'-省份-',
    cityNameStr:'-城市-',
    countryNameStr:'-区县-'
  },
  onLoad:function (options) {
    
  },
  formSubmit:function (e) {
    console.log(e)
    let realname = e.detail.value.realname,
        mobile = e.detail.value.mobile,
        detailAddr = e.detail.value.detailAddr,
        postCode = e.detail.value.postcode;
    if(realname == ''){
      wx.showToast({
        title:'请填写姓名'
      })
      return;
    }
    if(!(/^1[34578]\d{9}$/.test(mobile))){
      wx.showToast({
        title:'请输入正确的手机号码'
      })
      return;
    } 
    if(this.data.previceNameStr == '' || this.data.cityNameStr == '' || this.data.countryNameStr == ''){
      wx.showToast({
        title:'请输入省市区'
      });
      return;
    }
    
    if(detailAddr == ''){
      wx.showToast({
        title:'请输入详细地址'
      })
      return;
    }
  },
  areaRequest:function(){

  },
  showPrevice:function (e) {
      console.log(e)
      const _this = this;
      wx.request({
        url: 'http://10.10.0.101:91/System/AddressArea',
        data: {
            areaType:0,
            pageNumber:1,
            pageSize:100
        },
        method: 'POST',
        success: function(res){
          console.log(res)
          let previceInfo = res.data.data.ProvinceInfo;
          const previceName = [],previceIDList = [];
          for(const i in previceInfo){
              previceName.push(previceInfo[i].ProvinceName)
              previceIDList.push(previceInfo[i].ProvinceId)
          }
          _this.setData({
              previceArray:previceName,
              previceIDList:previceIDList,
              previceIndex:e.detail.value
          })
        }
      })
      if(this.data.previceIDList){
          // this.setData({
          //   previceIndex:e.detail.value
          // })
          var previceNameStr = this.data.previceArray[this.data.previceIndex]
          this.setData({
            previceNameStr:previceNameStr
          })
      }
  },
  showCity:function (e) {
      console.log(e)
      const _this = this;
      const prevID = this.data.previceIDList[this.data.previceIndex];
      wx.request({
        url:'http://10.10.0.101:91/System/AddressArea',
        data:{
          areaType:1,
          pageNumber:1,
          pageSize:100,
          provinceID:prevID
        },
        method:'POST',
        success:(res) => {
            console.log(res)
            let cityInfo = res.data.data.CityInfo;
            const cityName = [],cityIDList = [];
            for(const i in cityInfo){
                cityName.push(cityInfo[i].CityName)
                cityIDList.push(cityInfo[i].CityId)
            }
            _this.setData({
                cityArray:cityName,
                cityIDList:cityIDList,
                cityIndex:e.detail.value
            })
        }
      })
      if(this.data.cityArray){
          // this.setData({
          //     cityIndex:e.detail.value
          // })
          var cityNameStr = this.data.cityArray[this.data.cityIndex]
          this.setData({
              cityNameStr:cityNameStr
          })
      }
  },
  showCountry:function (e) {
    console.log(e)
    const _this = this;
    const prevID = this.data.previceIDList[this.data.previceIndex];
    const cityID = this.data.cityIDList[this.data.cityIndex];
    wx.request({
      url:'http://10.10.0.101:91/System/AddressArea',
      data:{
        areaType:2,
        pageNumber:1,
        pageSize:100,
        provinceID:prevID,
        CityID:cityID
      },
      method:'POST',
      success:(res) => {
          console.log(res)
          let countryInfo = res.data.data.TownInfo;
          const countryName = [],countryIDList = [];
          for(const i in countryInfo){
              countryName.push(countryInfo[i].TownName)
              countryIDList.push(countryInfo[i].TownId)
          }
          _this.setData({
              countryArray:countryName,
              countryIDList:countryIDList,
              countryIndex:e.detail.value
          })
      }
    })
    if(this.data.countryArray){
        // this.setData({
        //     countryIndex:e.detail.value
        // })
        var countryNameStr = this.data.countryArray[this.data.countryIndex]
        this.setData({
            countryNameStr : countryNameStr
        })
    }
  }
})