

$(function(){
	
	$(document).ready(function() {
	//$("#userorder").hide();
	//$('#checkbutton').on('click', function(event) {
		// alert("2");
		//event.preventDefault();
		$order_ID = $("#order_ID").val();

		//var formValues = $('#checkorder').serialize();
		alert($order_ID);
		$.getJSON('../php/userchkorder.php?order_ID='+$order_ID, function(data) {
	//	alert(data);

			// 将数据加载到表单中
		loadData(data);

			//$('#updateArea').html(data);
			//$("#userorder").show();
			//$("#checkorder").hide();

			//Control();
		});

	
	
	$("#submit_button1").click(function(){
		$name = "<tr><td>"+$("#user_name").val()+"</td>";
		$sex = "<td>"+$("#sex").find("option:selected").text()+"</td>";
		$age = "<td>"+$("#age").val()+"</td>";
		$contract = "<td>"+$("#contract").val()+"</td>";
		$ToC = "<td>"+$("#ToC").find("option:selected").text()+"</td>";
		$Dietitian = "<td>"+$("#Dietitian").find("option:selected").text()+"</td>";
		$address = "<td>"+$("#address").val()+"</td>";
		$service_time = "<td>"+$("#service_time").val()+"</td>";
		$description = "<td>"+$("#description").val()+"</td>";
		$finish = "</tr>";
		$ToS = $("#ToS").find("option:selected").val();
		//alert($name+$sex+$age+$contract+$ToC+$Dietitian+$address+$service_time+$finish);
			//alert("这是服务类型");
		//alert($("#ToS").find("option:selected").val());
		//这里是进行订单的展示//未提交前的展示
		if($("#ToS")==0){
			//为快速预约
			$("#UpdateArea").html($name+$sex+$age+$contract+$ToC+$Dietitian+$address+$service_time+$finish);
		}else{
			//私人定制
			$("#UpdateArea").html($name+$sex+$age+$contract+$Dietitian+$address+$service_time+$description+$finish);
		}
			
	
		//确认提交订单的操作
		$("#submit_button2").click(function(){
			var $info="";
			var $button="";
			var $Order_details="";
			$.mobile.loading("show");
			var formValues = $('#usersubmitsammy').serialize();
			//alert(formValues);//这个是显示序列化后测试查看的,用于测试
			//$("#result_show").append(number);
			$hint = $("#hint");
			$.ajaxSettings.async = false;
			//alert($formValues);

			$.getJSON("../php/usermodorder.php", formValues,function(data){
				//获取到返回的json数据信息,通过data.send_status查看信息
				//alert(data.Order0.order_ID);
				if(data.send_status == "success" || data.Order0.order_ID){
					$info = "<p><span>提交成功！谢谢你的信任！</span></p><p>（温馨提示：你可以在主界面的进行查询订单和修改订单）</p>";
					$button = "<a href=\"./sammy.html\" data-role=\"button\" data-ajax=\"false\">确定</a>";
					//var $Order_details=show(data);
					//$(function(){
       					//var $Order_details=$show(data);//不知道为什什么老是undefinded
						//alert("在if里面"+$Order_details);
    				//})
					
				}else{
					$info = "<p><span>不好意思!SAMMY提交失败！</span></p><p>请重新预约！</p>";
					$button = "<a href=\"#page1\" data-role=\"button\" data-ajax=\"false\">确定</a>";
				}
			
            });
			//alert($info+$Order_details+$button);

			$hint.html($info+$Order_details+$button);//弹出提示框
			$.mobile.loading("hide");//关闭加载图标
			});
			
			
		});
});


function loadData(obj) {
	var key, value, tagName, type, arr;
	for (x in obj.Order0) {
		key = x;
		value = obj.Order0[x];
		$("[name='" + key + "'],[name='" + key + "[]']").each(function() {
			tagName = $(this)[0].tagName;
			type = $(this).attr('type');//判断表单的填充类型
			if (tagName == 'INPUT') {
				if (type == 'radio') {//单选
					$(this).attr('checked', $(this).val() == value);
				} else if (type == 'checkbox') {//多选
					arr = value.split(',');
					for (var i = 0; i < arr.length; i++) {//遍历选项
						if ($(this).val() == arr[i]) {
							$(this).attr('checked', true);//勾选
							break;
						}
					}
				} else {
					$(this).val(value);//其余的text
				}
			} else if (tagName == 'TEXTAREA') {
				
				$(this).attr('value',value); 
				alert(tagName);
				alert(value);
			}
			else if (tagName == 'SELECT' ){
				$(this).val(value);//设置value的值选中
				
			}

		});
	}
}
