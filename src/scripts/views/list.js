var tplList = require('../templates/list.string');

SPA.defineView('list', {
  html: tplList,
//plugins: ['delegated'],
  plugins: ['delegated', {
    name: 'avalon',
    options: function (vm) {
      vm.livelist = [];
    }
  }],
    init: {
    vm: null,
    livelistArray: [],
    homeSwiper: null,
    homeHotSwiper: null,
    formatData: function (arr) {
      var tempArr = [];
      for (var i = 0; i < Math.ceil(arr.length/2); i++) {
        tempArr[i] = [];
        tempArr[i].push(arr[2*i]);
        tempArr[i].push(arr[2*i+1]);
      }
      return tempArr;
    }
  },
  bindActions: {
    'back': function () {
//  	console.log("2222");
      this.hide();
    }
  },
  bindEvents: {
    'beforeShow': function () {
      var that = this;

      // 获得vm对象
      that.vm = that.getVM();

      $.ajax({
        url: '/api/getLivelist.php',
        type: 'get',
        data:{
          rtype: 'origin'
        },
        success: function (rs) {
          that.livelistArray = rs.data;
          that.vm.livelist = that.formatData(rs.data);
        }
      });
    },

    'show': function () {
      var that = this;
      // 下拉刷新，上拉加载更多
      var scrollSize = 30;
      var myScroll = this.widgets.homeHotScroll;
      myScroll.scrollBy(0, -scrollSize);

      var head = $('.head img'),
          topImgHasClass = head.hasClass('up');
      var foot = $('.foot img'),
          bottomImgHasClass = head.hasClass('down');
      myScroll.on('scroll', function () {
          var y = this.y,
              maxY = this.maxScrollY - y;
          if (y >= 0) {
              !topImgHasClass && head.addClass('up');
              return '';
          }
          if (maxY >= 0) {
              !bottomImgHasClass && foot.addClass('down');
              return '';
          }
      });

      myScroll.on('scrollEnd', function () {
          if (this.y >= -scrollSize && this.y < 0) {
              myScroll.scrollTo(0, -scrollSize);
              head.removeClass('up');
          } else if (this.y >= 0) {
              head.attr('src', '/fashion/images/rotate.png');
              // ajax下拉刷新数据

              $.ajax({
                url: '/api/getLivelist.php',
                data: {
                  rtype: 'refresh'
                },
                success: function (rs) {
                  var newArray = rs.data.concat(that.livelistArray);
                  that.vm.livelist = that.formatData(newArray);
                  that.livelistArray = newArray;

                  myScroll.scrollTo(0, -scrollSize);
                  head.removeClass('up');
                  head.attr('src', '/fashion/images/arrow.png');
                }
              })

//               setTimeout(function () {
//               	
//               }, 1000);
          }

          var maxY = this.maxScrollY - this.y;
          var self = this;
          if (maxY > -scrollSize && maxY < 0) {
              myScroll.scrollTo(0, self.maxScrollY + scrollSize);
              foot.removClass('down')
          } else if (maxY >= 0) {
              foot.attr('src', '/fashion/images/rotate.png');
              // ajax上拉加载数据

              $.ajax({
                url: '/api/getLivelist.php',
                data: {
                  rtype: 'more'
                },
                success: function (rs) {
                  var newArray = that.livelistArray.concat(rs.data);
                  that.vm.livelist = that.formatData(newArray);
                  that.livelistArray = newArray;
                  myScroll.refresh();

                  myScroll.scrollTo(0, self.y + scrollSize);
                  foot.removeClass('down');
                  foot.attr('src', '/fashion/images/arrow.png');
                }
              });
          }
      })
    }
  }
});
