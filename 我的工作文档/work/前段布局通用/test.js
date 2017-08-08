define(function(require,exports,module){

	var div1=document.getElementById("div1");
	var btn=document.getElementById("btn");
	btn.onclick=function(){

		if(this.value=="一键弹出"){
			require("./bodong").bodong(div1,400,true);
		}else{
			require("./bodong").bodong(div1,0);
		}
		this.value=="一键收起" ? this.value="一键弹出" : this.value="一键收起";
	}


	var li=document.getElementById("ul").getElementsByTagName("li");
	var p=document.getElementById("ul").getElementsByTagName("p");

	require("./bodong.js").transtion(li,p);

});
