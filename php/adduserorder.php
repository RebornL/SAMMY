<?php
// /* adduserorder.php程序的主控制文件和主入口文件*/
//http:2.forstudyxing.sinaapp.com/php/adduserorder.php?user_id=13&ToS=0&ToC=2&Dietitian_ID=1&user_name=123&sex=0&address=askdjhaskd&age=12&contract=18814122659&description=sakljd&sercice_time=123123 
session_start ();

if ($_SESSION ["islogin"] != 1) {
	echo json_encode ( "-1" ); // 未登录不允许提交订单
	exit ();
} 

else if ($_SESSION ["islogin"] == 1) {
	
	include "db_connect.php";
	$DB_CONNECTOR = db_connect::getInstance();//同时会执行一次构造函数
	$link = db_connect::ConnectDB();
	include "users_order.php"; // 包含封装的类
	
	$userdetail = new User_detail (); // 新建一个User_detail实例
	
	if ($link) {
		
		// mysqli_select_db ( SAE_MYSQL_DB, $link );
		if ($_GET) {
			$_GET ["user_id"] = $_SESSION ["user_id"]; // 减少改动 GET全局数组设置
					
			$userdetail->Initial ();
			$result = $userdetail->Submit_Order ();
			
			//$userdetail->Check_Order (); // 默认就是用order_id查询
			
			$json_result = json_encode ( $result ); // 并且返回唯一订单
			
			print_r ( $json_result );
		}
		//数据库断开连接在父类析构函数中
	} else {

	}
}
?>