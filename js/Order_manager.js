var isAjax = 0;//0表示还没点击 还没请求ajax
var Leave_1st_page = 0;//未离开首页为0
var Come_to_an_end = 0;//整个流程结束
//修改订单的操作
var CancelorModify = 0;
var goToModifyOrder = function(){
	$("select[name=ToS]").attr("disabled",false);
	document.getElementById("usersubmitsammy").reset(); //还是这种reset靠谱
	$.mobile.loading("show");
	var order_ID = $(this).attr("data-no");//获取订单ID
	
	if(isAjax) {return;}//阻止暴力点击 //阻止暴力点击订单
	$.ajaxSettings.async = false;
	isAjax = 1;//可以再次点击有效  请求过就1
//根据订单ID（即order_ID）的唯一，再次查询数据得到唯一的数据，返回json数据显示填表
	$.getJSON("../php/userchkorder.php?order_ID="+order_ID,function(data){
//得到的json数据格式：{"Order0":{"order_ID":"92","user_id":"0","ToS":"0","ToC":"0","Dietitian":"1","user_name":"\u7684\u554a","sex":"0","address":"\u7684\u554a\u554a\u54c7\u54c7\u54c7","age":"12","contract":"123123123","description":"","service_time":"1211-03-01","commit_time":"2015-08-14 01:02:25","order_status":"0"}}
		//$("select[name=ToS]").attr("disabled",false);
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
			for (var item in order_info){
			
				if((item == "ToS") || (item == "ToC") || (item == "Dietitian_ID") || (item =="sex")){
					//document.getElementById(item).length
					$("#"+item).find("option:selected").attr("selected",false);//撤销选中
					$("#"+item).find("option[value='"+order_info[item]+"']").attr("selected",true);//设置value值为order_info[item]选中
					$("#"+item).prev("span").text($("#"+item).find("option[value='"+order_info[item]+"']").text());

				}else
				{
					$("#"+item).val(order_info[item]);
				}
			}

			if(order_info["ToS"]==1)//私人定制
				{
					$("#description_div").show();
					$("#ToC_div").hide();
					$("#description").prop("disabled",false).removeClass('ui-state-disabled');
					//$("#description").removeAttr("disabled"); 
				}else//快速预约里面对description做点处理
				{
					$("#ToC_div").show();
					$("#description_div").hide();
					
					$("#description").val(" ");
					
					$("#description").prop("disabled",true);
				}
				
			$("select[name=ToS]").attr("disabled",true); //暂时设置为不可用，会导致不能提交该项

			//$("#submit_button1").show();//显示回去
			$("#submit_button1").attr("disabled",false);
			$("#submit_button1").val("提交修改");
			if (order_info["order_status"]!=0 && order_info["order_status"]!=3)//暂时3可用，为了测试
			{
				//$("#submit_button1").hide();//不允许提交
				$("#submit_button1").attr("disabled",true);
				$("#submit_button1").val("该订单不能修改");
			}
			$.mobile.loading("hide");
            $.mobile.changePage("#modify");//此刻切换到修改订单的界面
			//
			$("#modify").page();
			
			$( "#submit_button1" ).button( "refresh" );
			if ($("#ToS-button").length==1)//清除障碍//发生在changepage之后
			{	//$("#Dietitian_ID").unwrap().unwrap();
				$("#ToS-button").removeClass("ui-state-disabled").removeAttr("aria-disabled");
				//aria-disabled
			}//去掉它的父元素
			isAjax = 0;//表明可以再次点击 页面跳转之后

		});
	});
	
};

//提交订单操作
var submitOrder = function(event){//取消订单 修改订单共用此函数 但被另一个函数调用
	if(isAjax) {return;}
	if (!CancelorModify)//取消订单不用表单验证
		{if (!Form_Validity("usersubmitsammy")){return;}}
	isAjax = 1;//跳转后恢复
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
	$each_order = $begin+$name+$sex+$age+$contract+$ToS+$ToC+$Dietitian+$description+$address+$service_time+$finish;
	
	$("tbody").empty();


	$("#info_table").children("tbody").append($each_order);
	$("#confirm").page();
	$( "#submit_button2" ).button( "refresh" );
	$( "#cancel_button2" ).button( "refresh" );
	 try
	{
		$("#info_table")
			.table("refresh")
			.trigger( "create" );
	}
	catch(e)
	{
		consloe.log("An exception occured in the script.异常名称: " + e.name
			+ ".异常信息: " + e.message);
	}

	$.mobile.loading("hide");
	$.mobile.changePage("#confirm");//允许跳转

	isAjax = 0;
		
		
};

//确认提交事件
var commitOrder = function(event){
	event.preventDefault(); //先阻止页面跳转

	$("select[name=ToS]").attr("disabled",false); //提交前恢复可用，能提交这一项

	var $info="";
	var $button="";

	$.mobile.loading("show");
	var formValues = $('#usersubmitsammy').serialize();
	//alert(formValues);
	var $hint = $("#hint");
	if(isAjax) {return;}//阻止暴力点击确认提交
	$.ajaxSettings.async = false;
	isAjax = 1;
	$.getJSON("../php/usermodorder.php", formValues,function(data){
		
		//获取到返回的json数据信息,通过data.send_status查看信息
		if(data == 1){
			$info = "<p><span>修改成功！谢谢您的支持！</span></p><p>（温馨提示：您可以在主界面的进行查询订单和修改订单）</p>";
			$button = "<a href=\"./Order_manager.html\" data-role=\"button\" data-ajax=\"false\">确定</a>";
			
		}else{
			$info = "<p><span>不好意思  您的订单并没有作出修改</span></p><p>请重新下预约！</p>";
			$button = "<a href=\"./Order_manager.html\" data-role=\"button\" data-ajax=\"false\">确定</a>";
		}
	
	});
	$hint.empty();
	$hint.append($info+$button);//弹出提示框
	$.mobile.loading("hide");//关闭加载图标
	$.mobile.changePage("#commit");
	//Come_to_an_end = 1;//结束将会阻止返回
	isAjax = 0;//页面跳转后才允许点击
};

var CancelOrder = function(event){
	event.preventDefault(); //先阻止页面跳转
	
	var $info="";
	var $button="";

	var $hint = $("#hint");

	$.mobile.loading("show");
	var order_ID = $("#order_ID").val();//获取订单ID

	if(isAjax) return;//阻止暴力点击取消订单
	isAjax = 1;//防止再次点击有效
	
	$.ajaxSettings.async = false;
	//根据订单ID（即order_ID）的唯一，再次查询数据得到唯一的数据，返回json数据显示填表
	$.getJSON("../php/usercancelorder.php?order_ID="+order_ID,function(data){
		//获取到返回的json数据信息,通过data.send_status查看信息

		if(data == 1){
			$info = "<p><span>取消成功！谢谢你的信任！</span></p><p>（温馨提示：你可以在主界面的进行查询订单和修改订单）</p>";
			$button = "<a href=\"./Order_manager.html\" data-role=\"button\" data-ajax=\"false\">确定</a>";
			
		}else{
			$info = "<p><span>不好意思！本次取消失败！</span></p><p>请重新下预约！</p>";
			$button = "<a href=\"./Order_manager.html\" data-role=\"button\" data-ajax=\"false\">确定</a>";
		}
	
	});

	$hint.empty();
	$hint.append($info+$button);//弹出提示框
	$.mobile.loading("hide");//关闭加载图标
	$.mobile.changePage("#commit");
	//Come_to_an_end = 1;//结束将会阻止返回

	isAjax = 0;//页面跳转才恢复
};

var submitOrderbeforeUpdate=function(event){
	CancelorModify = 0;
	event.preventDefault(); //先阻止页面跳转
	$("#submit_button2").attr("disabled",false);//用户后退再进入恢复显示//不知为毛会错位
	$("#cancel_button2").attr("disabled",true);//隐藏掉去意已决按钮
	submitOrder();//调用通用的函数
}

var submitOrderbeforeCancel=function(event){
	CancelorModify = 1;//取消
	event.preventDefault(); //先阻止页面跳转
	$("#cancel_button2").attr("disabled",false);//用户后退再进入恢复显示
	$("#submit_button2").attr("disabled",true);//隐藏掉确认修改按钮按钮
	submitOrder();//调用通用的函数
}

//绑定事件
var bindEvent = function(){
	//查询按钮绑定
	$("#search_button").unbind().bind("click",function(){searchOrder();});
	//点击下面的导航按钮不必重新读取数据库
	$("#order_status_0").unbind().bind("click",function(){Show_order(order_data,0);});
	$("#order_status_1").unbind().bind("click",function(){Show_order(order_data,1);});
	$("#order_status_2").unbind().bind("click",function(){Show_order(order_data,2);});
	$("#order_status_4").unbind().bind("click",function(){Show_order(order_data,4);});
	//点击列表进入修改订单
	//$("#resultlist").off().on("click","a",goToModifyOrder);//这个属于动态事件
	//提交订单
	//这个事件search中注册
	$("#submit_button1").unbind().bind("click",submitOrderbeforeUpdate);
	//确认订单
	$("#submit_button2").unbind().bind("click",commitOrder);
	
	$("#cancel_button1").unbind().bind("click",submitOrderbeforeCancel);
	//确认订单
	$("#cancel_button2").unbind().bind("click",CancelOrder);
};

isbind=0;
//页面加载后进行的操作入口
$(document).on("pagebeforeshow","#search",function(){	

if (Leave_1st_page == 0)//第一次来
	{
		//searchOrder();//每次页面search加载都执行
	}
else if (Leave_1st_page > 0)
	{
		window.location = "./Order_manager.html";//离开过 就重新加载  经典js方法
	}

});

$(document).on("pageshow","#commit",function(){	//一旦#commit页面显示#commit
	
	Come_to_an_end = 1;//一显示最后页面 1
});
$(document).on("pageshow", "#modify", function () {	//一旦#commit页面显示#commit

    Leave_1st_page = 1; //离开首页 1
});
$(document).on("pagebeforeshow", "#confirm", function () {	//一旦#confirm页面显示#confirm

if (Come_to_an_end == 0)//第一次去最后的页面
	{
		//什么都不做
	}
else if (Come_to_an_end > 0)
	{
		window.location = "./Order_manager.html";//到了最后页面返回来的话 就重新加载  经典js方法
	}

});

