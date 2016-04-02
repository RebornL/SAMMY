<?php
// file Dietitian_Com.php 用于抓取用户填表信息并写入数据库
class User_imformation extends db_connect { // 用户订单细节类
	private $dbname = "user_imformation"; // ".$this->dbname."
	private $user_id; // 订单的唯一comment_ID
	                  // private $Dietitian_ID;
	                  // private $user_name;
	                  // private $sex;
	                  // private $address;
	                  // private $age;
	private $contract;
	private $password;
	// private $service_time; // 期望服务时间
	private $commit_time; // 提交时间
	private $nickname;//暂时这样处理
	private $detail; // 保存整个数组的value部分
	private $User_detail; // 保存整个数组的value部分

	private $detail_key = array (
			"user_id",
			"contract",
			"password",
			"commit_time" 
	); // 保存整个数组的key部分 //与数据库一致
	private $User_detail_key=array (
			"nickname"
	);
	private $result; // 保存查询结果
	private $errorNum = 1; // 插入操作返回的错误代号
	private $errorMess = "";
	
	function __construct()//覆盖父类构造方法
	{
		//echo "子类构造函数调用";
		$this->Initial();
	}
	function __destruct()//覆盖父类析构方法
	{
/*		echo "子类析构函数调用";
		parent::__destruct();
		echo "父类析构函数调用完毕";
		echo "bye";*/
	}
	
	function Initial() {

		for($i = 1; $i <= 2; $i ++) {
			$this->detail [$i - 1] = $_GET [$this->detail_key [$i]]; // 用户期望的服务时间
		}//用户注册的关键部分
		for($j = 0; $j < count ( $this->User_detail_key ); $j ++) {
			$this->User_detail [$j] = $_GET [$this->User_detail_key [$j]]; // 用户期望的服务时间
		}//用户注册的非关键部分
		
	}
	function User_Signin() { // 用户注册检验
		$nowtime = date ( "Y-m-d G:i:s" );
		
		$insert_sql = "INSERT INTO $this->dbname (" . $this->detail_key [1] . "," . $this->detail_key [2] . "," . $this->detail_key [3] . ") VALUES ('" . $this->detail [0] . "',SHA1('" . $this->detail [1] . "'),'" . $nowtime . "')";
		
		parent::$MySQLi->query (  $insert_sql );
		// 插入返回的错误代号
		
		//$sql2 = "select last_insert_id() as user_id"; // 执行插入后，马上执行这个sql，获取最后一条出入记录的id
		//$this->result = parent::$MySQLi->query (  $sql2 );
		//$this->user_id = $this->result->fetch_assoc (  )["user_id"];
		// echo '<br>' .$this->user_id;
		$this->user_id =  parent::$MySQLi->insert_id;//便于马上登陆
		//插入用户的昵称等s
		$update_sql = "UPDATE " . $this->dbname . " SET ";

		for($i = 0; $i < count ( $this->User_detail_key ); $i ++) {

			$update_sql = $update_sql . $this->User_detail_key [$i] . "='" . $this->User_detail [$i] . "',";


		}
		
		$update_sql = $update_sql . $this->detail_key [3] . "='" . $nowtime . "' WHERE ";
		$update_sql = $update_sql . $this->detail_key [0] . "='" . $this->user_id . "'"; 
																						 // 语句拼接
		//echo $update_sql . '<br>';
		parent::$MySQLi->query (  $update_sql );
		return $this->user_id;
	}
	function User_login() { // 用户登陆校验

		$select_sql = "SELECT * FROM " . $this->dbname . " WHERE " . $this->detail_key [1] . " = " . $this->detail [0] . " AND " . $this->detail_key [2] . "=SHA1('" . $this->detail [1] . "')";
		
		$this->result = parent::$MySQLi->query (  $select_sql );
		$User_num = $this->result->num_rows;
				
		$this->detail_key=array_merge($this->detail_key,$this->User_detail_key);//拼在一起
		
		
		if ($this->result && $User_num == 1) {
			
			// 找到的用户是一个
			
			$i = 0;
			$j = 0;
			while ( $row = $this->result->fetch_row ( ) ) { // 循环从结果集中遍历每条记录到数组中

				$this->detail = $row;//只有一行
				$i = 0;
				foreach ( $row as $data ) {
					$save ["User" . $j] [$this->detail_key [$i]] = $data; // 循环遍历一条数据记录中的每个字段
					$i ++; 
				}
				
				$j ++;
			} // 暂时只有一行
		} 

		else {
			$save="-1";
		}
				
		$this->result->free (  ); // 释放查询的结果集资源
		
		return $save;
	}
	function Change_password() {
		
			/* 获取需要修改的记录数据 */
			$select_sql = "SELECT user_id FROM " . $this->dbname . " WHERE ";
			$select_sql = $select_sql . $this->detail_key [1] . " = " . $this->detail [0] . " AND " ;//contract
			$select_sql = $select_sql . $this->User_detail_key [0] . "='" . $this->User_detail [0] . "'";//nickname
			//echo $select_sql . '<br>';
			$this->result = parent::$MySQLi->query (  $select_sql );
			$User_num = $this->result->num_rows;
			
			if ($User_num == 1)
			{
			$nowtime = date ( "Y-m-d G:i:s" );
			$this->user_id = $this->result->fetch_object()->user_id;//此方法创建一个对象
			
			$update_sql = "UPDATE " . $this->dbname . " SET ";
			
			//修改密码只需要contract还有nickname
			
			//for($i = 2; $i < count ( $this->detail_key ) - 2; $i ++) {
				// comment_ID 与 Dietitian_ID user_id不允许更改 从索引2开始更改 
				$update_sql = $update_sql . $this->detail_key [2] . "=" . "SHA1('" . $this->detail [1] . "')";//新密码
				// . $this->detail [2 - 1] .
				// echo "<br>";
			//}
			
			$update_sql = $update_sql . " WHERE ";
			$update_sql = $update_sql . $this->detail_key [0] . "='" . $this->user_id . "'";
			
			//echo $update_sql . '<br>';
			parent::$MySQLi->query (  $update_sql );
			$this->result = parent::$MySQLi->affected_rows;// 0 没作任何修改 1修改过
			
			
		
		if ($this->result!=1) {
			return "0";//密码相同
		}
		else if ($this->result==1)
		{return "1";}//修改有效
		}
		
		else {return "-1";}//没有此用户

		
	}
	function Delete_User() {
		if ($_GET ["comment_ID"]) {
			$this->user_id = $_GET ["user_id"];
			// echo $this->user_id . "<br>";
		}
		
		if ($this->user_id)
			$delete_sql = "DELETE FROM " . $this->dbname . " WHERE user_id='" . $this->user_id . "'";
			// 按comment_ID进行清除订单
			// echo $delete_sql . '<br>';
		
		$this->result = parent::$MySQLi->query (  $delete_sql );
		
		if (! ($this->result && $this->result->num_rows > 0)) {
			
			{
				// echo "订单取消成功";
			}
		} else {
			// echo "您的订单你取消失败";
		}
	}
	function DestroySession() {
		session_start ();
		$_SESSION = array ();
		if (isset ( $_COOKIE [session_name ()] )) {
			setcookie ( session_name (), '', time () - 3600 );
		}
		
		session_destroy ();
	}
	function SetSession() {
		session_start ();
		$_SESSION ["user_id"] = $this->detail [0];
		$_SESSION ["contract"] = $this->detail [1];
		$_SESSION ["nickname"] = $this->detail [4];

		$_SESSION ["islogin"] = 1;
	}
}