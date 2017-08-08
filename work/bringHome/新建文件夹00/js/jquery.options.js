;(function($)
  {
	$.fn.extend(
	{
		"tab":function(options)
		{
			var defaults=
			{
				bg:"#222222",
				pos:0,
				fcolor:"white"
			};
			options=$.extend(defaults,options);
			return this.each(function()
			{
				var self=$(this);
				var index;
				var color=options.fcolor;
				var backg=options.bg;
				var posi=options.pos;
				self.css({"position":"relative","overflow":"hidden"});
				liArr=self.find("ul:first li");
				div=self.children("div");
				liArr.eq(0).css({"background":backg,"color":color});
				div.css({"position":"absolute","left":-self.width(),"z-index":"-1"});
				div.eq(0).css({"left":posi});
				liArr.mouseover(function()
				{
					$(this).css({"background":backg,"color":color}).siblings("li").css({"background":"","color":""});
					index=liArr.index(this);
					div.eq(index).stop(false,true).animate({left:posi},300)
					   .siblings("div").stop(false,true).animate({left:-self.width()},300);
				});
			});
		}
	});
  })(jQuery)