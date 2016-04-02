<?php
// /** chkuser.php程序的主控制文件和主入口文件http://2.forstudyxing.sinaapp.com/php/Diet/chkDiet.php?Dietitian_ID=1 */
if ($_GET) {
	include "../db_connect.php";
	$DB_CONNECTOR = db_connect::getInstance (); // 同时会执行一次构造函数
	$link = db_connect::ConnectDB ();
	include "Dietitian_detail.php"; // 包含封装的类
	
	$Dietdetail = new Dietitian_detail (); // 新建一个User_detail实例
	
	if ($link) {
				
		if ($_GET ["Dietitian_ID"]) {
			$result = $Dietdetail->Check_Diet ( $_GET ["Dietitian_ID"] );

		}
		else 
		{
			$result = $Dietdetail->Check_Diet ();
			
		}
			$json_result = json_encode ( $result );
			
			print_r ( $json_result );
		// mysqli_close ( $link );
	} else {

	}

}
?>