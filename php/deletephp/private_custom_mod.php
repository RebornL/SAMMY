<?php 
//用php生成修改订单页面
?>

<!DOCTYPE html>
<html>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,height=device-height,initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
<head>
<link rel="stylesheet" href="../css/jquery.mobile-1.4.5.min.css">
<script src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js"></script>
<script src="../js/jquery.mobile-1.4.5.min.js"></script>
<script src="../js/usermodsammy2.js"></script>
</head>
<body>
	<div data-role="page" id="page1">
		<div data-role="header" data-fullscreen="true"  data-theme="a">
			<a href="#" data-role="button" class="ui-btn-left" data-icon="back" data-rel="back">BACK</a>
			<h1>私人定制服务——订单修改</h1>
			<a href="./summy.html" data-role="button" class="ui-btn-right" data-icon="home" data-ajax="false">Home</a>
		</div>
		
		<div data-role="content" >
			<img src="C:/Users/Lee_Liu/Desktop/SUMMY_pictures/home_toper.jpg" width="100%" height="10%"></img>
		</div>
		
		<div data-role="content" width="100%" height="90%">
		
			<form method="GET" action="../adduserorder.php" id = "usersubmitsammy">
			
            <div >
				<label for="order_ID"><span>当前订单的ID</span></label>
				<input type="text" name="order_ID" id="order_ID" value=<?php echo $_GET[order_ID];?>>
			</div>
            				
			<div style="display: none;">
				<label for="user_id"><span>用户ID</span></label>
				<input type="text" name="user_id" id="user_id" value="0">
			</div>
					
				<div style="display: none;">
					<label for="ToS"><span><h2>你所选的服务类型</h2></sapn>
					<select id="ToS" name="ToS" required class="reqd" readonly >
					<option value="1">私人定制</option>
					</select>
					</label>
				</div>
				
				
				
			<div data-role="none" style="display: none;">
				<label for="ToC"><span>咨询类型</sapn></label>
				<select id ="ToC" name="ToC">
					<option value="-1">NONE</option>
				</select>
			</div>
					
			<div>
				<label for="Dietitian"><span>选择您的营养师</sapn></label>
				<select id ="Dietitian" name="Dietitian">
					<option value="1">营养师1</option>
					<option value="2">营养师2</option>
					<option value="3">营养师3</option>
					<option value="4">营养师4</option>
				</select>
			</div>		
			
			<div>
				<label for="user_name"><span>姓名</span></label>
				<input type="text" name="user_name" id="user_name" placeholder="姓名">
				
				<label for="sex"><span>性别</span></label>
					<select name="sex" id="sex">
					<option value="0">男</option>
					<option value="1">女</option>
				</select>	
				
						
				<label for="age"><span>年龄</span></label>
				<input type="number" name="age" id="age" placeholder="年龄">
				
				<label for="address"><span>咨询地址</span></label>
				<input type="text" name="address" id="address" placeholder="您的地址">
				
				
				<label for="contract" <!--class="ui-hidden-accessible"--><span>手机号码</span></label>
				<input type="number" name="contract" id="contract" placeholder="手机号码">
			</div>				
					
			<div>
				<label for="description" >描述一下您的需求:</label>
					<textarea cols="40" rows="8" name="description" id="description" placeholder="描述一下您的需求">
					</textarea>					
			</div>
					

			
			<div>
				<label for="service_time"><span>期望服务时间</span></label>
				<input type="date" name="service_time" id="service_time">
			</div>
			
			<div>
				<a href="#page2" id="submit_button1" data-role="button"> 提交 </a>
			
			<!--button type="submit" value="提交订单" data-iconpos="right" id="submit_button">-->
			</div>
					
			</form>
		</div>
		
	</div>
		<div data-role="page" id="page2" data-theme="a">
		<div data-role="header" data-fullscreen="true"  data-theme="a">
			<a href="#" data-role="button" class="ui-btn-left" data-icon="back" data-rel="back">BACK</a>
			<h1>确认订单</h1>	
		</div>
		<div data-role="content">
			<h2 id="title">你的订单</h2>		
			<table data-role="table" data-mode="reflow" class="ui-responsive table-stroke">
				<thead>
					<tr>
						<th>姓名：</th>
						<th>性别：</th>
						<th>年龄：</th>
						<th>联系号码：</th>
						<th>咨询类型：</th>
						<th>选择的营养师：</th>
						<th>地址：</th>
						<th>期望服务时间：</th>
						<th>您的需求：</th>
					</tr>	
				</thead>
				
				<tbody  id="UpdateArea">
					
				</tbody>
			</table>
			<br/><a id="submit_button2" data-role="button" href="#page3"> 确认 </a>
			
		</div>
		
		</div>
		<!--对话提示框-->
		<div data-role="page" id="page3">
		  <div data-role="header">
			<h1>提示消息</h1>
		  </div>

		  <div data-role="content" id="hint">
			
		  </div>

		</div>
</body>
</html>