// JavaScript Document
$(function(){				
		//炜兴——加入了服务类型判断，根据情况产生输出
		$("#search_button").click(function(){
			//清空列表
			$("#list").empty();
			//显示加载图标
			$.mobile.loading("show");
			var number = $("#contract").val();
			//$("#result_show").append(number);
			//$.ajaxSettings.async = false;
			$.getJSON("../php/userchkorder.php?contract="+number,function(data)
			{	
				//alert(data.Order0.order_ID);
				//$("#result").html("<p>没有记录！</p>");
				
				//这里添加了判断，当没有记录数据返回，提示没有记录。
				if(typeof(data.Order0) == "undefined"){
					//数据库没有记录
					$("#list").html("<p>没有记录！</p>");
					$.mobile.loading("hide");//关闭加载图标
				}else{
					var i=0;
					$.each(data,function(key,obj){
                	
                	i++;
					$order_ID = "<h1 class=\"ui-li-aside\">"+"订单"+obj.order_ID+"</h1>";
					
					//默认是没有连接的能够点击的——炜兴
					if (obj.order_status=="0"){
						//允许点击修改订单，href中的链接修改到修改订单的界面 这种状态下可以修改订单——炜兴
						//要不用JQ去把能修改的这张订单的order_id传递给PHP，从而获取json，获取修改订单页面
						
						//订单信息显示为未完成
						$order_status = "<p><span>订单状态：已经提交，等待受理</span></p></a></li>";
					}
					else if(obj.order_status=="3"){
						//订单为固定，可点击无法修改
						//订单显示为已完成，后续可更改为点击进行评分评价
						$order_status = "<p><span>订单状态：已完成</span></p></a></li>";
					}else if(obj.order_status=="2")
						{
							//订单为固定，可点击无法修改
							//$order = "<li><a href=\"#\"><h2 class=\"ui-li-aside\">"+"第"+i+"张订单"+"</h2>";

							$order_status = "<p><span>订单状态：已经受理，等待服务</span></p></a></li>";
						}
					else 
						{
							//订单为固定，可点击无法修改
							//$order = "<li><a href=\"#\"><h2 class=\"ui-li-aside\">"+"第"+i+"张订单"+"</h2>";

							$order_status = "<p><span>订单状态：正在服务</span></p></a></li>";
						}
					var ToC_com=["健康调理","营养咨询","母婴健康","健康计划","饮食计划"];
					var ToS_com=["快速预约","私人定制"];
					
                	$user_name = "<h3><br>您的姓名："+obj.user_name+"</h3>";
                    $address = "<p><span>您的联系地址："+obj.address+"</span></p>";
                    $ToS= "<p><span>服务类型："+ToS_com[obj.ToS]+"</span></p>";
					
					if (obj.ToS==0)//快速预约 有资讯类型 没有描述
                    {$ToC= "<p><span>咨询类型："+ToC_com[obj.ToC]+"</span></p>";
					$description= "";
					$order = "<li><a href=\"../php/quick_reserve_mod.php?order_ID="+obj.order_ID+"\" id=\"modorder\">"+$order_ID;
					}
					else //私人定制 没有ToC 有description
					{$ToC="";
					$description= "<p><span>您的需求："+obj.description+"</span></p>";
					$order = "<li><a href=\"../php/private_custom_mod.php?order_ID="+obj.order_ID+"\"id=\"modorder\">"+$order_ID;//ID切记要大写
					}
					alert($order);
                    $Dietitian = "<p><span>预约的营养师：营养师"+obj.Dietitian+"</span></p>";
                    $service_time = "<p><span>期望服务时间："+obj.service_time+"</span></p>";
                    $commit_time = "<p><span>该订单提交时间："+obj.commit_time+"</span></p>";

                    //在页面中每一个订单
					$("#list").append($order+" "+$user_name+" "+$ToS+" "+$ToC+" "+$order_ID+" "+$address+" "+$Dietitian+" "+$description+" "+$service_time+" "+$description+" "+$commit_time+" "+$order_status);

                    //$("#list").append($order+" "+$user_name+" "+$ToS+" "+$ToC+" "+$order_ID+" "+$address+" "+$Dietitian+" "+$order_status);
					});
					//重新渲染	
					//$("div[data-role=content] ul").listview();
					$("#list").listview("refresh");
					$.mobile.loading("hide");//关闭加载图标
					
					
					
				}
			});
		
		});
		


		
	});