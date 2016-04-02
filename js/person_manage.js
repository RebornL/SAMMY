var isAjax=0;

$(document).ready(function() {

//$(document).on("pageinit","#logout_status",function(){
	//alert("页面正在加载");
	$.ajaxSettings.async = false;
	if (isAjax){return;}
	$.getJSON("../php/outputcookies.php",function(data){isAjax=1;
		//检测是不是已经登陆过，登陆过切换到login_status界面
		if(data.islogin == 1 &&data.contract && data.user_id){//即已经登陆过，获取信息并填补login_status界面
			
			$.mobile.loading("show");
			//主要是填补name那块
			//$("#user_name").attr("value",data.nickname)
			if ($("#your_nickname").length==0)
			{
				$("#show_nickname").append('<div id="your_nickname"><p >'+data.nickname+"</p></div>");
			}
			
			//切换到login_status界面
			$.mobile.loading("hide");
			$.mobile.changePage("#login_status")
		}else{
			if ($("#your_nickname").length==0)

			{$("#show_nickname").append('<div id="your_nickname"><p >'+"您还没登陆</p></div>");}
			//$("#your_nickname").show;
			
		}
	});
	$("#your_nickname").show;
	$.ajaxSettings.async = true;
});
