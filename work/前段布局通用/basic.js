//单例模式，为对象属性和方法
var zzs=
{
	//传入id，从网页中获取该元素
	$:function(arg1,arg2)
	{
		if(arguments.length==1){
			if(arguments[0].indexOf("#")!=-1){
				return document.getElementById(arguments[0].substring(1));
			}else if(arguments[0].indexOf(".")!=-1){
				var reg=new RegExp("(^|\\s)"+arguments[0].substring(1)+"(\\s|$)"),arr=[],el;
				el=document.getElementsByTagName("*");
				for(var i=0;i<el.length;i++){
					if(reg.test(el[i].className)){
						arr[arr.length]=el[i];
					}
				}
				return arr;
			}else{
				return document.getElementsByTagName(arguments[0]);
			}
		}else if(arguments.length>=2){
			if(arg1.indexOf("#")!=-1 && arg2.indexOf(".")==-1){
				var id=document.getElementById(arg1.substring(1));
				return id.getElementsByTagName(arg2);
			}else if(arg1.indexOf("#")!=-1 && arg2.indexOf(".")!=-1){
				var reg=new RegExp("(^|\\s)"+arg2.substring(1)+"(\\s|$)"),arr=[],el;
				el=document.getElementById(arg1.substring(1)).getElementsByTagName("*");
				for(var i=0;i<el.length;i++){
					if(reg.test(el[i].className)){
						arr[arr.length]=el[i];
					}
				}
				return arr;
			}
		}
	}
	//传入className和id，获得该元素
		,
		attr:function(obj,key,value){
			if(arguments.length==2){
				return obj.key ? obj.key : obj.getAttribute(key);
			}else{
				obj.key ? obj.key=value : obj.setAttribute(key,value);
			}
		}
		,
		curry:function(fn)
		{
			var args=Array.prototype.slice.call(arguments,1);
			return function()
			{
				var innerArgs=Array.prototype.slice.call(arguments);
				var totalArgs=args.concat(innerArgs);
				return fn.apply(this,totalArgs);
			}
		},
		//传入对象，事件类型，函数名，为对象绑定事件
		bind:function(obj,type,func)
		{
			if (func.length>0){
				func=zzs.curry(func);
			}
			if (obj.addEventListener)
			{
				obj.addEventListener(type,func,false);
			}else if (obj.attachEvent)
			{
				obj.attachEvent("on"+type,func);
			}else
			{
				obj["on"+type]=func;
			}
		},
		//传入对象，事件类型，函数名，为对象解除绑定事件
		unbind:function(obj,type,func)
		{
			if (obj.removeEventListener)
			{
				obj.removeEventListener(type,func,false);
			}else if (obj.detachEvent)
			{
				obj.detachEvent("on"+type,func);
			}else
			{
				obj["on"+type]=null;
			}
		},
		apply:function(obj,fn)
		{
			return function()
			{
				fn.apply(obj,arguments);
			}
		},
		css:function(obj,attr,value)
		{
			if (arguments.length==2 && typeof arguments[1]!="object")
			{
				if (attr=="height"){
					return obj.offsetHeight;
				}else if(attr=="width"){
					return obj.offsetWidth;
				}else if(attr=="left"){
					return obj.offsetLeft;
				}else if(attr=="top"){
					return obj.offsetTop;
				}else{
					var value=obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj,null)[attr];
					return isNaN(parseInt(value)) ? value : parseFloat(value);

				}

			}else if (arguments.length==2 && typeof arguments[1]=="object")
			{
				for (var index in attr )
				{
					arguments.callee(obj,index,attr[index]);
				}
			}else if(arguments.length==3)
			{
				switch (attr)
				{
				case "height":
				case "width":
				case "left":
				case "top":
				case "fontSize":
					obj.style[attr]=value+"px";
					break;
				case "opacity":
					obj.style.opacity=value/100;
					obj.style.filter="alpha(opacity="+value+")";
					break;
				default:
					obj.style[attr]=value;
					break;
				}
			}
		},
			doMove:function(obj,oAttr,time,callBack)
			{
				time=time||20;
				var timer=null;
				var _this=this;
				timer=setInterval(function(){
					try{
						var complete=true;
						for (var index in oAttr )
						{
							var cur=index=="opacity" ? parseInt(zzs.css(obj,index).toFixed(2)*100) : zzs.css(obj,index);
							var s=(oAttr[index]-cur)/7;
							s = s>0 ? Math.ceil(s) : Math.floor(s);
							if (cur!=oAttr[index])
							{
								complete=false;
								zzs.css(obj,index,cur+s);
							}
						}
						if (complete)
						{
							clearInterval(timer);
							callBack && callBack();
						}
					}
					catch (e)
					{
						return;
					}

				},time);
				return timer;
			},
			fadeIn:function(obj,time,callBack){
				time=time||20;
				clearInterval(obj.timer);
				//var dis=zzs.css(obj);
				zzs.css(obj,{display:"block",opacity:0});
				obj.timer=zzs.doMove(obj,{opacity:100},time,function(){callBack && callBack()});
			},
			fadeOut:function(obj,time,callBack){
				time=time||20;
				clearInterval(obj.timer);
				var opa=zzs.css(obj,"opacity");
				if(typeof opa=="undefined"){
					zzs.css(obj,"opacity",100);
				}
				obj.timer=zzs.doMove(obj,{opacity:0},time,function(){
					obj.style["display"]="none";
					callBack && callBack();
				});
			},
				slideBlock:function(obj,time,callBack){
					time=time||20;
					clearInterval(obj.timer);
					zzs.css(obj,"display","block");
					var h=zzs.css(obj,"height");
					zzs.css(obj,{height:0,overflow:"hidden"});
					obj.timer=zzs.doMove(obj,{height:h},time,function(){callBack && callBack()});
			},
			slideNone:function(obj,time,callBack){
				time=time||20;
				clearInterval(obj.timer);
				var h=zzs.css(obj,"height");
				zzs.css(obj,{height:h,overflow:"hidden"});
				obj.timer=zzs.doMove(obj,{height:0},time,function(){
					zzs.css(obj,{display:"none",height:h});
					callBack && callBack();
				});
			}
			,
		random:function(max,min)
		{
			return Math.floor(Math.random()*(max-min+1)+min);
		},
		diffRandom:function(max,min,len)
		{
			var array=[],isHas=false;
			while (true)
			{
				if (array.length==len)
				{
					break;
				}
				var ran=this.createRangeRandom(max,min);
				for (var index in array )
				{
					if (ran==array[index])
					{
						isHas=true;
						continue;
					}
				}
				if (isHas==false)
				{
					array[array.length]=ran;
				}
				isHas=false;
			}
			return array;
		},
		compare:function(a,b)
		{
			if (a>b)
			{
				return 1;
			}else if (a==b)
			{
				return 0;
			}else
			{
				return -1;
			}
		},
		resort:function(arr)
		{
			var len=arr.length;
			var array=this.createDiffRan(len-1,0,len),arr2=[];
			for (var i=0;i<len ;i++ )
			{
				arr2[i]=arr[array[i]];
			}
			return arr2;
		}
		,
		getColor:function()
		{
			var color=this.createRangeRandom(0xFFF,0).toString(16);
			while (color.length<6)
			{
				color+="0";
			}
			return "#"+color;
		},
		each:function(context,fn)
		{
			for (var i=0;i<context.length ;i++ )
			{
				if (i in context)
				{
					fn.call(context[i],i,context[i]);
				}

			}
		},
		hasClass:function(ele,name){
			var allClass=" "+ele.className+" ";
			if(allClass.indexOf(" "+name+" ")!=-1){
				return true;
			}
		}
		,
		addClass:function(ele,cName){
			if(!zzs.hasClass(ele,cName)){
				ele.className+=" "+cName;
				ele.className=ele.className.replace(/^\s+|\s+$/i,"");
			}
		},
		removeClass:function(ele,cName){
			var allClass=ele.className;
			allClass=allClass.split(" ");
			for (var i=0; i<allClass.length;i++){
				if (allClass[i]==cName){
					allClass[i]="";
					allClass.splice(i,1);
					allClass=allClass.join(" ");
					allClass=allClass.replace(/^\s+|\s+$/,"");
					ele.className=allClass;
				}
			}
		},
		backTo:function(target,callBack){
			var top=document.body.scrollTop||document.documentElement.scrollTop,timer;
			clearInterval(timer);
			timer=setInterval(function(){
				top-=80;
				if(top<=target){
					document.body.scrollTop=document.documentElement.scrollTop=target;
					clearInterval(timer);
					callBack && callBack();
				}
				document.body.scrollTop=document.documentElement.scrollTop=top;
			},zzs.isie ? 20 : 30);
		},
		animate:function(obj,queueArr,callBack){
			tmp=0;
			void function(){
				if(tmp>=queueArr.length){
					tmp=0;
					callBack && callBack();
					return;
				}
				zzs.doMove(obj,queueArr[tmp],7,arguments.callee);
				tmp++;
			}();
		},
		home:function(url){
			this.style["behavior"]="url(#default#homepage)";
			this.setHomePage(url);
		},
		addFavorite:function(url,title){
			try {
				window.external.addFavorite(url, title);
			} catch (e) {
				try {
					window.sidebar.addPanel(title, url, "");
				} catch (e) {
					alert("加入收藏失败，请使用Ctrl+D进行添加");
				}
			}
		},
		cElement:function(tag){
			return document.createElement(tag);
		}
		,
		getCookie:function(name){
			var cookieName=encodeURIComponent(name)+"=",
			start=document.cookie.indexOf(cookieName),
			cookieValue=null;
			
			if(start>-1){
				var end=document.cookie.indexOf(";",start);
				if(end==-1){
					end=document.cookie.length;
				}
				cookieValue=decodeURIComponent(document.cookie.substring(start+cookieName.length,end));
			}
			
			return cookieValue;
		},
		set:function(name,value,expires,path,domain,secure){
			var cookieText=encodeURIComponent(name)+"="+encodeURIComponent(value);
			if(expires instanceof Date){
				cookieText+=";expires="+expires.toGMTString();
			}
			
			if(path){
				cookieText+=";path="+path;
			}
			
			if(domain){
				cookieText+=";domain="+domain;
			}
			
			if(secure){
				cookieText+=";secure="+secure;
			}
			document.cookie=cookieText;
		
		},
		unset:function(name,path,domain,secure){
			zzs.set(name,"",new Date(0),path,domain,secure);
		},
		isie:/msie/i.test(navigator.userAgent),
		isie6:/msie 6/i.test(navigator.userAgent),
		isff:/firefox/i.test(navigator.userAgent),
		ischrome:/chrome/i.test(navigator.userAgent)
	}
