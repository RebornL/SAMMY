<?php


if ($_GET ["contract"] == "" || $_GET ["password"] == "" || $_GET ["password2"] == "") {
	//echo json_encode ( "-1" );//返回-1表单填写不完整
	//exit ();
} 
else if($_GET ["password"] != $_GET ["password2"])
{
	//echo json_encode ("-2");//密码两次不匹配
	//exit();
}

else {
	include "db_connect.php";
	$DB_CONNECTOR = db_connect::getInstance();//同时会执行一次构造函数
	$link = db_connect::ConnectDB();
	
	include "user_imformation.php"; // 包含封装的类
	
	$userimformation = new User_imformation (); // 新建一个User_detail实例
	
	//$link = $userimformation->ConnectDB ();

	
	if ($link) {
		
		// mysqli_select_db ( SAE_MYSQL_DB, $link );
		if ($_GET) {
			
			//$userimformation->Initial ();
			$result = $userimformation->Change_password ();
			
			
			/*if ($result>0)//检查注册返回值  成功注册就马上登陆
			{
			$result = $userimformation->User_login ();
			
			// $result = $userimformation->Check_Order ();
			
			$json_result = json_encode ( $result );
			
			$userimformation->DestroySession ();
			$userimformation->SetSession ();
			//print_r ( $json_result );
			}
			else{
			
			
			}*/
			$json_result = json_encode ( $result );
			print_r ( $json_result );
			
		}
		//mysqli_close ( $link );
	} else {
		//echo json_encode ( "-1" );
	}
}
?>