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
					delay:3000,
					fadeTime:1000,
					indexW:"25",
					indexH:"auto",
					indexColor:"gray",
					indexBg:"white"
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
		var arr2=$(this).children("ul:last");
		arr2.css({"right":"20px","bottom":"20px"});
		arr2.addClass("index");
		//arr2.find("li").css({"float":"left","width":indexW,"height":indexH,"color":indexColor});
		$(this).css({"position":"relative","overflow":"hidden"});
		arr.children("li").css({"position":"absolute","height":h.height(),"width":w.width(),"display":"none","overflow":"hidden"});
		arr.children("li:first").css({"display":"block"});
		var count=0,timer;
		function interval()
		{
			arr2.children("li").css({"opacity":0.5});
			arr2.children("li").eq(count).css({"top":"-10px","opacity":1});
			timer=setInterval(function()
			{
				arr2.find("li").eq(count).stop(true,false).animate({top:"-10px",opacity:1},"fast").siblings().stop(true,false).animate({top:"0px",opacity:0.5},"fast");
				arr.children("li").eq(count).fadeIn(time).siblings().fadeOut(time);
				count+=1;
				if (count==arr.children("li").length)
				{
					count=0;
				}
			},delay);
		};
		interval();
			arr2.children("li").hover(function()
			{
				clearInterval(timer);
				count=arr2.children("li").index(this);
				arr2.find("li").eq(count).stop(true,false).animate({top:"-10px",opacity:1},"fast").siblings().stop(true,false).animate({top:"0px",opacity:0.5},"fast");
				arr.children("li").eq(count).stop(false,true).fadeIn(time).siblings().stop(false,true).fadeOut(time);
			},function()
			{
				interval();
			});
		});
	
		}
	});
  })(jQuery)