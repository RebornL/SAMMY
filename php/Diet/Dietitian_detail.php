<?php
// file Dietitian_detail.php 用于抓取用户填表信息并写入数据库
class Dietitian_detail extends db_connect { // 用户订单细节类
                                           // private $link;
	private $dbname = "Dietitian_detail"; // ".$this->dbname."
	private $Dietitian_ID; // 订单的唯一Dietitian_ID
	private $Diet_name;
	// private $user_name;
	// private $sex;
	// private $address;
	// private $age;
	private $contract;
	// private $description;
	// private $service_time; // 期望服务时间
	// private $commit_time; // 提交时间
	private $detail; // 保存整个数组的value部分
	private $detail_key = array (
			"Dietitian_ID",
			"Diet_name",
			"sex",
			"age",
			"contract",
			"mark",
			"description",
			"commit_time" 
	); // 保存整个数组的key部分 //与数据库一致
	private $result; // 保存查询结果
	//private $errorNum = 1; // 插入操作返回的错误代号
	//private $errorMess = "";
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
	function Submit_Diet() { // 营养师上线//未测试可用
		$nowtime = date ( "Y-m-d G:i:s" );
		
		$insert_sql = "INSERT INTO " . $this->dbname . "(";
		
		// detail_key 含有ID 0=>Dietitian_ID
		
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

		$this->Dietitian_ID =  parent::$MySQLi->insert_id;//便于马上登陆

		// print_r($this->Dietitian_ID);
	}
	function Check_Diet() {
		$this->Dietitian_ID = $_GET ["Dietitian_ID"];
		if ($this->Dietitian_ID)
		{
			$select_sql = "SELECT * FROM " . $this->dbname . " WHERE Dietitian_ID='" . $this->Dietitian_ID . "'";
		}
		else //全表查询  这时候要缓存
		{
			$save=parent::mmc_getdata("all_Dietitian");//key的格式为 user_order_13
			if ($save)
			{
				//echo "从缓存中获得数据成功";
				//print_r ($save);
				//echo "以上是还缓存数据";
				return $save;//直接返回普通数组  结束函数
			}//如果save获得数据  否则往下执行
			
			$select_sql = "SELECT * FROM " . $this->dbname . " WHERE 1";
		}
		//echo $select_sql . '<br>';
		
		$this->result = parent::$MySQLi->query (  $select_sql );
		
		$Diet_num = $this->result->num_rows ;//营养师数目1

		
		if ($this->result && $Diet_num > 0) {
		
			$i = 0;
			$j = 0;
			while ( $row = $this->result->fetch_row (  ) ) { // 循环从结果集中遍历每条记录到数组中
			                                                      
				$i = 0;
				foreach ( $row as $data ) {
					$save ["Dietitian" . $j] [$this->detail_key [$i]] = $data; // 循环遍历一条数据记录中的每个字段
					$i ++;
				}
				
				$j ++;
			} // 暂时只有一行//按名称查询会有多行
		} 

		else {
			return "0";
		}
		


		$this->result->free ( ); // 释放查询的结果集资源
		
		
		if (!$_GET ["Dietitian_ID"]) //全表查询  得排序 还有写入缓存
		{
			foreach ( $save as $key => $value ) {
			$Dietitian_ID [$key] = $value ["Dietitian_ID"];
			}
		
			array_multisort ( $Dietitian_ID, SORT_NUMERIC, SORT_DESC, $save );
			parent::mmc_setdata("all_Dietitian" , $save);
			//echo "这是缓存后马上读取出来的数据".parent::mmc_getdata("all_Dietitian")."这是缓存后马上读取出来的数据";
		}
		
		
		return $save;
	}
	function Update_Diet() {//这个函数不可用
		{
			/* 获取需要修改的记录数据 */
			
			$nowtime = date ( "Y-m-d G:i:s" );

			
			$update_sql = "UPDATE " . $this->dbname . " SET ";


			
			for($i = 2; $i < count ( $this->detail_key ) - 2; $i ++) {
				// Dietitian_ID 与 Diet_name user_id不允许更改 从索引2开始更改
				$update_sql = $update_sql . $this->detail_key [$i] . "='" . $this->detail [$i - 1] . "',";
				// echo $update_sql . '<br>';
				// echo "<br>";
			}
			
			$update_sql = $update_sql . $this->detail_key [$i] . "='" . $nowtime . "' WHERE ";
			$update_sql = $update_sql . $this->detail_key [0] . "='" . $this->Dietitian_ID . "'"; // 按用户Dietitian_ID查询订单
			                                                                                      // 语句拼接
			                                                                                      // echo $update_sql . '<br>';
			
			$this->errorNum = parent::$MySQLi->query (  $update_sql );
			// 插入返回的错误代号

		}
		
		if (! $this->errorNum) {
			die ( "Null" );
		}


	}
	function Cancel_Order() {//这个函数不可用
		if ($_GET ["Dietitian_ID"]) {
			$this->Dietitian_ID = $_GET ["Dietitian_ID"];
			// echo $this->Dietitian_ID . "<br>";
		}
		
		if ($this->Dietitian_ID)
			$delete_sql = "DELETE FROM " . $this->dbname . " WHERE Dietitian_ID='" . $this->Dietitian_ID . "'";
			// 按Dietitian_ID进行清除订单
			// echo $delete_sql . '<br>';
		
		$this->result = parent::$MySQLi->query (  $delete_sql );
		
		if (! ($this->result && $this->result->num_rows > 0)) {
			/*
			 * $select_sql = "SELECT * FROM " . $this->dbname . " WHERE Dietitian_ID='" . $this->Dietitian_ID . "'";
			 * echo $select_sql . '<br>';
			 *
			 * $this->result = parent::$MySQLi->query ( $this -> link , $select_sql );
			 * if (! ($this->result && mysqli_num_rows ( $this->result ) > 0))
			 */
			{
				// echo "订单取消成功";
			}
		} else {
			// echo "您的订单你取消失败";
		}
	}
}