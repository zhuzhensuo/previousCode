
;(function($)
  {
	$.fn.extend(
	{
		"all":function(options)
		{
			var defaults=
			{
				hasBtn:"",
				type:"scroll",
				time:4000
			}
			options=$.extend(defaults,options);
			return this.each(function()
			{
				var _this=$(this);
				var ul=_this.find("ul");
				var li=ul.find("li");
				var index=0;
				var timer=null;
				var play=function()
				{
					var arr=[];
					var ul2=$("<ul></ul>")
					if (options.hasBtn.hasText)
					{
						for (var i=0;i<li.length ;i++ )
						{
							arr[i]=$("<li></li>");
							arr[i].text(i+1);
							ul2.append(arr[i]);
						}
					}
					_this.append(ul2);
					ul2.addClass(options.hasBtn.btn);
					
					var f=function(i)
					{
						li.eq(i).stop(false,true).fadeIn().siblings("li").stop(true,false).fadeOut();
					}
					var m=function(i)
					{
						ul.stop(true,false).animate({"left":-i*li.width()})
					}
					var init=function()
					{
						ul2.find("li").eq(index).addClass(options.hasBtn.active);
					}
					var up=function(i)
					{	
						ul.stop(true,false).animate({"top":-i*li.height()})
					}
					var auto=function(func)
					{
						timer=setInterval(function()
						{
							index++;
							//alert(i);
							if (index>li.length-1)
							{
								index=0;
							}
							ul2.find("li").eq(index).addClass(options.hasBtn.active).siblings("li").removeClass(options.hasBtn.active);;
							func(index);
						},options.time);
					}
						if (options.type=="scroll")
						{
							ul.css({"width":li.width()*li.size()});
							init();
							ul2.find("li").click(function()
							{
								index=ul2.find("li").index(this);
								$(this).addClass(options.hasBtn.active).siblings("li").removeClass(options.hasBtn.active);
								m(index);
							});
							auto(m);
							
						}else if (options.type=="fade")
						{
							init();
							ul2.find("li").click(function()
							{
								index=ul2.find("li").index(this);
								$(this).addClass(options.hasBtn.active).siblings("li").removeClass(options.hasBtn.active);
								f(index);
							});
							auto(f);
						}else if (options.type=="toUp")
						{
							init();
							ul2.find("li").click(function()
							{
								index=ul2.find("li").index(this);
								$(this).addClass(options.hasBtn.active).siblings("li").removeClass(options.hasBtn.active);
								up(index);
							});
							auto(up);
						}
						ul2.find("li").hover(function()
						{
							clearInterval(timer);
						},function()
						{
							switch (options.type)
							{
							case "scroll":
								auto(m);
							break;
							
							case "fade":
								auto(f);
							break;

							case "toUp":
								auto(up);
							}
						});
				}
				play();
			});
		}
	});
  })(jQuery)
