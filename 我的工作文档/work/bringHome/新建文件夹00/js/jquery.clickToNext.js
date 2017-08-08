;(function($)
	{
		$.fn.extend(
		{
			"clickToNext":function(options)
			{
				var defaults=
				{
					name:"name",//调用层的class或者id
					leftBtn:"left",//左边的按钮样式(格式必须是光标(.cur)，不然无效)
					rightBtn:"right",//右边的按钮样式(格式必须是光标(.cur)，不然无效)
					timer:500,//完成动画的时间
					color:"white"//动画的颜色
				}
				options=$.extend(defaults,options);
				return this.each(function()
				{
					var self=$(options.name);
					self.css("position","relative").css("overflow","hidden");
					var one=$("<div></div>");
					var two=$("<div></div>");
					self.append(one);
					one.css({"position":"absolute","left":"0px","top":"0px","background":"#ffffff","height":self.height(),"width":(self.width()/2),"opacity":"0"});
					self.append(two);
					two.css({"position":"absolute","right":"0px","top":"0px","background":"#ffffff","height":self.height(),"width":(self.width()/2),"opacity":"0"});
					var liArr=self.find("li");
					var tmp=0;
					liArr.css("display","none");
					liArr.eq(tmp).css("display","block");
					one.mouseover(function()
					{
						self.css({"cursor":options.leftBtn});
					});	
					one.click(function()
					{
						var three=$("<div></div>");
						self.append(three);
						var href=liArr.eq(tmp-1).find("img").attr("src");
						//alert(href);
						three.css({"position":"absolute","top":"0px","right":"0px","opacity":"0","height":"0px","width":"0px","background":"url("+href+") no-repeat 0px 0px"});
						three.stop(true,false).animate({height:self.height(),width:self.width(),opacity:"1"},options.timer,function()
						{
							three.remove();
							if (tmp<=0)
							{
								tmp=liArr.length;
								liArr.eq(tmp).css("display","block").siblings("li").css("display","none");
							}
							tmp-=1;
							liArr.eq(tmp).css("display","block").siblings("li").css("display","none");
						});
					});
					two.mouseover(function()
					{
						self.css({"cursor":options.rightBtn});
					});	
					two.click(function()
					{
						var three=$("<div></div>");
						self.append(three);
						var href=liArr.eq(tmp+1).find("img").attr("src");
						three.css({"position":"absolute","top":"0px","left":"0px","background":"url("+href+") no-repeat 0px 0px","height":"0px","width":"0px","opacity":"0"});
						three.stop(true,false).animate({height:self.height(),width:self.width(),opacity:"1"},options.timer,function()
						{
							three.remove();
							if (tmp>=liArr.length-1)
							{
								tmp=0;
								liArr.eq(0).css("display","block").siblings("li").css("display","none");
								return;
							}
							tmp+=1;
							liArr.eq(tmp).css("display","block").siblings("li").css("display","none");
						});
					});
				});
			}
		});
	})(jQuery)