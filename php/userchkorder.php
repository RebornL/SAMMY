<?php
// /** userchkorder.php程序的主控制文件和主入口文件 */
session_start ();

if ($_SESSION ["islogin"] != 1) {
	echo json_encode ( "-1" ); // 未登录不允许查询订单
	exit ();
} 

else if ($_SESSION ["islogin"] == 1) {
	
	include "db_connect.php";
	$DB_CONNECTOR = db_connect::getInstance();//同时会执行一次构造函数
	$link = db_connect::ConnectDB();
	include "users_order.php"; // 包含封装的类
	
	$userdetail = new User_detail (); // 新建一个User_detail实例
	
	if ($link) {
		$_GET ["contract"] = $_SESSION ["contract"];
		$_GET ["user_id"] = $_SESSION ["user_id"]; // 减少改动 GET全局数组设置
		
		if ($_GET ["order_ID"]) { // 优先级最高的order_id入口
			$result = $userdetail->Check_Order ( $_GET ["order_ID"] );
			
			$json_result = json_encode ( $result );
			
			print_r ( $json_result );
		} else if ($_GET ["user_id"]) // 保留contract查询 但优先user_id

		{
			$result = $userdetail->Check_Order ( $_GET ["user_id"] );
			
			$json_result = json_encode ( $result );
			
			print_r ( $json_result );
		} else if ($_GET ["contract"]) // 保留

		{
			$result = $userdetail->Check_Order ( $_GET ["contract"] );
			
			$json_result = json_encode ( $result );
			
			print_r ( $json_result );
		}
		
		//mysqli_close ( $link );
	} 

	else {
		echo json_encode ( "-1" ); // 链接失败
	}
}
?>