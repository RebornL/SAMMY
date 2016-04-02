<?php
// file Dietitian_Com.php 用于抓取用户填表信息并写入数据库
class Dietitian_Com extends db_connect { // 用户订单细节类
	private $dbname = "Dietitian_comment"; // ".$this->dbname."
	private $comment_ID; // 订单的唯一comment_ID
	private $Dietitian_ID;
	// private $user_name;
	// private $sex;
	// private $address;
	// private $age;
	private $user_id;
	// private $description;
	// private $service_time; // 期望服务时间
	// private $commit_time; // 提交时间
	private $detail; // 保存整个数组的value部分
	private $detail_key = array (
			"comment_ID",
			"Dietitian_ID",
			"content",
			"mark",
			"user_id",
			"contract",
			"order_ID",
			"commit_time" 
	); // 保存整个数组的key部分 //与数据库一致
	private $result; // 保存查询结果
	private $errorNum = 1; // 插入操作返回的错误代号
	private $errorMess = "";
	
	function __construct()//覆盖父类构造方法
	{
		//$this->Initial();
	}
	function __destruct()//覆盖父类析构方法
	{
		/*		echo "子类析构函数调用";
			parent::__destruct();
			echo "父类析构函数调用完毕";
			echo "bye";*/
	}
	
	function Initial() {


		for($i = 1; $i <= 6; $i ++) {
			$this->detail [$i - 1] = parent::$MySQLi->real_escape_string(trim($_GET [$this->detail_key [$i]]));
		}
	}
	function Submit_Diet() { // 新增营养师评论
		$nowtime = date ( "Y-m-d G:i:s" );
		
		$insert_sql = "INSERT INTO " . $this->dbname . "(";
		
		// detail_key 含有ID 0=>comment_ID
		
		for($i = 1; $i < count ( $this->detail_key ) - 1; $i ++) {
			// 跳过第一个
			$insert_sql = $insert_sql . $this->detail_key [$i] . ",";
		}
		$insert_sql = $insert_sql . $this->detail_key [$i] . ") VALUES(";
		
		
		// detail 不含有_ID
		for($i = 0; $i < count ( $this->detail ); $i ++) {
			$insert_sql = $insert_sql . "'" . $this->detail [$i] . "'" . ",";
		}
		
		$insert_sql = $insert_sql . "'" . $nowtime . "'" . ")";
		
		// echo '<br>' . $insert_sql . '<br>';
		
		parent::$MySQLi->query (  $insert_sql );
		// 插入返回的错误代号

		$this->comment_ID =  parent::$MySQLi->insert_id;

		if ($this->comment_ID > 0)
		{
			$updateOrderstate = "UPDATE `user_order` SET  `order_status` =  '4' WHERE  `order_ID` = '" . $this->detail [5] . "'";
		
			parent::$MySQLi->query (  $updateOrderstate );
		}
		// 订单状态+1
		parent::mmc_deletedata("user_order_".$_GET ["user_id"]);//评价订单之后也要删掉缓存
		
		return $this->comment_ID;
	}
	function Check_Diet() {
		$temp = func_get_args ();
		if ($temp) // 如果有传入参数

		{
			if ($_GET ["comment_ID"]) {
				$this->comment_ID = $temp [0];
			} 

			else if ($_GET ["Dietitian_ID"]) {
				$this->Dietitian_ID = $temp [0];
			} 

			else if ($_GET ["user_id"]) {
				$this->user_id = $temp [0];
			}
		
			// 检查是否传入参数
			
		{
			if ($this->comment_ID) {
				// 按评论的ID查询
				$select_sql = "SELECT * FROM " . $this->dbname . " WHERE comment_ID='" . $temp [0] . "'";
			} 				

			// 优先按comment_ID查询
			
			else if ($this->Dietitian_ID) {
				// echo "this->Dietitian_ID非空";按营养师的ID查询
				$select_sql = "SELECT * FROM " . $this->dbname . " WHERE Dietitian_ID='" . $temp [0] . "'";
			} 

			else if ($this->user_id) {
				// echo "this->Diet_name非空";按用户预留手机查询
				$select_sql = "SELECT * FROM " . $this->dbname . " WHERE user_id='" . $temp [0] . "'";
			}
		}
		} 
		else {
			$select_sql = "SELECT * FROM " . $this->dbname . " WHERE comment_ID='" . $this->comment_ID . "'";
		}
		// echo $select_sql . '<br>';
		
		$this->result = parent::$MySQLi->query (  $select_sql );
		
		$Comment_num = $this->result->num_rows ;
		// echo "订单数目为".$Order_num."<br>";
		
		if ($this->result && $Comment_num > 0) {

			
			$i = 0;
			$j = 0;
			while ( $row = $this->result->fetch_row ( ) ) { // 循环从结果集中遍历每条记录到数组中
			                                                      
				$i = 0;
				foreach ( $row as $data ) {
					$save ["Diet_Com" . $j] [$this->detail_key [$i]] = $data; // 循环遍历一条数据记录中的每个字段
					$i ++; // 以表格形式输出每个字段
				}
				
				$j ++;
			} // 暂时只有一行//按名称查询会有多行
		} 

		else {
			die ( "Null" );
		}
		
		$this->result->free ( ); // 释放查询的结果集资源
		
		foreach ( $save as $key => $value ) {
			$comment_ID [$key] = $value ["comment_ID"];
		}
		
		array_multisort ( $comment_ID, SORT_NUMERIC, SORT_DESC, $save );
		return $save;
	}
	function Update_Diet() {//这个方法不可用
		{
			/* 获取需要修改的记录数据 */
			
			$nowtime = date ( "Y-m-d G:i:s" );
			
			$update_sql = "UPDATE " . $this->dbname . " SET ";

			
			for($i = 2; $i < count ( $this->detail_key ) - 2; $i ++) {
				// comment_ID 与 Dietitian_ID user_id不允许更改 从索引2开始更改
				$update_sql = $update_sql . $this->detail_key [$i] . "='" . $this->detail [$i - 1] . "',";
				// echo $update_sql . '<br>';
				// echo "<br>";
			}
			
			$update_sql = $update_sql . $this->detail_key [$i] . "='" . $nowtime . "' WHERE ";
			$update_sql = $update_sql . $this->detail_key [0] . "='" . $this->comment_ID . "'"; // 按用户comment_ID查询订单
			                                                                                    // 语句拼接
			                                                                                    // echo $update_sql . '<br>';
			
			$this->errorNum = parent::$MySQLi->query (  $update_sql );
			// 插入返回的错误代号
			// echo $this->errorNum;
		}
		
		if (! $this->errorNum) {
			die ( "Null" );
		}

	}
	function Cancel_Order() {//不可用
		if ($_GET ["comment_ID"]) {
			$this->comment_ID = $_GET ["comment_ID"];
			// echo $this->comment_ID . "<br>";
		}
		
		if ($this->comment_ID)
			$delete_sql = "DELETE FROM " . $this->dbname . " WHERE comment_ID='" . $this->comment_ID . "'";
			// 按comment_ID进行清除订单
			// echo $delete_sql . '<br>';
		
		$this->result = parent::$MySQLi->query (  $delete_sql );
		
		if (! ($this->result && $this->result->num_rows ( $this->result ) > 0)) {
			/*
			 * $select_sql = "SELECT * FROM " . $this->dbname . " WHERE comment_ID='" . $this->comment_ID . "'";
			 * echo $select_sql . '<br>';
			 *
			 * $this->result = parent::$MySQLi->query ( $this -> link , $select_sql );
			 * if (! ($this->result && $this->result->num_rows ( $this->result ) > 0))
			 */
			{
				// echo "订单取消成功";
			}
		} else {
			// echo "您的订单你取消失败";
		}
	}
}