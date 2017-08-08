;(function($)
  {
	$.fn.extend(
	{
		"move":function(options)
		{
			var defaults=
			{
				cursor:"move"
			}
			options=$.extend(defaults,options);
			return this.each(function()
			{
				var self=$(this);
				self.mousedown(function(e)
				{
					var x=e.clientX;
					var y=e.clientY;
					var left=self.offset().left;
					var top=self.offset().top;
					var pL=x-left;
					var pR=y-top;
					self.css({"cursor":options.cursor});
					$(document).mousemove(function(e)
					{
						var x2=e.clientX;
						var y2=e.clientY;
						self.css({"position":"absolute","left":x2-(x-left),"top":y2-(y-top)});
						if (self.position().left<=0)
						{
							self.css({"left":0});
						}
						else if (self.position().left>=($("body").width()-self.width()))
						{
							self.css({"position":"absolute","left":($("body").width()-self.width())});
						}
						if (self.position().top<=0)
						{
							self.css({"top":0});
						}else if (self.position().top>(document.body.clientHeight-self.height()))
						{
							self.css({"position":"absolute","top":document.body.clientHeight-self.height()});
						}
					});
					self.mouseup(function()
					{
						self.css({"cursor":"default"});
						$(document).unbind();
					});
				});
			});
		}
	});
  })(jQuery)
