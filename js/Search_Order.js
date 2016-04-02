//查询订单的操作
var order_data="";//订单数据全局变量

var searchOrder = function(get_order_status){
	//清空列表
	//显示加载图标
	$.mobile.loading("show");
	$.ajaxSettings.async = false;
	$.getJSON("../php/userchkorder.php",function(data)
	{
		if (data==-1)//未登录返回
		{
			$info = '<p style="font-size:24px"><span>抱歉  您还没登陆SAMMY</span></p><p>请您登陆后查看订单</p>';
			$button = "<a href=\"./Userloginsignin.html\" data-role=\"button\" data-ajax=\"false\">返回登陆</a>";
			$hint = $("#hint");
		
			$hint.html($info+$button);//弹出提示框
			$.mobile.loading("hide");//关闭加载图标
		
			$.mobile.changePage("#commit");//温馨提示
		}
		else
		{	
			order_data=data;//全局变量赋值
			if (get_order_status!=undefined)//评价中心特殊对待
			{Show_order(order_data,get_order_status);}
			else
			{Show_order(order_data);}//传递全局变量  略去一个参数
		}
	});//getJSON的结束

};//searchOrder的结束

var Show_order = function(data,get_order_status){
$("#resultlist").empty();

//这里添加了判断，当没有记录数据返回，提示没有记录。
if(typeof(data.Order0) == "undefined"){
	//数据库没有记录
	$("#resultlist").html('<p ><h2><span align="center">没有您的订单</span></h2></p>');
	$.mobile.loading("hide");//关闭加载图标
}

else{
	var ToC_com=["健康调理","营养咨询","母婴健康","健康计划","饮食计划"];
	var ToS_com=["快速预约","私人定制"];
	var i=0;
	var begin='<br/><h3><span>您的全部订单：</span></h3>';//没有参数传入就是这个
	$.each(data,function(key,obj){

		if (get_order_status!=undefined){
		begin='<br/><h3><span>您的订单：</span></h3>';//分类显示
		if (get_order_status==4)//待评价 完成合并 滤掉0 1 2 //对传入的4特殊处理
		{
			if (obj.order_status<=2)//0 1 2
			{return true;}
		}
		else if (get_order_status==3)//待评价
		{
			begin='<br/><h3><span>您还有待评价的订单：</span></h3>';
			if (obj.order_status!=3)
			{return true;}
		}
		else if (get_order_status!=obj.order_status)
			{return true;}
		}
		
	i++;//统计显示数量
	
	$order_ID = "<h1 class=\"ui-li-aside\">"+"订单号："+obj.order_ID+"</h1>";
	
	if (obj.order_status=="0"){
		$order_status = "<p align=\"right\"><span>已经提交  等待受理</span></p></a></li>";
	}
	else if(obj.order_status=="3"){
		$order_status = "<p  align=\"right\"><span>已完成  可以进行评价</span></p></a></li>";
	}
	
	else if(obj.order_status=="4"){
		$order_status = "<p  align=\"right\"><span>已完成  已评价</span></p></a></li>";
	}
	
	else if(obj.order_status=="1")
	{
		$order_status = "<p  align=\"right\"><span>已经受理  等待服务</span></p></a></li>";
	}
	else 
	{
		$order_status = "<p  align=\"right\"><span>正在服务</span></p></a></li>";
	}

	$order = "<li><a href=\"#\" data-no=\""+obj.order_ID+"\">"+$order_ID;//ID切记要大写

	$user_name = "<h3><br>您的姓名："+obj.user_name+"</h3>";
	$address = "<p><span>您的联系地址："+obj.address+"</span></p>";
	$ToS= "<p><span>服务类型："+ToS_com[obj.ToS]+"</span></p>";
	$contract= "<p><span>联系方式："+obj.contract+"</span></p>";

	if (obj.ToS==0)//快速预约 有资讯类型 没有描述
	{$ToC= "<p><span>咨询类型："+ToC_com[obj.ToC]+"</span></p>";
	$description= "";
	}
	else //私人定制 没有ToC 有description
	{$ToC="";
	$description= "<p><span>您的需求："+obj.description+"</span></p>";
	}
	$Dietitian = "<p><span>预约的营养师：营养师"+obj.Dietitian_ID+"</span></p>";
	$service_time = "<p><span>期望服务时间："+obj.service_time+"</span></p>";
	$commit_time = "<p><span>该订单提交时间："+obj.commit_time+"</span></p>";

	$each_order = $order+" "+$user_name+" "+$ToS+" "+$ToC+" "+$order_ID+" "+$contract+" "+$address+" "+$Dietitian+" "+$description+" "+$service_time+" "+$commit_time+" "+$order_status;
	//在页面中每一个订单
	$("#resultlist").append($each_order);

	});
	//重新渲染	
	if(i == 0){
		//没有可用订单
		begin='<p  align="center" style="font-size:24px">您没有相关订单</p>';
		if (get_order_status==3)
		{
			begin='<p  align="center" style="font-size:24px">您很勤快</br>没有待评价的订单</p>';
		}
	}
	else {
	
	}//避免表意矛盾
	
	$("#resultlist").prepend(begin);//统一在这里显示抬头
	$("#search").page();
	$("#resultlist").listview("refresh");
	$.mobile.loading("hide");//关闭加载图标

	$("#resultlist").off().on("click","a",goToModifyOrder);//这个属于动态事件

}//else的结束
};//Show_Order的结束