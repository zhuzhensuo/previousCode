;(function($)
	{
		$.fn.extend(
		{
			"resize":function(options)
			{
				var defaults=
				{
					cursor:"nw-resize"
				}
				options=$.extend(defaults,options);
				return this.each(function()
				{
					var self=$(this);
					self.css("word-wrap","break-word");
					var div=$("<div></div>");
					div.appendTo(self);
					div.css({"height":"10px","width":"10px","background":"white","opacity":"0","position":"absolute","right":"0px","bottom":"0px","cursor":options.cursor,"zIndex":"1000"});
					div.mousedown(function(e)
					{
						var top=self.offset().top;
						var left=self.offset().left;
						$(document).mousemove(function(e)
						{
							var x2=e.clientX;
							var y2=e.clientY;
							self.css({"height":y2-top,"width":x2-left});
						});
						$(document).mouseup(function()
						{
							$(document).unbind("mousemove");
						});
					});
					
				});
			}
		});
	})(jQuery);