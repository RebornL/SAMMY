<?php
// /** updateuserorder.php程序的主控制文件和主入口文件 */
if ($_GET) {
	// 包含封装的类
	include "db_connect.php";
	include "users_order.php"; // 包含封装的类
	// 新建一个User_detail实例
	$userdetail = new User_detail (); // 新建一个User_detail实例
	
	$link = $userdetail->ConnectDB ();
	
	if ($link) {
	
	// mysqli_select_db ( SAE_MYSQL_DB, $link );
	if ($_GET) {
		
		$userdetail->Initial ();
		//更新订单信息，不过感觉这个Update_Order()方法没有写完
		$update_result = $userdetail->Update_Order();
		if($update_result){
			$result = $userdetail->Check_Order($_GET["order_ID"]);
			
			
		}else{
			$result = array();			
		}
		$json_result = json_encode ( $result );
				
		print_r ( $json_result );
			
		
	}
	mysqli_close ( $link );
} else {
	echo "connectnotok" . '<br>';
}
}
?>