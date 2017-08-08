define(function(require,exports,module){
	var iSpeed=0,timer,times=0;
	var bodong=function(ele,max,callBack){
		clearInterval(timer);
		timer=setInterval(function(){
			iSpeed+=5;
			var num=ele.offsetHeight+iSpeed;
			if(num>max){
				num=max;
				iSpeed*=-1;
				iSpeed*=0.6;
			}
			ele.style["height"]=num+"px";
		},30);

	}
	exports.bodong=bodong;
	require("./basic.js");
	var transtion=function(ele,ele2){
		zzs.each(ele,function(i){
			this.onmouseover=function(){
				clearInterval(this.timer);
				this.timer=zzs.doMove(ele2[i],{opacity:60},40);
			}
			this.onmouseout=function(){
				clearInterval(this.timer);
				this.timer=zzs.doMove(ele2[i],{opacity:0},40);
			}
		});
	}

	exports.transtion=transtion;





});