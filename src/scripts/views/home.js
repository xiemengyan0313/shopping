var tplHome=require('../templates/home.string');
//var content=document.body.innerHTML;
//document.body.innerHTML=tplHome+content;
//SPA.defineView('home', {
//html: tplHome,
//});
//
//var mySwiper = new Swiper ('.swiper-container', {
//  direction: 'horizontal',
//  loop: true,
//  autoplay: 2000,
//  
//  // 如果需要分页器
//  pagination: '.swiper-pagination',
//  
// 
//}) 
SPA.defineView('home', {
  html: tplHome,
plugins: ['delegated'],
  bindActions: {
    'goto.list': function (e, data) {
      SPA.open('list');
    }
},
//plugins: ['delegated'],
//
//init: {
//  mySwiper: null
//},
//
//bindActions: {
//  'tap.slide': function (e, data) {
//    this.mySwiper.slideTo($(e.el).index())
//  }
//},

  bindEvents: {
    'show': function () {
      this.mySwiper = new Swiper('#home-swiper', {
         direction: 'horizontal',
 		 loop: true,
 		 autoplay: 2000,
 		 // 如果需要分页器
		  pagination: '.swiper-pagination',
//      onSlideChangeStart: function (swiper) {
//        var index = swiper.activeIndex;
//        var $lis = $('.m-home nav li');
//        util.setFocus($lis.eq(index));
//      }
      });
    }
  }
});