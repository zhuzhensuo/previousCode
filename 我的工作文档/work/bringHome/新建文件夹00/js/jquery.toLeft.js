//版权所有，违权必究
  ;(function($)
  {
	$.fn.extend(
	{
		"toLeft":function(options)
		{
			var defaults=
			{
				w:"200px",
				h:"600px",
				Hz:20,
				step:2,
				direction:2
			}
			options=$.extend(defaults,options);
			return this.each(function()
			{	
				var timer,timeout;
				var direction=options.direction;
				var hz=options.Hz;
				var step=options.step;
				var nullArr=[];
				var divW=$(this).width(options.w);
				var divH=$(this).height(options.h);
				var arr=$(this).children("ul").children("li");
				$(this).css("overflow","hidden");
				$(this).children("ul").css({"height":divH.height(),"width":arr.length*arr.width(),"left":0,"top":0});
				arr.css({"height":divH.height(),"width":arr.width(),"position":"absolute"});
				for (var i=0;i<arr.length ;i++ )
				{
					nullArr[i]=(i-1)*arr.width();
					arr.eq(i).css({"left":nullArr[i]});
				}
				function interval()
				{
					//clearTimeout(timeout);
					timer=setInterval(function()
					{
						if (direction==1)
						{
							for (var i=0;i<arr.length ;i++ )
							{
							nullArr[i]-=step;
							arr.eq(i).css({"left":nullArr[i]});
								if (arr.eq(i).position().left<=-arr.width())
								{
									nullArr[i]=(arr.length-1)*arr.width();
									clearInterval(timer);
									timeout=setTimeout(interval,4000);
								}
							}
						}else if(direction==2)
						{
							for (var i=0;i<arr.length ;i++ )
							{
							nullArr[i]+=step;
							arr.eq(i).css({"left":nullArr[i]});
							if (arr.eq(i).position().left>=(arr.length-1)*arr.width())
								{
								nullArr[i]=-arr.width();
								clearInterval(timer);
								timeout=setTimeout(interval,4000);
								}
							}
				
						}
						
					},hz);
				}
				interval();
				arr.hover(function()
				{
					clearInterval(timer);
					clearTimeout(timeout);
				},function()
				{
					interval();
				});
			});
		}
	});
  })(jQuery)