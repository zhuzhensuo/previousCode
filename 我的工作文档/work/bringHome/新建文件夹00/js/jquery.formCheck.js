//版权所有，违权必究
  ;(function($)
  {
	$.fn.extend(
	{
		"check":function(options)
		{
			var defaults=
			{
				nameLen:5,
				passLen:2,
				tiph:200,
				tipw:200,
				tipbg:"none"
			}
			options=$.extend(defaults,options);
			
			return this.each(function()
			{
				var th=options.tiph;
				var tw=options.tipw;
				tbg=options.tipbg;
				var error=true;
				var self=$(this);
				var name=self.children("[name=name]:text");
				var age=self.children("[name=age]:text");
				var password=self.children("[name=password]:password");
				var repassword=self.children("[name=repassword]:password");
				var mail=self.children("[name=email]:text");
				var sex=self.children("[name=sex]:radio");
				var checkbox=self.children("[name=fav]:checkbox");
				var num=0;
				function tips(msg)
				{
					obj=$("<div class='border'id='error'></div>");
					obj.appendTo("body");
					obj.css({"width":tw,"height":th,"background":tbg,"position":"fixed","bottom":0,"left":($(document).width()/2-(tw/2)),"display":"none"});
					if ($("#error:animated"))
					{
						obj.stop(true,false).slideToggle(200,function()
						{
							$(":submit").attr("disabled",true);
						});
						obj.html(msg);
						$(":text,:radio,:password,:checkbox").focus(function()
						{
							obj.stop(true,false).fadeOut(200,function()
							{
								$(":submit").attr("disabled",false);
							});
						});
					}
				}
				$(":submit").click(function()
				{
					if (name.length>0)
					{
						if (name.val().toString()=="")
						{
							tips("姓名不能为空!");
							return false;
						}else if (name.val().indexOf("　")==true)
						{
							tips("姓名中包含非法字符！");
							return false;
						}
						else if (name.val().length<options.nameLen)
						{
							tips("姓名长度不能少于"+options.nameLen+"位");
							return false;
						}
					}
					
					if (age.length>0)
					{
						if (age.val()=="")
						{
							tips("请输入您的年龄!");
							return false;
						}else if (isNaN(age.val()))
						{
							tips("年龄必须是数字!");
							return false;
						}else if (age.val()<0 || age.val()>100)
						{
							tips("请输入正常年龄!");
							return false;
						}
					}
					
					
					if (sex.length>0)
					{
						if (self.children("[name=sex]:radio:checked").length==0)
						{
							tips("请选择性别!");
							return false;
						}	
					}
					
					if (password.val()=="")
					{
						tips("请输入密码!");
						return false;
					}else if (password.val().length<options.passLen)
					{
						tips("密码长度不能低于"+options.passLen+"位!");
						return false;
					}

					if (repassword.val()!=password.val())
					{
						tips("两次密码不一致!");
						return false;
					}

					if (mail.length>0)
					{
						if (mail.val()=="")
						{
							
							tips("请输入邮箱!");
							return false;
						}else if (mail.val().indexOf("@")==-1 || mail.val().indexOf(".")==-1)
						{
							tips("邮箱格式不正确!");
							return false;
						}
					
					}
					if (checkbox.length>1)
					{
						if (self.children("[name=fav]:checkbox:checked").length==0)
						{
							tips("至少选择一个爱好!");
							return false;
						}
					}

				});
			});
		}
	});
  })(jQuery)