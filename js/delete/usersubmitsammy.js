//<script type="text/javascript">
	$(function(){
		//在这里我把url改了 contract改了 并且取Order0做测试：data.Order0 后面的obj.xxx都改了名字——炜兴
		$("#submit_button").click(function(){
			//清空列表
			$("#UpdateArea").empty();
			//显示加载图标
			$.mobile.loading("show");
			//var number = $("#contract").val();
			var formValues = $('#usersubmitsammy').serialize();
			//alert(formValues);这个是显示序列化后测试查看的
			//$("#result_show").append(number);
			$.getJSON("../adduserorder.php", formValues,function(data){var i=0;
                $.each(data,function(key,obj){
                	//alert("进入循环");
                	i++;
					$order = "<li><h1 class=\"ui-li-aside\">"+"您的第"+i+"张订单"+"</h1>";
					//默认是没有连接的能够点击的——炜兴
					if (obj.order_status=="0"){
						//允许点击修改订单，href中的链接修改到修改订单的界面 这种状态下可以修改订单——炜兴
						//要不用JQ去把能修改的这张订单的order_id传递给PHP，从而获取json，获取修改订单页面
						$order = "<li><a href=\"#\"><h2 class=\"ui-li-aside\">"+"您的刚刚提交的订单"+"</h2>";
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
							//订单显示为已完成，后续可更改为点击进行评分评价
							$order_status = "<p><span>订单状态：已经受理，等待服务</span></p></a></li>";
						}
					else 
						{
							//订单为固定，可点击无法修改
							//$order = "<li><a href=\"#\"><h2 class=\"ui-li-aside\">"+"第"+i+"张订单"+"</h2>";
							//订单显示为已完成，后续可更改为点击进行评分评价
							$order_status = "<p><span>订单状态：正在服务</span></p></a></li>";
						}
					var ToC_com=["健康调理","营养咨询","母婴健康","健康计划","饮食计划"];
					var ToS_com=["快速预约","私人定制"]
                	$user_name = "<h3>您的姓名："+obj.user_name+"</h3>";
                    $order_ID = "<p><span>这张订单的ID为："+obj.order_ID+"</span></p>";
                    $address = "<p><span>您的联系地址："+obj.address+"</span></p>";
                    $ToS= "<p><span>服务类型："+ToS_com[obj.ToS]+"</span></p>";
                    $ToC= "<p><span>咨询类型："+ToC_com[obj.ToC]+"</span></p>";
                    $Dietitian = "<p><span>预约的营养师：营养师"+obj.Dietitian+"</span></p>";
                    $service_time = "<p><span>期望服务时间："+obj.service_time+"</span></p>";
                    $commit_time = "<p><span>该订单提交时间："+obj.commit_time+"</span></p>";

					//在页面中每一个订单
					$("#UpdateArea").append($order+" "+$user_name+" "+$ToS+" "+$ToC+" "+$order_ID+" "+$address+" "+$Dietitian+" "+$service_time+" "+$commit_time+" "+$order_status);
                });
			//重新渲染	
			//$("div[data-role=content] ul").listview();
			$("#UpdateArea").listview("refresh");
			$.mobile.loading("hide");//关闭加载图标
			$("#usersubmitsammy").hide();
			});
		
		});
	});

//</script>