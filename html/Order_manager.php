<?php ?>
<html>
<!--这个是查询订单的界面-->
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,height=device-height,initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
<head>
<link rel="stylesheet" href="../css/jquery.mobile-1.4.5.min.css">

<!-- <script src="../js/jquery-2.1.4.min.js"></script> --><!--引入cdn资源减少对服务器的访问-->
<script type="text/javascript" src="http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js"></script> 
<script type='text/javascript'>
//CDN资源加载失败，加载本地服务器的资源
if (typeof jQuery == 'undefined') { 
	document.write(unescape("%3Cscript src='../js/jquery-2.1.4.min.js' type='text/javascript' %3E%3C/script%3E"));
}
$(document).ready(function() {
	searchOrder(<?php echo $_GET["order_status"];?>);//搜索一次订单  全局变量赋值
    bindEvent();//第一次加载好整个html才执行
});

</script>
<script src="../js/jquery.mobile-1.4.5.min.js"></script>
<script src="../js/Search_Order.js"></script>
<script src="../js/Form_Validity.js"></script>
<script  src="../js/Order_manager.js"></script>


</head>
<body>
	<!--页面1:查询界面-->
	<div data-role="page" id="search">
        <div data-role="header" data-fullscreen="true"  data-theme="a">
			<a href="./personal_center" data-role="button" class="ui-btn-left" data-icon="back" data-ajax="false">BACK</a>
			<h1>订单管理</h1>
			<a href="./sammy.html" data-role="button" class="ui-btn-right" data-icon="home" rel="external" data-ajax="false">Home</a>
		</div>
        
		<div data-role="content" id="listview" data-role="fieldcontain">
		
			<br/>
			<div>
				<a data-role="button" href="#" data-icon="search" id="search_button">直接查看全部订单</a>
			</div>
			
           <div id="result">
				<ul data-role="listview" data-inset="true" id="resultlist">
            
				</ul>
			</div>
			  
		</div>
	
		<div data-role="footer" data-position="fixed"  data-theme="a">
			<div data-role="navbar">
			  <ul>
				<li><a id="order_status_0" href="" data-icon="search" data-iconpos="notext" data-ajax="false">待受理</a></li>
				<li><a id="order_status_1" href="" data-icon="search" data-iconpos="notext" data-ajax="false">待服务</a></li>
				<li><a id="order_status_2" href="" data-icon="search" data-iconpos="notext" data-ajax="false">服务中</a></li>
				<li><a id="order_status_3" href="Submitcomments.html" data-icon="search" data-iconpos="notext" data-ajax="false">待评价</a></li>
				<li><a id="order_status_4" href="" data-icon="search" data-iconpos="notext" data-ajax="false">已完成</a></li>

			  </ul>
			</div>
		</div>
	</div> 
	
	<!--页面2:修改订单-->
	<div data-role="page" id="modify">
        <div data-role="header" data-fullscreen="true"  data-theme="a">
			<a href="./Order_manager.html" data-role="button" class="ui-btn-left" data-icon="back"  data-ajax="false">BACK</a>
			<h1>修改订单</h1>
			<a href="sammy.html" data-role="button" class="ui-btn-right" data-icon="home" data-rel="external" data-ajax="false">Home</a>
		</div>
  

  
		<div data-role="content">
		<form method="get" id = "usersubmitsammy">
		
        <div data-role="fieldcontain">
            <label for="order_ID"><span>当前订单的ID</span></label>
            <input type="text" name="order_ID" id="order_ID" readonly/>
        </div>
        
		<div style="display: none;" data-role="fieldcontain">
			<label for="user_id"><span>用户ID</span></label>
			<input type="text" name="user_id" id="user_id" value="0">
		</div>
		
		
		<div data-role="fieldcontain"  >
			<label for="ToS"><span>该订单的服务类型为</span></label>
				<select id="ToS" name="ToS" required class="reqd">
					<option value="0">快速预约</option>
					<option value="1">私人定制</option>
				</select>
			
		</div>
		<div id="ToC_div" data-role="fieldcontain">
			<label for="ToC"><span>咨询类型</span></label>
				<select id ="ToC" name="ToC">
					<option value="-1">私人定制（无此项）</option>
					<option value="0">健康调理</option>
					<option value="1">营养咨询</option>
					<option value="2">母婴健康</option>
					<option value="3">健康计划</option>
					<option value="4">饮食计划</option>
				</select>
		</div>
		
		<div data-role="fieldcontain">
			<label for="Dietitian_ID"><span>选择您的营养师</span></label>
			<select id ="Dietitian_ID" name="Dietitian_ID">
				<option value="1">营养师1</option>
				<option value="2">营养师2</option>
				<option value="3">营养师3</option>
				<option value="4">营养师4</option>
			</select>
		</div>
		
		<div data-role="fieldcontain">
			<label for="user_name"><span>姓名</span></label>
			<input type="text" name="user_name" id="user_name" placeholder="姓名"/>
		</div>		
			
		<div data-role="fieldcontain">
        		<label for="sex"><span>性别</span></label>
				<select name="sex" id="sex">
				<option value="0">男</option>
				<option value="1">女</option>
			</select>	
			
		</div>		
			
		<div data-role="fieldcontain">
        	<label for="age"><span>年龄</span></label>
			<input type="number" name="age" id="age" placeholder="年龄"/>
		</div>		
			
		<div data-role="fieldcontain">
        	<label for="contract"><span>手机号码</span></label>
			<input type="number" name="contract" id="contract" placeholder="手机号码" />
		</div>
		
		<div data-role="fieldcontain">
			<label for="address"><span>咨询地址</span></label>
			<input type="text" name="address" id="address" placeholder="您的地址"/>
		</div>
		
		<div id="description_div" data-role="fieldcontain">
			<label for="description" >描述一下您的需求:</label>
			<textarea cols="40" rows="8" name="description" id="description" placeholder="描述一下您的需求"></textarea>
		</div>
		
		<div data-role="fieldcontain">
			<label for="service_time"><span>期望服务时间</span></label>
			<input type="date" name="service_time" id="service_time">
		</div>
		
		<div>
			<!--<button type="button" id="submit_button1">提交修改</button>			<a data-role="button" id="submit_button1"> 提交修改 </a>		        <div data-role="fieldcontain">
            <label for="currenttype"><span>当前订单的服务类型为</span></label>
            <input type="text" name="currenttype" id="currenttype" readonly/>
        </div>	<a href="#confirm" data-role="button" id="cancel_button1"> 我要取消当前订单 </a>

-->
            <input type="button" id="submit_button1" value="提交修改">
            <input type="button" id="cancel_button1" value="取消当前订单">
		</div>
	    </form>

	</div>
</div>	
	
	<!--页面3:确认订单-->
	<div data-role="page" id="confirm">
	
	<div data-role="header" data-fullscreen="true"  data-theme="a">
		<a href="#" data-role="button" class="ui-btn-left" data-icon="back" data-rel="back">BACK</a>
		<h1>确认订单</h1>	
	</div>
	<div data-role="content">
		<h2 id="title">你的订单</h2>	
		<table id="info_table" data-role="table" data-mode="reflow" class="ui-responsive table-stroke">
			<thead>
				<tr>
					<th>姓名：</th>
					<th>性别：</th>
					<th>年龄：</th>
					<th>手机号码：</th>
					<th>服务类型：</th>
					<th>咨询类型：</th>
					<th>您选择的营养师：</th>
					<th>您的需求：</th>
					<th>地址：</th>
					<th>期望服务时间：</th>
				</tr>	
			</thead>
			
			<tbody  id="UpdateArea">
				
			</tbody>
        </table>
		<input type="button" id="submit_button2" value="确认修改">
        <input type="button" id="cancel_button2" value="去意已决">

	</div>
	</div>
	
	<!--页面4:对话提示框-->
	<div data-role="page" id="commit" data-theme="a">
	  <div data-role="header">
		<h1>温馨提示</h1>
	  </div>

	  <div data-role="content" id="hint" align="center">
		
	  </div>

	</div>
	</div> 
	
</body>
</html>
