<?php
// /** adduser.php程序的主控制文件和主入口文件 */
// print_r ( $_GET );
// $mysql = new SaeMysql ();
include "../db_connect.php";
$DB_CONNECTOR = db_connect::getInstance (); // 同时会执行一次构造函数
$link = db_connect::ConnectDB ();

include "Dietitian_detail.php"; // 包含封装的类

$Dietdetail = new Dietitian_detail (); // 新建一个User_detail实例

if ($link) {
	
	// mysqli_select_db ( SAE_MYSQL_DB, $link );
	if ($_GET) {
		
		$Dietdetail->Initial ();
		$Dietdetail->Submit_Diet ();
		
		$result = $Dietdetail->Check_Diet ();
		
		$json_result = json_encode ( $result );
		
		print_r ( $json_result );
	}
	// mysqli_close ( $link );
} else {
	echo "connectnotok" . '<br>';
}

// echo "<a href=\"usercommit.php?action=chk\">查阅订单</a> <hr>";
// echo "<a href=\"usercommit.php\">返回首页</a> <hr>";
// echo "<a href=\"usercommit.php\">返回首页</a> <hr>";
?>