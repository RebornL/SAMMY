<?php
//usermodorder.php 修改用户订单
//http://2.forstudyxing.sinaapp.com/php/usermodorder.php?order_ID=229&user_id=43&ToS=0&ToC=2&Dietitian_ID=1&user_name=123&sex=0&address=askdjhaskd&age=12&contract=18814122659&description=sakljd&sercice_time=123123
if ($_GET) {

	session_start ();
	include "db_connect.php";
	$DB_CONNECTOR = db_connect::getInstance();//同时会执行一次构造函数
	$link = db_connect::ConnectDB();
	
	include "users_order.php"; // 包含封装的类
	
	$userdetail = new User_detail (); // 新建一个User_detail实例

	
	if ($link && $_SESSION ["user_id"]) {		
		if ($_GET ["action"] === "modini") // 通过用户名查询发起更新表单请求
{
	} 

		else // 提交修改后的表单   这部分有效 上面部分不想删除
{
			$userdetail->Initial ();
			
			if ($_GET ["order_ID"]) {
				$_GET ["user_id"] = $_SESSION ["user_id"]; // 减少改动 GET全局数组设置
				//echo "获得ID" . $_GET ["order_ID"] . "<br>";
				//$userdetail->Check_Order ( $_GET ["order_ID"] );
				
				$result = $userdetail->Update_Order (); //-1 0 1
				/*if ($result == 1)
				{
					$result = $userdetail->Check_Order ( $_GET ["order_ID"] );
				}
				
				else
				{
					$result = array();	
				}*/
					$json_result = json_encode ( $result );
			
					print_r ( $json_result );
				
			} 

			else if ($_GET ["contract"]) {
				//echo "获得name" . $_GET ["contract"] . "<br>";
				$userdetail->Check_Order ( $_GET ["contract"] );
			}
		}
	}
	
		//mysqli_close ( $link );
} else {

}

//echo "<br>";
//echo "<a href=\"usercommit.php?action=chk\">查阅订单</a> <hr>";
//echo "<a href=\"usercommit.php\">返回首页</a> <hr>";
//echo "<a href=\"usercommit.php?action=del\">取消订单</a> <hr>";

?>