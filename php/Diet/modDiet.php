
<?php
// /** usermodorder.php 修改用户订单 */
if ($_GET) {
	// print_r ( $_GET );
	// $mysql = new SaeMysql ();
	include "../db_connect.php";
	$DB_CONNECTOR = db_connect::getInstance (); // 同时会执行一次构造函数
	$link = db_connect::ConnectDB ();
	include "Dietitian_detail.php"; // 包含封装的类
	
	$Dietdetail = new Dietitian_detail (); // 新建一个User_detail实例
	
	if ($link) {
		
		// mysqli_select_db ( SAE_MYSQL_DB, $link );
		
		if ($_GET ["action"] === "modini") // 通过用户名查询发起更新表单请求
{
			
			if ($_GET ["Dietitian_ID"]) {
				$result = $Dietdetail->Check_Diet ( $_GET ["Dietitian_ID"] );
				// echo $result[3]."<br>";
				
				print_r ( $result );
				
				$json_result = json_encode ( $result );
				
				print_r ( $json_result );
				
				$result_length = count ( $result );
				echo "<br>";
				
				echo '<?xml version="1.0" encoding="ISO-8859-1"?>
<order>';
				;
				for($i = 0; $i < $result_length; $i ++) { // echo "<".$i.">" . $result[$i] . "</".$i.">";
					echo "<item>" . $result [$i] . "</item>";
				}
				
				echo "</order>";
			} else if ($_GET ["contract"]) 

			{
				$result = $Dietdetail->Check_Diet ( $_GET ["contract"] );
			}
		} 

		else // 提交修改后的表单 这部分有效 上面部分不想删除
{
			$Dietdetail->Initial ();
			
			if ($_GET ["Dietitian_ID"]) {
				
				// echo "获得ID" . $_GET ["Dietitian_ID"] . "<br>";
				$Dietdetail->Check_Diet ( $_GET ["Dietitian_ID"] );
				$Dietdetail->Update_Diet ();
				$result = $Dietdetail->Check_Diet ( $_GET ["Dietitian_ID"] );
				
				$json_result = json_encode ( $result );
				
				print_r ( $json_result );
			} 

			else if ($_GET ["contract"]) {
				// echo "获得name" . $_GET ["contract"] . "<br>";
				$Dietdetail->Check_Diet ( $_GET ["contract"] );
			}
		}
	}
	
	// mysqli_close ( $link );
} else {
	echo "connectnotok" . '<br>';
}

// echo "<br>";
// echo "<a href=\"usercommit.php?action=chk\">查阅订单</a> <hr>";
// echo "<a href=\"usercommit.php\">返回首页</a> <hr>";
// echo "<a href=\"usercommit.php?action=del\">取消订单</a> <hr>";

?>