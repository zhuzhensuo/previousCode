;(function($)
  {
	$.fn.extend(
	{
		"changeColor": function(options)
		{
			var defaults=
			{
				odd:"#333333",
				even:"#eeeeee",
				hover:"pink",
				headH:"30px",
				font:"white",
				size:""
			};
			options=$.extend(defaults,options);
			return this.each(function()
			{
				var self=$(this);
				var oddColor=options.odd;
				var evenColor=options.even;
				var hH=options.headH;
				var fontColor=options.font;
				var fontSize=options.size;
				self.find("tr:eq(0)").css("height",hH);
				self.find("tr:odd").css("background",oddColor);
				self.find("tr:even").css("background",evenColor);
				self.find("tr").hover(function()
				{
					$(this).css({"background":options.hover,"cursor":"pointer","color":fontColor,
					"fontSize":fontSize});
				},function()
				{
					self.find("tr:odd").css("background",oddColor);
					self.find("tr:even").css("background",evenColor);
					self.find("tr").css({"color":"","fontSize":""});
				});
			});
		}
	});
  })(jQuery)