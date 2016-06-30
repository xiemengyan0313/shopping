var tplClassify = require('../templates/classify.string');
var util = require('../utils/fn.js');

SPA.defineView('classify', {
  html: tplClassify,
  plugins: ['delegated'],
  bindActions: {
    'classify.slide': function (e, data) {
    	util.setFocus(e.el);
      this.homeHotSwiper.slideTo($(e.el).index());
    }
},
bindEvents: {
    'show': function () {
      var that = this;
      that.homeHotSwiper = new Swiper('#classify-swiper', {
        loop: false,
//      effect : 'fade',
        direction : 'vertical',
        onSlideChangeStart: function (swiper) {
          var index = swiper.activeIndex;
          var $lis = $('.m-classify nav li');
          util.setFocus($lis.eq(index));
        }
        });
        // freeMode : true,
        // freeModeMomentum : false
    }
    }
  
});
  