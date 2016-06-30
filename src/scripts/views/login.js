var tplLogin = require('../templates/login.string');
SPA.defineView('login', {
  html: tplLogin,
  plugins: ['delegated'],
  bindActions: {
    'back': function () {
  	console.log("2222");
      this.hide();
    },
    'goto.register': function (e, data) {
      SPA.open('register');
    },
    "pass":function(){
    	console.log(222);
//  		var mima = Tel(mima);	 
//		   var miMa = $("#miMa").val();
//		if(miMa!= mima){
//			 //alert("密码错误！");
//			 //return false;
//			 $(".wrong").show();
//		 }else{
//			 $(".wrong").hide();
//			  window.location.href="index.html"	
//			  
//		 }
    	
    }
  }
});
