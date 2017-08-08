
var zzs=
{
	$:function(id)
	{
		return typeof id=="string" ? document.getElementById(id): id;
	},
	$$:function(id,tag)
	{
		if (arguments.length==2)
		{
			return this.$(id).getElementsByTagName(tag);
		}else if(arguments.length==1)
		{
			return document.getElementsByTagName(arguments[0]);
		}
	},
	$$$:function(cName,id)
	{
		var patt="(^|\\s)"+arguments[0]+"(\\s|$)";
		var reg=new RegExp(patt);
		var ele,arr=[];
		if (arguments.length==1)
		{
			ele=document.getElementsByTagName("*");
			for (var i=0;i<ele.length ;i++ )
			{
				if (reg.test(ele[i].className))
				{
					arr[arr.length]=ele[i];
				}
			}
			return arr;
		}else if (arguments.length==2)
		{
			if(!this.$(id))return;
			ele=this.$(id).getElementsByTagName("*");
			for (var i=0;i<ele.length ;i++ )
			{
				if (reg.test(ele[i].className))
				{
					arr[arr.length]=ele[i];
				}
			}
			return arr;
		}
	},
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
		bind:function(obj,type,func)
		{
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
		getEvent:function(event)
		{
			var e=event||window.event;
			return e;
		}
		,
		prevent:function()
		{
			var e=this.getEvent(event);
			e.preventDefault ? e.preventDefault() : e.returnValue=false;
		},
		stopPro:function()
		{
			var e=this.getEvent(event);
			e.stopPropagation ? e.stopPropagation() : e.cancelBubble=true;
		},
		getTarget:function()
		{
			var e=this.getEvent(event);
			return e.target||e.srcElement;
		}
		,
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
					if(attr=="opacity" && typeof value=="undefined"){
						return 100;
					}else if(attr=="zIndex" && value=="auto"){
						return 0;
					}else{
						return isNaN(parseInt(value)) ? value : parseFloat(value);
					}

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
				case "zIndex":
					if(zzs.isie){
						obj.style["zIndex"]=value;
						return;
					}
					obj.style["MozTransform"]="rotate("+value+"deg)";
					obj.style["webkitTransform"]="rotate("+value+"deg)";
					obj.style["zIndex"]=value;
					break;
				default:
					obj.style[attr]=value;
					break;
				}
			}
		},
		attr:function(obj,att,value){
			if(arguments.length==2){
				return obj.att ? obj.attr : obj.getAttribute(att);
			}else{
				obj.att ? obj.attr=value : obj.setAttribute(att,value);
			}
		}
			,
			doMove:function(obj,oAttr,callBack)
			{
				var timer=null;
				clearInterval(timer);
				var _this=this;
				timer=setInterval(function()
				{
					var complete=true;
					for (var index in oAttr )
					{
						var cur=index=="opacity" ? parseInt(zzs.css(obj,index).toFixed(2)*100) : parseInt(zzs.css(obj,index));
						var s=(oAttr[index]-cur)/5;
						s = s>0 ? Math.ceil(s) : Math.floor(s);
						if (cur!=oAttr[index])
						{
							complete=false;
							zzs.css(obj,index,cur+s);
						}
					}
					if (complete==true)
					{
						clearInterval(timer);
						timer=null;
						callBack && callBack();
					}
				},20);
				return timer;
			},
			doMove2:function(obj,oAttr,callBack)
			{
				var complete=true;
				for (var index in oAttr )
				{
					var cur=index=="opacity" ? parseInt(zzs.css(obj,index).toFixed(2)*100) : parseInt(zzs.css(obj,index));
					var s=(oAttr[index]-cur)/5;
					s = s>0 ? Math.ceil(s) : Math.floor(s);
					if (cur!=oAttr[index])
					{
						complete=false;
						zzs.css(obj,index,cur+s);
					}
				}
				if (complete==true)
				{
					callBack && callBack();
				}
			}
		,
		getMoveDiv:function(obj)
		{
			obj=obj.offsetParent;
			while (obj)
			{
				obj=obj.offsetParent;
			}
			return obj;
		},
		createRangeRandom:function(max,min)
		{
			return Math.floor(Math.random()*(max-min+1)+min);
		},
		createDiffRan:function(max,min,len)
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
		createColor:function()
		{
			var color=this.createRangeRandom(0xFFF,0).toString(16);
			while (color.length<6)
			{
				color+="0";
			}
			return "#"+color;
		},
		scroll:function(tar,callBack)
		{
			var timer=null;
			var d=document;
			var cur=d.documentElement.scrollTop||d.body.scrollTop;
			if(cur==tar) return;
			clearInterval(timer);
			timer=setInterval(function()
			{
				var s=(tar-cur)/5;
				s =s >0 ? Math.ceil(s) : Math.floor(s);
				if (cur==tar)
				{
					clearInterval(timer);
					callBack && callBack();
				}else
				{
					cur=cur+s;
					d.documentElement.scrollTop=d.body.scrollTop=cur;
					//document.body.innerHTML=cur;
				}
			},20);
		},
		each:function(context,fn)
		{
			for (var i=0;i<context.length ;i++ )
			{
				if (i in context)
				{
					fn.call(context[i],i,context);
				}
			}
		},
		hasClass:function(ele,name){
			var allClass=" "+ele.className+" ";
			if(allClass.indexOf(" "+name+" ")==-1){
				return true;
			}
		}
		,
		addClass:function(cName,ele){
			if(zzs.hasClass(ele,cName)){
				ele.className+=" "+cName;
			}
		},
		removeClass:function(cName,ele){
			var allClass=ele.className;
			allClass=allClass.split(" ");
			for (var i=0; i<allClass.length;i++){
				if (allClass[i]==cName){
					allClass[i]="";
					allClass.splice(i,1);
					allClass=allClass.join(" ");
					ele.className=allClass;
				}
			}
		},
		invoke:function(f,start,interval,end){
			if(!start) start = 0;
			if(arguments.length <= 2){
				setTimeout(f,start);
			}else{
				function repeat(){
					var h = setInterval(f,interval);
					if(end)setTimeout(function(){clearInterval(h);},end);
				}
				setTimeout(repeat,start);
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
					return;
				}
				document.body.scrollTop=document.documentElement.scrollTop=top;
			},zzs.isie ? 20 : 30);
		},
		lights:function(bool,el,tmp){
			var arr=["#fff","#eee","#ddd","#ccc","#bbb","#aaa","#999","#888","#777","#666","#555","#444","#333","#222","#111","#000"];
			clearInterval(el.timer);
			el.timer=setInterval(function(){
				!bool ? tmp++ : tmp--;
				if(tmp>=arr.length || tmp<=0){
					clearInterval(el.timer);
				}
				el.style["backgroundColor"]=arr[tmp];
			},20);
		}
		,
		isie:/msie/i.test(navigator.userAgent),
		isie6: function(){return typeof document.body.style["maxHeight"]=="undefined"},
		isff:/firefox/i.test(navigator.userAgent),
		ischrome:/chrome/i.test(navigator.userAgent)
}