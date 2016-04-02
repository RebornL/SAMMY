// JavaScript Document
//查询订单的操作
var searchOrder = function(){
	//清空列表
	$("#resultlist").empty();
	//显示加载图标
	$.mobile.loading("show");
	var number = $("#_contract").val();
	//$("#result_show").append(number);
	//$.ajaxSettings.async = false;
	$.getJSON("../php/userchkorder.php?contract="+number,function(data)
	{	
		//alert(data);
		//$("#result").html("<p>没有记录！</p>");
		
		//这里添加了判断，当没有记录数据返回，提示没有记录。
		if (data==-1)//未登录返回
		{
			//alert("你还没登陆");
			$info = "<p><span>抱歉  你还没登陆SAMMY</span></p><p>请您登陆后查看订单</p>";
			$button = "<a href=\"./Userloginsignin.html\" data-role=\"button\" data-ajax=\"false\">返回登陆</a>";
			$hint = $("#hint");

			$hint.html($info+$button);//弹出提示框
			$.mobile.loading("hide");//关闭加载图标

			$.mobile.changePage("#commit");
		}
		else if(typeof(data.Order0) == "undefined"){
			//数据库没有记录
			$("#resultlist").html('<p style="font-size:25px">没有您的订单！</p>');
			$.mobile.loading("hide");//关闭加载图标
		}
		
		else{
			
			var ToC_com=["健康调理","营养咨询","母婴健康","健康计划","饮食计划"];
			var ToS_com=["快速预约","私人定制"];
			//var i=0;
			$.each(data,function(key,obj){
			
			//i++;
			$order_ID = "<h1 class=\"ui-li-aside\">"+"订单"+obj.order_ID+"</h1>";
			
			//默认是没有连接的能够点击的——炜兴
			if (obj.order_status=="0"){
				//允许点击修改订单，href中的链接修改到修改订单的界面 这种状态下可以修改订单——炜兴
				//要不用JQ去把能修改的这张订单的order_id传递给PHP，从而获取json，获取修改订单页面
				//订单信息显示为未完成
				$order_status = "<p align=\"right\"><span>订单状态：已经提交  等待受理</span></p></a></li>";
			}
			else if(obj.order_status=="3"){
				//订单为固定，可点击无法修改
				//订单显示为已完成，后续可更改为点击进行评分评价
				$order_status = "<p  align=\"right\"><span>订单状态：已完成  可以进行评价</span></p></a></li>";
			}
			
			else if(obj.order_status=="4"){
				//订单为固定，可点击无法修改
				//订单显示为已完成，后续可更改为点击进行评分评价
				$order_status = "<p  align=\"right\"><span>订单状态：已完成  已评价</span></p></a></li>";
			}
			
			else if(obj.order_status=="1")
				{
					//订单为固定，可点击无法修改
					$order_status = "<p  align=\"right\"><span>订单状态：已经受理  等待服务</span></p></a></li>";
				}
			else 
				{
					//订单为固定，可点击无法修改
                	$order_status = "<p  align=\"right\"><span>订单状态：正在服务</span></p></a></li>";
				}

			
			$user_name = "<h3><br>您的姓名："+obj.user_name+"</h3>";
			$address = "<p><span>您的联系地址："+obj.address+"</span></p>";
			$ToS= "<p><span>服务类型："+ToS_com[obj.ToS]+"</span></p>";
			$contract= "<p><span>联系方式："+obj.contract+"</span></p>";

			if (obj.ToS==0)//快速预约 有资讯类型 没有描述
			{$ToC= "<p><span>咨询类型："+ToC_com[obj.ToC]+"</span></p>";
			$description= "";
			$order = "<li><a href=\"#\" data-no=\""+obj.order_ID+"\">"+$order_ID;
			}
			else //私人定制 没有ToC 有description
			{$ToC="";
			$description= "<p><span>您的需求："+obj.description+"</span></p>";
			$order = "<li><a href=\"#\" data-no=\""+obj.order_ID+"\">"+$order_ID;//ID切记要大写
			}
			//alert($order);
			$Dietitian = "<p><span>预约的营养师：营养师"+obj.Dietitian_ID+"</span></p>";
			$service_time = "<p><span>期望服务时间："+obj.service_time+"</span></p>";
			$commit_time = "<p><span>该订单提交时间："+obj.commit_time+"</span></p>";

			$each_order = $order+" "+$user_name+" "+$ToS+" "+$ToC+" "+$order_ID+" "+$contract+" "+$address+" "+$Dietitian+" "+$description+" "+$service_time+" "+$commit_time+" "+$order_status;//多显示了用户的需求，去掉后面一个
			//在页面中每一个订单
			$("#resultlist").append($each_order);

			//$("#list").append($order+" "+$user_name+" "+$ToS+" "+$ToC+" "+$order_ID+" "+$address+" "+$Dietitian+" "+$order_status);
			});
			//重新渲染	
			//$("div[data-role=content] ul").listview();
			$("#resultlist").listview("refresh");
			$.mobile.loading("hide");//关闭加载图标
			
			
			
		}
	});

};

//修改订单的操作
isAjax = false;//防止点击多次
var goToModifyOrder = function(){
	$.mobile.loading("show");
	var order_ID = $(this).attr("data-no");//获取订单ID
	
	if(isAjax) return;
	isAjax = true;//防止再次点击有效
	//$.ajaxSettings.async = false;
	//根据订单ID（即order_ID）的唯一，再次查询数据得到唯一的数据，返回json数据显示填表
	$.getJSON("../php/userchkorder.php?order_ID="+order_ID,function(data){
		//得到的json数据格式：{"Order0":{"order_ID":"92","user_id":"0","ToS":"0","ToC":"0","Dietitian":"1","user_name":"\u7684\u554a","sex":"0","address":"\u7684\u554a\u554a\u54c7\u54c7\u54c7","age":"12","contract":"123123123","description":"","service_time":"1211-03-01","commit_time":"2015-08-14 01:02:25","order_status":"0"}}
		//alert(JSON.stringify(data));
		$.each(data,function(key,order_info){
			/* 数据顺序
			$order_ID = order_info.order_ID;
			$user_id = order_info.user_id;
			$ToS = order_info.ToS;
			$ToC = order_info.ToC;
			$Dietitian = order_info.Dietitian;
			$user_name = order_info.user_name;
			$sex = order_info.sex;
			$address = order_info.address;
			$age = order_info.age;
			$contract = order_info.contract;
			$description = order_info.description;
			$service_time = order_info.service_time;
			$order_status = order_info.order_status;
			 */
			//$("#order_ID").attr("value",$order_ID);
			//alert(JSON.stringify(order_info));
			for (var item in order_info){
				//alert(order_info[item]);//item是键

				
				if(item == "commit_time" || item == "order_status"){
					continue;
				}
				if((item == "ToS") || (item == "ToC") || (item == "Dietitian_ID") || (item =="sex")){
					$("#"+item).find("option[value='"+order_info[item]+"']").attr("selected",true);//设置value值为order_info[item]选中
				}else{
					//alert(order_info[item]);//item是键

					$("#"+item).val(order_info[item]);//不知道为什么contract填不上
				}
				//$("#contract").val(order_info[contract]);
				

				
			}
			
			if(order_info["ToS"]==1)//私人定制
				{
					$("#ToC_div").hide();
				}else//快速预约里面对description做点处理
				{
					$("#description_div").hide();
					
					$("#description").val(" ");
					
					$("#description").attr("disabled",true);
				}
				
			$("select[name=ToS]").attr("disabled",true); //暂时设置为不可用，会导致不能提交该项
			//alert(order_info["order_status"]);
			$("#submit_button1").show();//显示回去
			if (order_info["order_status"]!=0 && order_info["order_status"]!=3)//暂时3可用，为了测试
			{
				//alert(order_info["order_status"]);
				$("#submit_button1").hide();//不允许提交
			}
			isAjax = false;//表明可以再次点击
			$.mobile.loading("hide");
            $.mobile.changePage("#modify");//此刻切换到修改订单的界面
			
		});
	});
	
};

//提交订单操作
var submitOrder = function(event){//取消订单 修改订单共用此函数 但被另一个函数调用
	if (!Form_Validity("usersubmitsammy")){return;}
	$.mobile.changePage("#confirm");//允许跳转
	
	$.mobile.loading("show");
	$tr = $('<tr></tr>');
	$begin = "<tr>";
	$name = "<td>"+$("#user_name").val()+"</td>";
	$sex = "<td>"+$("#sex").find("option:selected").text()+"</td>";
	$age = "<td>"+$("#age").val()+"</td>";
	$contract = "<td>"+$("#contract").val()+"</td>";
	$ToC = "<td>"+$("#ToC").find("option:selected").text()+"</td>";
	$Dietitian = "<td>"+$("#Dietitian_ID").find("option:selected").text()+"</td>";
	$address = "<td>"+$("#address").val()+"</td>";
	$service_time = "<td>"+$("#service_time").val()+"</td>";
	$description = "<td>"+$("#description").val()+"</td>";
	$finish = "</tr>";
	$ToS = "<td>"+$("#ToS").find("option:selected").text()+"</td>";
	$each_order = $begin+$name+$sex+$age+$contract+$ToS+$ToC+$Dietitian+$description+$address+$service_time+$finish;//似乎漏了前后的tr标签
	$("tbody").empty();
	//alert($name+$sex+$age+$contract+$ToS+$ToC+$Dietitian+$description+$address+$service_time);
	//$($each_order).appendTo($tr);
	//$("tbody").append($tr);
	$("#info_table").children("tbody").append($each_order);
	//$($each_order).appendTo("tbody");
	//$("tbody")	//.append($tr.append($name+$sex+$age+$contract+$ToS+$ToC+$Dietitian+$description+$address+$service_time+$finish))
		//.closest("table#info_table");
	 try
	{
		$("#info_table")
			.table("refresh")
			.trigger( "create" );
	}
	catch(e)
	{
		/*alert("An exception occured in the script.异常名称: " + e.name
			+ ".异常信息: " + e.message);*/
	}

	$.mobile.loading("hide");
	
		
		
};

//确认提交事件
var commitOrder = function(){
	$("select[name=ToS]").attr("disabled",false); //提交前恢复可用，能提交这一项

	var $info="";
	var $button="";
	var $Order_details="";
	$.mobile.loading("show");
	var formValues = $('#usersubmitsammy').serialize();
	//alert(formValues);//这个是显示序列化后测试查看的,用于测试
	//$("#result_show").append(number);
	var $hint = $("#hint");
	$.ajaxSettings.async = false;
	$.getJSON("../php/usermodorder.php", formValues,function(data){
		//获取到返回的json数据信息,通过data.send_status查看信息
		//alert(data.Order0.order_ID);
		if(data.send_status == "success" || data.Order0.order_ID){
			$info = "<p><span>提交成功！谢谢你的信任！</span></p><p>（温馨提示：你可以在主界面的进行查询订单和修改订单）</p>";
			$button = "<a href=\"./search2.html\" data-role=\"button\" data-ajax=\"false\">确定</a>";
			
		}else{
			$info = "<p><span>不好意思!SAMMY提交失败！</span></p><p>请重新下预约！</p>";
			$button = "<a href=\"./search2.html\" data-role=\"button\" data-ajax=\"false\">确定</a>";
		}
	
	});
	//alert($info+$Order_details+$button);

	$hint.append($info+$Order_details+$button);//弹出提示框
	$.mobile.loading("hide");//关闭加载图标
	$.mobile.changePage("#commit");
};

var CancelOrder = function(){
	
	
	var $info="";
	var $button="";
	var $Order_details="";
	var $hint = $("#hint");

	$.mobile.loading("show");
	var order_ID = $("#order_ID").val();//获取订单ID
	//alert(order_ID);
	if(isAjax) return;
	isAjax = true;//防止再次点击有效
	$.ajaxSettings.async = false;
	//根据订单ID（即order_ID）的唯一，再次查询数据得到唯一的数据，返回json数据显示填表
	$.getJSON("../php/usercancelorder.php?order_ID="+order_ID,function(data){
		//获取到返回的json数据信息,通过data.send_status查看信息
		//alert(data);
		if(data){
			$info = "<p><span>取消成功！谢谢你的信任！</span></p><p>（温馨提示：你可以在主界面的进行查询订单和修改订单）</p>";
			$button = "<a href=\"./search2.html\" data-role=\"button\" data-ajax=\"false\">确定</a>";
			
		}else{
			$info = "<p><span>不好意思!本次取消失败！</span></p><p>请重新下预约！</p>";
			$button = "<a href=\"./search2.html\" data-role=\"button\" data-ajax=\"false\">确定</a>";
		}
	
	});
	//alert($info+$Order_details+$button);

	$hint.append($info+$Order_details+$button);//弹出提示框
	$.mobile.loading("hide");//关闭加载图标
	$.mobile.changePage("#commit");
	
};

var submitOrderbeforeUpdate=function(event){
	event.preventDefault(); //先阻止页面跳转

	$("#submit_button2").show();//用户后退再进入恢复显示//不知为毛会错位
	$("#cancel_button2").hide();//隐藏掉去意已决按钮
	submitOrder();//调用通用的函数
}

var submitOrderbeforeCancel=function(event){
	
	$("#cancel_button2").show();//用户后退再进入恢复显示
	$("#submit_button2").hide();//隐藏掉确认修改按钮按钮
	submitOrder();//调用通用的函数
}

//绑定事件
var bindEvent = function(){
	//查询按钮绑定
	$("#search_button").on("click",searchOrder);
	//点击列表进入修改订单
	$("#resultlist").on("click","a",goToModifyOrder);
	//提交订单
	$("#submit_button1").on("click",submitOrderbeforeUpdate);
	//确认订单
	$("#submit_button2").on("click",commitOrder);
	
	$("#cancel_button1").on("click",submitOrderbeforeCancel);
	//确认订单
	$("#cancel_button2").on("click",CancelOrder);
};

isbind=0;
//页面加载后进行的操作入口
$(document).on("pageshow","#search",function(){	
	
/* 	if(isbind) {
		return;//减少重复执行
	}
	isbind=1; */
	bindEvent();
	searchOrder();

});