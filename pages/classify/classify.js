var app = getApp()
Page({
    // data:{
    //     "name":"我是分类"
    // }
    	data: {
    listLi:[],
    theView:'',
    page:0,
    scrollTop:0,
  },
  //初始化数据
  initData:function(){
    var _lis = [];
    console.log(9);
    for(var i=0;i<20;i++){
       _lis.push("text-" + i);
    }
    this.setData({
      listLi:_lis,
      page:1
    })
  },
  //页面加载完毕后初始化数据
  onLoad: function () {
    console.log('onLoad')
    var that = this;
    try{
      this.initData();
    }catch(e){console.log(e.message)}
    console.log(this.data.listLi);
  },
  loadMore:function(){
    console.log('scroll to bottom for load more item')
    let _page = this.data.page+1;
    let _lis = this.data.listLi;

    for(var i=(_page-1)*20;i<_page*20;i++){
      _lis.push("text-" + i);
    }

    this.setData({
      listLi:_lis,
      page:_page
    })
  },
  //滚动到某个区域
  gotoView:function(){
    this.setData({
      theView:"text-10"
    })
    
  },
  //滚动到顶部
  goTop:function(){
    this.setData({
      scrollTop:0 //这里有个坑，第一次会失效，第二次就不行了，如果值是0，则无效。这个bug可以通过重设这2个值来解决
    })
    console.log(133)
  },
  //滚动事件
  scroll:function(){
    this.setData({
      theView:"text-120",
      scrollTop:5,
    })
    console.log(3);
  }
})