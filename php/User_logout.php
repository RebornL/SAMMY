<?php
// /** User_logout.php 用户登陆验证 */
//jq先请求outputcookies 检查登陆状态  检验data.islogin == 1 && data.contract && data.user_id
//返回空白就是没登陆  引导用户登陆
//若是登陆  就引导用户再见SAMMY  请求这个文件  然后询问重新登录
//php 检验$_SESSION["islogin"]==""  返回1  jq检验
	include "db_connect.php";
	$DB_CONNECTOR = db_connect::getInstance();//同时会执行一次构造函数
	$link = db_connect::ConnectDB();
	
	
	include "user_imformation.php"; // 包含封装的类
	
	$userimformation = new User_imformation (); // 新建一个User_detail实例
	
	if ($link) {
		
		// mysqli_select_db ( SAE_MYSQL_DB, $link );
		if (1) {
			
			$userimformation->Initial ();
			//$result = $userimformation->User_login ();
			
			// $result = $userimformation->Check_Order ();
			
			//$json_result = json_encode ( $result );
			
			$userimformation->DestroySession ();
			//$userimformation->SetSession ();
			if ($_SESSION["islogin"]=="")
			{
				$logout=json_encode("1");
				print_r($logout);
			}
		}
		//mysqli_close ( $link );
	} else {
		echo json_encode ( "-1" );
	}

?>