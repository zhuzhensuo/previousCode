 //版权所有，违权必究
  ;(function($)
  {
		$.fn.extend(
		{
			"donghua":function(options)
			{
				var defaults=
				{
					h:"250",
					w:"700",
					hz:4000,
					time:500,
					indexW:"25",
					indexH:"auto"
				}
				options=$.extend(defaults,options);
				return this.each(function()
				{
					var indexW=options.indexW;
					var indexH=options.indexH;
					var indexColor=options.indexColor;
					var indexBg=options.indexBg;
					var time=options.time;
					var hz=options.hz;
					var timer;
					var count=0;
					var divH=$(this).height(options.h);
					var divW=$(this).width(options.w);
					var arr=$(this).children("ul:first");
					var arr2=$(this).children("ul:last");
					$(this).css("overflow","hidden");
					arr.children("li").css({"float":"left","height":divH.height(),"width":divW.width()});
					arr.css({"left":0,"width":arr.children("li").length*divW.width(),"height":divH.height()});
					arr2.css({"text-align":"center","right":"0px","bottom":"0px"});
					arr2.find("li").css({"float":"left","width":indexW,"height":indexH,"color":indexColor});
					for (var i=0;i<arr.children("li").length ;i++ )	
					{
						arr.children("li").eq(i).css({"position":"absolute","left":i*divW.width()});
					}
					function change()
					{
					arr2.children("li").eq(count).css({"top":-20}).siblings().css({"top":0});
					timer=setInterval(function()
					{
						arr2.children("li").eq(count).css({"top":-20}).siblings().css({"top":0});
						arr.stop(true,false).animate({left:-count*divW.width()},time);
						count+=1;
						if (count==arr.children("li").length+1)
						{
							var clone=arr.children("li:first").clone();
							clone.insertAfter(arr).css({"list-style":"none","position":"absolute","left":700}).animate({left:0},time,function()
							{
								clone.remove();
								arr.css({"left":"0"});
								count=0;
								//arr2.children("li").eq(count).css({"background":indexBg}).siblings().css({"background":""});
								arr.stop(true,false).animate({left:-count*divW.width()},time);
								count+=1;
							});
						}
					},hz);
					}
					change();
					/*
					arr2.children("li").hover(function()
					{
						clearInterval(timer);
						count=arr2.children("li").index(this);
						arr2.children("li").eq(count).css({"top":-20}).siblings().css({"top":0});
						arr.stop(true,false).animate({left:-(count)*divW.width()},time);
					},function()
					{
						change();
					});
					*/
					arr2.mouseover(function()
					{
						clearInterval(timer);
					});
					arr2.mouseout(function()
					{
						change();
					});
					arr2.children("li").click(function()
					{
						//clearInterval(timer);
						count=arr2.children("li").index(this);
						arr2.children("li").eq(count).css({"top":-20}).siblings().css({"top":0});
						arr.stop(true,false).animate({left:-(count)*divW.width()},time);
					});
				});
			}
		});
  })(jQuery)
