;(function($)
  {
	$.fn.extend(
	{
		"ads":function(options)
		{
			var defaults=
			{
				height:"150px",
				width:"150px",
				top:0,
				left:0,
				step:1,
				interval:10
			}
			options=$.extend(defaults,options);
			return this.each(function()
			{
				var self=$(this);
				self.height(options.height);
				self.width(options.width);
				
				var w=$(document).width();
				var h=$(document).height();
				self.css({"position":"absolute","top":options.top,"left":options.left});
				var topPos=options.top;
				var leftPos=options.left;
				var step=options.step;
				var interval=options.interval;
				var one,three;
				function all()
				{
					function toDown()
					{
						one=setInterval(function()
						{
							topPos+=step;
							self.css({"top":topPos});
							if (topPos>=h-self.height())
							{
								clearInterval(one);
								toUp();
							}
						},interval);
					}
					toDown();
					function toUp()
					{
						one=setInterval(function()
						{
							topPos-=step;
							self.css("top",topPos);
							if (topPos==0)
							{
								clearInterval(one);
								toDown();
							}
						},interval);
					}
					function toRight()
					{
						three=setInterval(function()
						{
							leftPos+=step;
							self.css("left",leftPos);
							if (leftPos>=w-self.width())
							{
								clearInterval(three);
								toLeft();
							}
						},interval);
					}
					toRight();
					function toLeft()
					{
						three=setInterval(function()
						{
							leftPos-=step;
							self.css({"left":leftPos});
							if (leftPos==0)
							{
								clearInterval(three);
								toRight();
							}
						},interval);
					}
				}
				all();
				self.hover(function()
				{
					clearInterval(one);
					clearInterval(three);
				},function()
				{
					all();
				});
			});
		}
	});
  })(jQuery)
