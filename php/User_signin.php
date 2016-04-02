<?php
// /** User_signin.php注册新用户 数据库插入行 */
//返回的就是$result量
//返回0 是该用户已经注册
//返回-1 表单填写不完整（数据库连接失败）
//返回-2 注册时候密码两次不匹配 password password2不匹配
//$result 如果大于0  正是user_id  就马上登陆
//$result 被json数组覆盖
//返回json数组  成功  检验data.User0.user_id!="undefined" && data.User0.user_id > 0
//注册成功马上登陆一般没有什么异常
//http://2.forstudyxing.sinaapp.com/php/User_signin.php/?contract=13724643650&password=13724643647&password2=13724643647&password=13724643647&nickname=xing
if ($_GET ["contract"] == "" || $_GET ["password"] == "" || $_GET ["password2"] == "") {
	echo json_encode ( "-1" );//返回-1表单填写不完整
	exit ();
} 
else if($_GET ["password"] != $_GET ["password2"])
{
	echo json_encode ("-2");//密码两次不匹配
	exit();
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
			$result = $userimformation->User_Signin ();
			
			
			if ($result>0)//检查注册返回值  成功注册就马上登陆
			{
			$result = $userimformation->User_login ();
						
			$json_result = json_encode ( $result );
			
			$userimformation->DestroySession ();
			$userimformation->SetSession ();
			print_r ( $json_result );
			}
			else{
			$json_result = json_encode ( $result );
			
			print_r ( $json_result );
			}
		}
		//mysqli_close ( $link );
	} else {
		echo json_encode ( "-1" );
	}
}
?>