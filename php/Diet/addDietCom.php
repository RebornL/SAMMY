<?php
// /** adduser.php程序的主控制文件和主入口文件 */
session_start ();
include "../db_connect.php";
$DB_CONNECTOR = db_connect::getInstance (); // 同时会执行一次构造函数
$link = db_connect::ConnectDB ();

include "Dietitian_Com.php"; // 包含封装的类

$Dietcom = new Dietitian_Com (); // 新建一个User_detail实例

if ($link && $_SESSION ["user_id"]) {
	
	// mysqli_select_db ( SAE_MYSQL_DB, $link );
	if ($_GET) {
		$_GET ["user_id"] = $_SESSION ["user_id"];
		$Dietcom->Initial ();
		$result = $Dietcom->Submit_Diet ();
		
		//$Dietcom->Check_Diet ();
		
		$json_result = json_encode ( $result );
		
		print_r ( $json_result );
	}
	// mysqli_close ( $link );
} else {

}


?>