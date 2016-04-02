<?php
// /** usercancelorder.php程序的主控制文件和主入口文件 */
if ($_GET) {
	// print_r ( $_GET );
	// $mysql = new SaeMysql ();
	include "db_connect.php";
	
	$DB_CONNECTOR = db_connect::getInstance();//同时会执行一次构造函数
	$link = db_connect::ConnectDB();
	include "users_order.php"; // 包含封装的类
	
	$userdetail = new User_detail (); // 新建一个User_detail实例
	
	session_start ();
	if ($link  && $_SESSION ["user_id"]) {
		
		$_GET ["user_id"] = $_SESSION ["user_id"]; // 减少改动 GET全局数组设置
		if ($_GET ["order_ID"]) {

			//暂且不用查询
			$result = $userdetail->Cancel_Order ( $_GET ["order_ID"] );

		}
		
		$json_result = json_encode ( $result );
			
		print_r ( $json_result );//-1 0 1
		//mysqli_close ( $link );
	} else {
		//echo "connectnotok" . '<br>';
	}

}
?>