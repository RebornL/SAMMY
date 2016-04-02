var Come_to_an_end = 0;//整个流程结束


var Check_loginstatus = function(event)
{
$.ajaxSettings.async = false;
	$.getJSON("../php/outputcookies.php",function(data){
		if (data.islogin!=1)
		{
			$info = "<p><span>抱歉，你还没登陆SAMMY</span></p><p>请您登陆后提交订单</p>";
			$button = "<a href=\"./Userloginsignin.html\" data-role=\"button\" data-ajax=\"false\">返回登陆</a>";
			$hint = $("#hint");

			$hint.html($info+$button);//弹出提示框
			$.mobile.loading("hide");//关闭加载图标

			$.mobile.changePage("#page3");

		}
		else if (data.islogin == 1 && data.contract && data.user_id)
		{
			$("#contract").val(data.contract);
			$("#user_id").val(data.user_id);//顺便自动填写上
	}
	});
}


$(document).ready(function(){
	
		Check_loginstatus();

	
	$("#submit_button1").click(function(event){
		event.preventDefault(); //先阻止页面跳转
		if (!Form_Validity("usersubmitsammy")){return;}
		$.mobile.changePage("#page2");//允许跳转
		$name = "<tr><td>"+$("#user_name").val()+"</td>";
		$sex = "<td>"+$("#sex").find("option:selected").text()+"</td>";
		$age = "<td>"+$("#age").val()+"</td>";
		$contract = "<td>"+$("#contract").val()+"</td>";
		$ToC = "<td>"+$("#ToC").find("option:selected").text()+"</td>";
		$Dietitian = "<td>"+$("#Dietitian_ID").find("option:selected").text()+"</td>";
		$address = "<td>"+$("#address").val()+"</td>";
		$service_time = "<td>"+$("#service_time").val()+"</td>";
		$description = "<td>"+$("#description").val()+"</td>";
		$finish = "</tr>";
		$ToS = $("#ToS").find("option:selected").val();//更正
		
		$("#UpdateArea").empty();

		//这里是进行订单的展示//未提交前的展示
		if($ToS==0){
			//为快速预约
			$("table#info_table tbody")
				.append($name+$sex+$age+$contract+$ToC+$Dietitian+$address+$service_time+$finish)
				.closest("table#info_table");
			
			
		}else if ($ToS==1){
			//私人定制
			$("table#info_table tbody")
				.append($name+$sex+$age+$contract+$Dietitian+$address+$service_time+$description+$finish)
				.closest("table#info_table");
			
		}
		
		 try
		{
			$("#page2").page();
			$("#info_table")
				.table("refresh")
				.trigger( "create" );
		}
		catch(e)
		{
			/*alert("An exception occured in the script.异常名称: " + e.name
			+ ".异常信息: " + e.message);*/
		}
		
		
		//确认提交订单的操作
		$("#submit_button2").click(function(){
			var $info="";
			var $button="";
			$.mobile.loading("show");
			var formValues = $('#usersubmitsammy').serialize();


			$hint = $("#hint");
			$.ajaxSettings.async = false;

			$.getJSON("../php/adduserorder.php", formValues,function(data){
				//获取到返回的json数据信息,通过data.send_status查看信息
			
				if (data==-1)
				{
					$info = "<p><span>抱歉，你还没登陆SAMMY</span></p><p>请您登陆后提交订单</p>";
					$button = "<a href=\"./Userloginsignin.html\" data-role=\"button\" data-ajax=\"false\">返回登陆</a>";
				}
				
				if(data>0){
					$info = "<p><span>提交成功！谢谢你的信任！</span></p><p>（温馨提示：你可以在主界面的进行查询订单和修改订单）</p>";
					$button = "<a href=\"./sammy.html\" data-role=\"button\" data-ajax=\"false\">确定</a>";

					
				}else{
					$info = "<p><span>不好意思!SAMMY提交失败！</span></p><p>请重新预约！</p>";
					$button = "<a href=\"#page1\" data-role=\"button\" data-ajax=\"false\">确定</a>";
				}
			
            });

			$.ajaxSettings.async = true;
			$hint.html($info+$button);//弹出提示框
			$.mobile.loading("hide");//关闭加载图标

			$.mobile.changePage("#page3");
			Come_to_an_end = 1;//一显示最后页面 1

			});
			
			
	});
});
$(document).bind("pagebeforeshow", "#page2", function () {	//一旦#confirm页面显示#confirm

if (Come_to_an_end == 0)//第一次去最后的页面
	{
		//什么都不做
	}
else if (Come_to_an_end > 0)
	{
		window.location = "./sammy.html";//到了最后页面返回来的话 就重新加载  经典js方法
	}

});