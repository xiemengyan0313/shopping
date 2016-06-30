var tplRegister = require('../templates/register.string');
SPA.defineView('register', {
  html: tplRegister,
  plugins: ['delegated'],
bindActions: {
    'back': function () {
//	console.log("2222");
      this.hide();
    },
    "show":function(){   	
		var code=document.getElementById("tel");
		if(code.value==""){
//			console.log(222);
			alert("输入 手机号");
		}	
	},
	"save":function(){
//		console.log(222);
			var data=new Object;
			data.phone=document.getElementById("tel").value;
			data.pwd=document.getElementById("passw").value;
			var str=JSON.stringify(data);
			var time=new Date().getTime();
			var key = time.toString();
			localStorage.setItem(time,str);	
	}
    	
  
  }
});