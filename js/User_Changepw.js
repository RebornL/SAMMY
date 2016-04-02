// JavaScript Document
var Changepassword = function(event) {// 更改密码

	event.preventDefault(); // 阻止默认行为 ( 表单提交 )
	// 检验合法性
	if (Form_Validity("userchangepassword")) {
		$.mobile.loading("show");
		var formValues = $('#userchangepassword').serialize();
		// alert(formValues);//这个是显示序列化后测试查看的,用于测试
		var $hint = $("#hint");
		$hint.empty();
		$.ajaxSettings.async = false;
		$.getJSON("../php/User_Changepw.php",formValues,function(data) {
			  // 获取到返回的json数据信息,通过data.send_status查看信息
			  // alert(data);
			  if (data == "-1") {

				  $info = "<p><span>修改密码失败  手机号码和昵称不匹配</span></p><p>点击返回</p>";
				  $button = "<a href=\"./Userloginsignin.html#Changepassword\" data-role=\"button\" data-ajax=\"false\">返回</a>";// 跳转登陆页
			  }
			if (data == "0") {

				  $info = "<p><span>修改密码失败  新密码与原密码相同</span></p><p> </p>";
				  $button = "<a href=\"./Userloginsignin.html\" data-role=\"button\" data-ajax=\"false\">返回登陆</a>";// 跳转登陆页
			  }
			  else if (data == "1") {

				  // alert(data.User0.user_id);

				  $info = "<p style=\"font-size:24px\"><span>您修改密码成功</span></p><p></p>";
				  $button = "<a href=\"./Userloginsignin.html\" data-role=\"button\" data-ajax=\"false\">现在去登陆</a>";// 跳转主页
				
				
			  }
		  });

		$hint.append($info + $button);// 弹出提示框
		$.mobile.changePage("#commit");
	}
}