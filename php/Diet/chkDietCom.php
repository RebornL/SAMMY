<?php
/*
 * 该PHP脚本的作用是查询用户的评论
 http://2.forstudyxing.sinaapp.com/php/Diet/chkDietCom.php?Dietitian_ID=1
 */
// /** chkuser.php程序的主控制文件和主入口文件 */
if ($_GET) {

	include "../db_connect.php";
	$DB_CONNECTOR = db_connect::getInstance (); // 同时会执行一次构造函数
	$link = db_connect::ConnectDB ();
	include "Dietitian_Com.php"; // 包含封装的类
	
	$Dietcom = new Dietitian_Com (); // 新建一个User_detail实例
	
	if ($link) {
				
		if ($_GET ["Dietitian_ID"]) {
			$result = $Dietcom->Check_Diet ( $_GET ["Dietitian_ID"] );

			$json_result = json_encode ( $result );
			
			print_r ( $json_result );
		} else if ($_GET ["user_id"]) 

		{
			$result = $Dietcom->Check_Diet ( $_GET ["user_id"] );
			
			$json_result = json_encode ( $result );
			
			print_r ( $json_result );
		} else if ($_GET ["comment_ID"]) 

		{
			$result = $Dietcom->Check_Diet ( $_GET ["comment_ID"] );
			
			$json_result = json_encode ( $result );
			
			print_r ( $json_result );
		}
		
		// mysqli_close ( $link );
	} else {

	}

}
?>