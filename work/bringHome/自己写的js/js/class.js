// JavaScript Document
<!--面向对象选项卡开始-->
function Option(id,father,son,o)
	{
		this.id=zzs.$(id);
		this.father=zzs.$$$(father,id)[0].getElementsByTagName("li");
		this.son=zzs.$$$(son,id);
		var _this=this;
		for (var i=0;i<_this.father.length ;i++ )
		{
			_this.father[i].index=i;
			_this.father[i][o.type]=function()
			{
				for (var j=0;j<_this.father.length ;j++ )
				{
					_this.son[j].style.display="none";
					_this.father[j].className="";
				}
				_this.son[this.index].style.display="block";
				_this.father[this.index].className="active";
			}
		}
	}

new Option("main","option","son",{type:"onclick"});
 <!--面向对象选项卡结束-->
 
 
 <!--面向对象点击左右切换开始-->
 function Display(id,left,right,dis,auto)
	{
		this.id=zzs.$(id);
		this.left=zzs.$$$(left,id)[0];
		this.right=zzs.$$$(right,id)[0];
		this.dis=zzs.$$$(dis,id);
		this.index=0;
		this.auto=auto;
		this.timer=null;
		var _this=this;
		
		_this.goRight=function()
		{
			_this.index++;
			if (_this.index>_this.dis.length-1)
			{
				_this.index=0;
			}
			for (var i=0;i<_this.dis.length ;i++ )
			{
				_this.dis[i].style.display="none";
			}
			_this.dis[_this.index].style.display="block"
		}
		_this.goLeft=function()
		{
			_this.index--;
			if (_this.index<0)
			{
				_this.index=_this.dis.length-1;
			}
			for (var i=0;i<_this.dis.length ;i++ )
			{
				_this.dis[i].style.display="none";
			}
			_this.dis[_this.index].style.display="block"
		}
		_this.right.onclick=_this.goRight;
		_this.left.onclick=_this.goLeft;

		_this.goAuto=function()
		{
			_this.timer=setInterval(_this.goRight,3000);
		}
		if (this.auto==true)
		{
			_this.goAuto();
		}
		_this.right.onmouseover=_this.left.onmouseover=function(){clearInterval(_this.timer)}
		_this.right.onmouseout=_this.left.onmouseout=_this.goAuto;
	}
	
	new Display("main2","leftBtn","rightBtn","display",true);
	 <!--面向对象点击左右切换结束-->
	 
	  <!--面向对象banner上下滚动开始-->
	 function Animate(id,cName)
	{
		this.id=zzs.$(id);
		this.scroll=zzs.$$$(cName,id)[0];
		this.li=this.scroll.getElementsByTagName("li");
		this.ul=document.createElement("ul");
		this.index=0;
		this.t=null;
		this.timer2=null;
		this.c=true;
		this.timer;
		this.createBtn=function()
		{
			this.frag=document.createDocumentFragment();
			for (var i=0;i<this.li.length ;i++ )
			{
				this.frag.appendChild(document.createElement("li"));
			}
			this.ul.appendChild(this.frag);
			this.ul.className="append";
			this.id.appendChild(this.ul);
		}
		this.createBtn();
		var li=this.ul.getElementsByTagName("li");
		li[0].className="active"
		var _this=this;
		this.fn=zzs.apply(this,zzs.doMove2);
		
		this.click=function()
		{
			for (var i=0;i<li.length ;i++ )
			{
				li[i].index=i;
				li[i].onclick=function()
				{
					//if(!_this.c)return;
					//_this.c=false;
					_this.index=this.index;
					_this.color(_this.index);
					clearInterval(_this.timer);
					_this.timer=setInterval(function()
					{
						_this.fn(_this.scroll,{top:-(_this.index*_this.li[0].offsetHeight)},function(){clearInterval(_this.timer)});
					},20);
					//zzs.doMove(_this.scroll,{top:-(_this.index*_this.li[0].offsetHeight)},function(){_this.c=true});
				}
			}
		}
		this.color=function(index)
		{
			for (var j=0;j<li.length ;j++ )
			{
				li[j].className="active2";
			}
			li[index].className="active";
		}
		this.click();
	}
	Animate.prototype=
	{
		autoPlay:function()
		{
			var _this=this;
			this.timer2=setInterval(function()
			{
				_this.index++;
				
				if (_this.index>_this.li.length-1)
				{
					_this.index=0;
				}
				_this.color(_this.index);
				zzs.doMove(_this.scroll,{top:-(_this.index*_this.li[0].offsetHeight)},function(){_this.c=true});

			},3000);
			
		},
		hover:function()
		{
			var _this=this;
			for (var i=0;i<_this.li.length ;i++ )
			{
				_this.ul.children[i].onmouseover=function()
				{
					clearInterval(_this.timer2);
					_this.timer2=null;
				}
				_this.ul.children[i].onmouseout=function()
				{
					_this.autoPlay();
				}
			}
		}
	}
	
	var o=new Animate("banner","container");
	o.autoPlay();
	o.hover();
	<!--面向对象banner上下滚动结束-->
	
	<!--面向对象banner左右滚动(有按钮)开始-->
	function Animate2(id,cName,left,right,btn,time)
	{
		this.id=zzs.$(id);
		this.scroll=zzs.$$$(cName,id)[0];
		this.left=zzs.$$$(left,id)[0];
		this.right=zzs.$$$(right,id)[0];
		this.li=this.scroll.getElementsByTagName("li");
		this.ul=document.createElement("ul");
		this.index=0;
		this.t=null;
		this.timer2=null;
		this.c=true;
		this.timer;
		this.btn=btn;
		this.time=time;
		var _this=this;
		this.fn=zzs.apply(this,zzs.doMove2);
		
		this.click=function()
		{
			this.left.onclick=function()
			{
				_this.index--;
				if (_this.c==false)
				{
					return;
				}
				if (_this.index<0)
				{
					//_this.index=_this.li.length-1;
					_this.c=false;
					_this.clone(_this.li[_this.li.length-1],function(c)
					{
						zzs.css(c,{"position":"absolute","left":-_this.li[0].offsetWidth,"top":0});
						zzs.doMove(c,{left:0},function()
						{
							_this.c=true;
							_this.id.removeChild(c);
							zzs.css(_this.scroll,"left",-(_this.li.length-1)*_this.li[0].offsetWidth);
							_this.index=_this.li.length-1;
						});
					});
					
					clearInterval(_this.timer);
					_this.timer=setInterval(function()
					{
						_this.fn(_this.scroll,{left:-(_this.index*_this.li[0].offsetWidth)},function(){clearInterval(_this.timer)});
					},20);
				}
				clearInterval(_this.timer);
				_this.timer=setInterval(function()
				{
					_this.fn(_this.scroll,{left:-(_this.index*_this.li[0].offsetWidth)},function(){clearInterval(_this.timer)});
				},20);
			}
			this.right.onclick=function()
			{
				if (_this.c==false)
				{
					return;
				}
				_this.index++;
				if (_this.index>_this.li.length-1)
				{
					_this.c=false;
					_this.clone(_this.li[0],function(c)
					{
						zzs.css(c,{"position":"absolute","left":_this.li[0].offsetWidth,"top":0});
						zzs.doMove(c,{left:0},function()
						{
							_this.c=true;
							_this.id.removeChild(c);
							zzs.css(_this.scroll,"left",0);
							_this.index=0;
						});
					});
					/*
					_this.index=0;
					clearInterval(_this.timer);
					_this.timer=setInterval(function()
					{
						_this.fn(_this.scroll,{left:-(_this.index*_this.li[0].offsetWidth)},function(){clearInterval(_this.timer)});
					},20);
					*/
				}
				clearInterval(_this.timer);
				_this.timer=setInterval(function()
				{
					_this.fn(_this.scroll,{left:-(_this.index*_this.li[0].offsetWidth)},function(){clearInterval(_this.timer)});
				},20);
			}
		}
		this.clone=function(obj,call)
		{
			var clone=obj.cloneNode(true);
			_this.id.appendChild(clone);
			clone.className="clone";
			call&&call(clone);
		}
		this.color=function(index)
		{
			for (var j=0;j<li.length ;j++ )
			{
				li[j].className="active2";
			}
			li[index].className="active";
		}
		this.click();
	}
	Animate2.prototype=
	{
		autoPlay:function()
		{
			var _this=this;
			clearInterval(this.timer2);
			this.timer2=setInterval(function()
			{
				_this.index++;
				if (_this.index>_this.li.length-1)
				{
					_this.c=false;
					_this.clone(_this.li[0],function(c)
					{
						zzs.css(c,{"position":"absolute","left":_this.li[0].offsetWidth,"top":0});
						zzs.doMove(c,{left:0},function()
						{
							_this.c=true;
							_this.id.removeChild(c);
							zzs.css(_this.scroll,"left",0);
							_this.index=0;
							zzs.each(_this.li_btn,function(){this.className=""});
							_this.li_btn[_this.index].className="active";
						});
					});
				}
				clearInterval(_this.timer);
				_this.timer=setInterval(function()
				{
					_this.fn(_this.scroll,{left:-(_this.index*_this.li[0].offsetWidth)},function(){
					clearInterval(_this.timer);
					});
				},20);
				zzs.each(_this.li_btn,function(){this.className=""});
				if (_this.index>_this.li.length-1)
				{
					_this.li_btn[0].className="active";
					return;
				}
				_this.li_btn[_this.index].className="active";
			},_this.time);
			
		},
		hover:function()
		{
			var _this=this;
			_this.left.onmouseover=_this.right.onmouseover=_this.scroll.onmouseover=function()
			{
				clearInterval(_this.timer2);
				_this.timer2=null;
			}
			_this.left.onmouseout=_this.right.onmouseout=_this.scroll.onmouseout=function()
			{
				_this.autoPlay();
			}
			
		},
		hasBtn:function()
		{
			if (this.btn==true)
			{
				this.createBtn=function()
				{
					this.frag=document.createDocumentFragment();
					for (var i=0;i<this.li.length ;i++ )
					{
						this.frag.appendChild(document.createElement("li"));
					}
					this.ul.appendChild(this.frag);
					this.ul.className="append";
					this.id.appendChild(this.ul);
					zzs.css(this.scroll,"width",this.li.length*this.li[0].offsetWidth);
					var li=this.ul.getElementsByTagName("li");
					li[0].className="active";
					return li;
				}
				this.li_btn=this.createBtn();
				var _this=this;
				for (var i=0;i<_this.li_btn.length ;i++ )
				{
					_this.li_btn[i].index=i;
					_this.li_btn[i].onmouseover=function()
					{
						zzs.each(_this.li_btn,function(){this.className=""});
						_this.li_btn[this.index].className="active";
						clearInterval(_this.timer);
						clearInterval(_this.timer2);
						_this.index=this.index;
						_this.timer=setInterval(function()
						{
							_this.fn(_this.scroll,{left:-(_this.index*_this.li[0].offsetWidth)},function(){clearInterval(_this.timer)});
						},20);
					}
				}
				_this.ul.onmouseout=function()
				{
					_this.autoPlay();
				}
			}
		}
	}
	var o2=new Animate2("a","b","l","r",true,3000);
	o2.autoPlay();
	o2.hover();
	o2.hasBtn();
	<!--面向对象banner左右滚动(有按钮)结束-->
	