<?php
// /** User_login.php 用户登陆验证 */

//这个php只需要contract password参数
//有一个是空的  返回-2  jq输出为填写信息不完整
//用户名密码不匹配  则查询数据库失败  返回-1（链接数据库失败也是-1  一般不会就不区分了）
//成功返回data.User0.user_id是个>0的数  检验data.User0.islogin == 1 && data.User0.contract && data.User0.user_id
if ($_GET ["contract"] == "" || $_GET ["password"] == "") {
	echo json_encode ( "-2" );
	exit ();
} else {
	include "db_connect.php";
	$DB_CONNECTOR = db_connect::getInstance();//同时会执行一次构造函数
	$link = db_connect::ConnectDB();
	
	include "user_imformation.php"; // 包含封装的类
	
	$userimformation = new User_imformation (); // 新建一个User_detail实例 //也会执行一次父类构造函数
	

	
	if ($link) {


		if ($_GET) {
			
			//$userimformation->Initial ();
			$result = $userimformation->User_login ();
			
			// $result = $userimformation->Check_Order ();
			
			$json_result = json_encode ( $result );
			
			$userimformation->DestroySession ();
			$userimformation->SetSession ();
			print_r ( $json_result );

		}
		//mysqli_close ( $link );
	} else {
		echo json_encode ( "-1" );
	}
}

?>