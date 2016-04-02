
var logout = function()
{//登陆函数
	$.mobile.loading("show");
	//var formValues = $('#userlogin').serialize();
	//alert(formValues);//这个是显示序列化后测试查看的,用于测试
	//$("#result_show").append(number);http:

	var $hint = $("#hint");
	$hint.empty();
	$.ajaxSettings.async = false;
	$.getJSON("../php/User_logout.php",function(data){
		//获取到返回的json数据信息,通过data.send_status查看信息
		if(data=="1"){
			
			$info = "<p><span>再见</span></p><p>您还需要登陆吗？</p>";
			$button = "<a href=\"./Userloginsignin.html\" data-role=\"button\" data-ajax=\"false\">返回登陆</a>";//跳转登陆页
		}
		else
		{
			$info = "<p><span>退出登录失败</span></p><p>还没登陆？</p>";
			$button = "<a href=\"./Userloginsignin.html\" data-role=\"button\" data-ajax=\"false\">返回登陆</a>";//跳转登陆页
		}
	});
	
	$hint.prepend($info+$button);//弹出提示框
	$.mobile.changePage("#commit");//IE不能通过herf跳转??
	$("#commit").page();
	$("button").button("refresh");
	
}

var bindEvent = function(){
	$("#commitlogout_button").on("click",logout);//用户提交登陆按钮

};

$(document).ready(function(){	//检车登录状态
		
		
		$.ajaxSettings.async = false;
		$.getJSON("../php/outputcookies.php",function(data){
		if (data.islogin!=1)
		{
			//alert("你还没登陆");
			$info = "<p><span>您还没登陆SAMMY</span></p><p>现在去登陆？</p>";
			$button = "<a href=\"./Userloginsignin.html\" data-role=\"button\" data-ajax=\"false\">现在登陆</a>";//跳转主页
			$("#commitlogout_button").hide();//隐藏掉确认修改按钮按钮


		}
		else if (data.islogin == 1 && data.contract && data.user_id)
		{
			$info = "<p><span>真的离开SAMMY？</span></p><p>"+data.nickname+"</p>";
			$button = "";//跳转温馨提示
			//$("#commitlogout_button").show();//隐藏掉确认修改按钮按钮

		}
			$logout = $("#logout");
			$logout.empty();
			$logout.prepend($info+$button);//弹出提示框
			$.mobile.loading("hide");//关闭加载图标
			$("#sammylogout").page();
			$("button").button("refresh");
		
		
	});
	
	bindEvent();//页面加载后注册事件//第二页面返回后 事件无效


});