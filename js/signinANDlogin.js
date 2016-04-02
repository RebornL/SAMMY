var signin = function(event) {// 注册函数
	event.preventDefault(); // 阻止默认行为 ( 表单提交 )
	if (Form_Validity("usersignin")) {
		$.mobile.loading("show");
		var formValues = $('#usersignin').serialize();

		var $hint = $("#hint");
		$hint.empty();
		$.ajaxSettings.async = false;
		$.getJSON("../php/User_signin.php",formValues,function(data) {
			  // 获取到返回的json数据信息,通过data.send_status查看信息
			  if (data == 0) {
  
				  $info = "<p><span>您的手机号码已经注册</span></p><p>点击返回登陆</p>";
				  $button = "<a href=\"./Userloginsignin.html\" data-role=\"button\" data-ajax=\"false\">确定</a>";// 跳转登陆
  
			  } else if (data == -2) {
				  $info = "<p><span>您填写的两次密码不匹配</span></p><p>点击返回修改</p>";
				  $button = "<a href=\"./Userloginsignin.html#sammysignin\" data-role=\"button\" data-ajax=\"false\">确定</a>";// 跳转登陆
			  } else if (data == -1) {
				  $info = "<p><span>您填写的信息不完整</span></p><p>点击返回修改</p>";
				  $button = "<a href=\"./Userloginsignin.html#sammysignin\" data-role=\"button\" data-ajax=\"false\">确定</a>";// 跳转登陆
			  }
  
			  else if (data.User0.user_id != "undefined"
					  && data.User0.user_id > 0) {
				  $info = "<p><span>恭喜您，您已经注册成功，马上为您登陆</span></p><p style=\"font-size:24px\">"
						  + data.User0.nickname
						  + "</p><p style=\"font-size:24px\">已经登陆</p>";
				  $button = "<a href=\"./sammy.html\" data-role=\"button\" data-ajax=\"false\">去主页逛逛</a>";// 跳转登陆
  
			  }
		  });

		$hint.append($info + $button);// 弹出提示框
		$.mobile.changePage("#commit");

	}
}

var login = function(event) {// 登陆函数

	event.preventDefault(); // 阻止默认行为 ( 表单提交 )
	// 检验合法性
	if (Form_Validity("userlogin")) {
		$.mobile.loading("show");
		var formValues = $('#userlogin').serialize();
		// alert(formValues);//这个是显示序列化后测试查看的,用于测试
		var $hint = $("#hint");
		$hint.empty();
		$.ajaxSettings.async = false;
		$.getJSON("../php/User_login.php",formValues,function(data) {
			  // 获取到返回的json数据信息,通过data.send_status查看信息
			  // alert(data);
			  if (data == "-1") {

				  $info = "<p><span>登陆失败  用户名和密码不匹配</span></p><p></p>";
				  $button = "<a href=\"./Userloginsignin.html\" data-role=\"button\" data-ajax=\"false\">再试试？</a>" + '<br></br><div align="right"><a href="#Changepassword" data-inline="true" >忘记密码？</a></div>';// 跳转登陆页
			  }
			  else if (typeof (data.User0.user_id) !== "undefined"
					  && data.User0.user_id > 0) {

				  // alert(data.User0.user_id);

				  $info = "<p style=\"font-size:24px\"><span>欢迎您 " + data.User0.nickname
						  + " 回来</span></p><p></p>";
				  $button = "<a href=\"./sammy.html\" data-role=\"button\" data-ajax=\"false\">去主页逛逛</a>";// 跳转主页
				
				
			  }
		  });

		$hint.append($info + $button);// 弹出提示框
		$.mobile.changePage("#commit");
	}
}

var bindEvent = function() {
	// 查询按钮绑定
	$("#commitlogin_button").on("click", login);// 用户提交登陆按钮
	// 点击列表进入修改订单
	$("#commitsignin_button").on("click", signin);// 用户提交注册按钮
	// 提交订单
	$("#commitchangepw_button").on("click", Changepassword);// 用户提交注册按钮
};

$(document).ready(function() {
	Check_loginstatus();
	bindEvent();// 页面加载后注册事件//第二页面返回后 事件无效
});