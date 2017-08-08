//jquery.zzs.js  原创作品，版权所有，违权必究.
  ;(function($)
  {
	$.fn.extend(
	{
		"scroll":function(options)
		{
			  defaults={
					height:"250",
					width:"700",
					delay:4000,
					fadeTime:1000,
					indexColor:"#68B8FE",
					indexBg:"#0C6BBF"
					      }
		options=$.extend(defaults,options);
		return this.each(function()
		{
		var indexW=options.indexW;
		var indexH=options.indexH;
		var indexColor=options.indexColor;
		var indexBg=options.indexBg;
		var w=$(this).width(options.width);
		var h=$(this).height(options.height);
		var delay=options.delay;
		var time=options.fadeTime;
		var arr=$(this).children("ul:first");
		var arr2=$(this).find("ul:last");
		var arr3=$(this).find("ul:eq(1)");
		var div=$("<div></div>");
		var p=$("<div></div>");
		$(this).append(div);
		$(this).append(p);
		div.addClass("opacity");
		p.addClass("text");
		
		arr2.css({"right":"20px","bottom":"20px"});
		arr2.addClass("index");
		//arr2.find("li").css({"float":"left","width":indexW,"height":indexH,"color":indexColor});
		$(this).css({"position":"relative","overflow":"hidden"});
		arr.children("li").css({"position":"absolute","height":h.height(),"width":w.width(),"display":"none","overflow":"hidden"});
		arr.children("li:first").css({"display":"block"});
		var count=0,timer;
		
		var para=arr3.find("li").eq(count).html();
		p.text(para);
		arr2.find("li").eq(count).css({background:indexColor}).siblings().css({background:indexBg});

		function interval()
		{
			timer=setInterval(function()
			{
				arr2.find("li").eq(count).css({background:indexColor}).siblings().css({background:indexBg});
				arr.children("li").eq(count).fadeIn(time).siblings().fadeOut(time,function()
				{
					
				});
				para=arr3.find("li").eq(count).text();
				p.text(para);
				count+=1;
				if (count==arr.children("li").length)
				{
					count=0;
				}
			},delay);
		};
		interval();
			arr2.children("li").click(function()
			{
				count=arr2.children("li").index(this);
				para=arr3.find("li").eq(count).html();
				p.text(para);
				arr2.find("li").eq(count).css({background:indexColor}).siblings().css({background:indexBg});
				arr.children("li").eq(count).stop(false,true).fadeIn(time).siblings().stop(false,true).fadeOut(time);
			});
			arr2.children("li").hover(function(){clearInterval(timer)},function(){interval()});
		});
	
		}
	});
  })(jQuery)