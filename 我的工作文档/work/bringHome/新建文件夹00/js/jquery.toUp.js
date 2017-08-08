//版权所有，违权必究
  ;(function($)
  {
	$.fn.extend(
	{
		"toUp":function(options)
		{
			var defaults=
			{
				w:"200px",
				h:"600px",
				Hz:20,
				step:2,
				direction:1
			}
			options=$.extend(defaults,options);
			return this.each(function()
			{	
				var timer,out;
				var direction=options.direction;
				var hz=options.Hz;
				var step=options.step;
				var nullArr=[];
				var divW=$(this).width(options.w);
				var divH=$(this).height(options.h);
				var arr=$(this).children("ul").children("li");
				$(this).css("overflow","hidden");
				$(this).children("ul").css({"height":arr.height()*arr.length,"width":divW.width(),"top":0});
				arr.css({"height":arr.height(),"width":divW.width(),"position":"absolute"});
				for (var i=0;i<arr.length ;i++ )
				{
					nullArr[i]=(i-1)*arr.height();
					arr.eq(i).css({"top":(i-1)*arr.height()});
				}
				function interval()
				{
					timer=setInterval(function()
					{
						if (direction%2!=0)
						{
							for (var i=0;i<arr.length ;i++ )
							{
								nullArr[i]-=step;
								arr.eq(i).css({"top":nullArr[i]});
								if (arr.eq(i).position().top<=-arr.height())
								{
									clearInterval(timer);
									nullArr[i]=(arr.length-1)*arr.height();
								}
							}
						}else if(direction%2==0)
						{
							for (var i=0;i<arr.length ;i++ )
							{
								nullArr[i]+=step;
								arr.eq(i).css({"top":nullArr[i]});
								if (arr.eq(i).position().top>=(arr.height()*(arr.length))-arr.height())
								{
									clearInterval(timer);
									nullArr[i]=-arr.height();
								}
							}
				
						}
						
					},hz);
				}
				
				arr.hover(function()
				{
					//alert(arr.height());
					clearTimeout(out);
					clearInterval(timer);
				},function()
				{
					go();
				});
				function go()
				{
					out=setTimeout(arguments.callee,3000);
					interval();
				}
				go();
			});
		}
	});
  })(jQuery)