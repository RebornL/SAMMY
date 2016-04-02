var Check_loginstatus = function(event) {
	$.ajaxSettings.async = false;
	$.getJSON("../php/outputcookies.php",function(data) {
						if (data.islogin != 1) {
							// alert("你还没登陆");

						} else if (data.islogin == 1 && data.contract
								&& data.user_id) {
							$info = "<p><span>欢迎回到SAMMY</span></p><p style=\"font-size:24px\">您好！"
									+ data.nickname + "</p>";
							$button = "<a href=\"./sammy.html\" data-role=\"button\" data-ajax=\"false\">去主页逛逛</a>";// 跳转主页
							$button2 = "<a href=\"#sammylogin\" data-role=\"button\" data-ajax=\"false\">更换账号登陆</a>";// 跳转主页

							$hint = $("#hint");

							$hint.html($info + $button + $button2);// 弹出提示框
							$.mobile.loading("hide");// 关闭加载图标

							$.mobile.changePage("#commit");
						}
					});
}