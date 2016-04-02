<?php
	header('Content-type: text/json;charset:UTF-8');
	
	$contract = $_GET["contract"];
	//假设此数组是从数据库读到的
	$info = array("订单1"=>array("name"=>"xxx","tele"=>$contract,"addr"=>"XXXXXXXX","dietitian"=>"summy","order_status"=>"0"),"订单2"=>array("name"=>"xxxx","tele"=>$contract,"addr"=>"XXXXXXXX","dietitian"=>"summy1","order_status"=>"0"));
	if ($contract == "11111"){
		
		echo json_encode($info);
	}
?>