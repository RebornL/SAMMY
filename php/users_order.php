<?php
// file mysql_user.php 用于抓取用户填表信息并写入数据库
//http://2.forstudyxing.sinaapp.com/php/userchkorder.php?user_id=13
class User_detail extends db_connect
{
 // 用户订单细节类
                                       // private $link;
    private $dbname = "user_order";
 // ".$this->dbname."
    private $order_ID;
 // 订单的唯一order_ID
    private $user_id;

    private $user_name;
    // private $sex;
    // private $address;
    // private $age;
    private $contract;
    // private $description;
    // private $service_time; // 期望服务时间
    // private $commit_time; // 提交时间
    private $detail;
 // 保存整个数组的value部分
    private $detail_key = array(
            "order_ID",
            "user_id",
            "ToS",
            "ToC",
            "Dietitian_ID",
            "user_name",
            "sex",
            "address",
            "age",
            "contract",
            "description",
            "service_time",
            "commit_time",
            "order_status"
    );
 // 保存整个数组的key部分 //与数据库一致
    private $result;
 // 保存查询结果
    //private $errorNum = 1;
 // 插入操作返回的错误代号
    //private $errorMess = "";

    function __construct () // 覆盖父类构造方法
    {
        // $this->Initial();
    }

    function __destruct () // 覆盖父类析构方法
    {
        /*
         * echo "子类析构函数调用";
         * parent::__destruct();
         * echo "父类析构函数调用完毕";
         * echo "bye";
         */
    }

    function Initial ()
    {
        /*
         * $this->detail [0] = $this->user_id = $_GET ["user_id"]; // 注册用户唯一ID
         * $this->detail [1] = $this->ToS = $_GET ["ToS"]; // 用户所选服务类型
         * $this->detail [2] = $this->ToC = $_GET ["ToC"]; // 用户所选咨询类型
         * $this->detail [3] = $this->Dietitian = $_GET ["Dietitian"]; //
         * 用户所选营养师
         * $this->detail [4] = $this->user_name = $_GET ["user_name"]; // 用胡姓名
         * $this->detail [5] = $this->sex = $_GET ["sex"]; // 用户性别
         * $this->detail [6] = $this->address = $_GET ["address"]; // 用户地址
         * $this->detail [7] = $this->age = $_GET ["age"]; // 用户年龄
         * $this->detail [8] = $this->contract = $_GET ["contract"]; // 用户联系方式
         * $this->detail [9] = $this->description = $_GET ["description"]; //
         * 用户描述
         * $this->detail [10] = $this->service_time = $_GET ["service_time"]; //
         * 用户期望的服务时间
         */
        for ($i = 1; $i <= 11; $i ++) {
            $this->detail[$i - 1] = parent::$MySQLi->real_escape_string(trim($_GET[$this->detail_key[$i]]));
        }
    }

    function Submit_Order ()
    {
        $nowtime = date("Y-m-d G:i:s");


        $insert_sql = "INSERT INTO " . $this->dbname . "(";
        
        // detail_key 含有ID 0=>order_ID
        
        for ($i = 1; $i < count($this->detail_key) - 2; $i ++) {
            // 跳过第一个order_ID项目 跳过commit_time
            $insert_sql = $insert_sql . $this->detail_key[$i] . ",";
        }
        $insert_sql = $insert_sql . $this->detail_key[$i] . ") VALUES(";
           
        // detail 不含有order_ID 1=>user_name的内容 0为action
        for ($i = 0; $i < count($this->detail); $i ++) {
            // 跳过第一个action项目
            $insert_sql = $insert_sql . "'" . $this->detail[$i] . "'" . ",";
        }
        
        $insert_sql = $insert_sql . "'" . $nowtime . "'" . ")";
        // 约定最后一项是时间
        // 语句拼接
        // echo '<br>' . $insert_sql . '<br>';
        
		parent::$MySQLi->query($insert_sql);//执行后  可以读取insert_id error 属性
        // 插入返回的错误代号     

        $this->order_ID = parent::$MySQLi->insert_id;//返回插入的id
		
		parent::mmc_deletedata("user_order_".$_GET ["user_id"]); //key的格式为 user_order_13
		
		return $this->order_ID;//直接返回订单的唯一ID即可
    }

    function Check_Order ()
    {
		
        $temp = func_get_args();
        if ($temp) // 如果有传入参数

        {
            if ($_GET["order_ID"]) {
                $this->order_ID = $temp[0];
            } 

            else if ($_GET["user_id"]) {
				
                    $this->user_id = $temp[0];
					//缓存这部分的数据  就是用户的所有订单
					$save=parent::mmc_getdata("user_order_".$this->user_id);//key的格式为 user_order_13
					if ($save)
					{
						//echo "从缓存中获得数据成功";
						//print_r ($save);
						//echo "以上是还缓存数据";
						return $save;//直接返回普通数组  结束函数
					}//如果save获得数据  否则往下执行
                } 

                else if ($_GET["contract"]) {
                        $this->contract = $temp[0];
                    }
        
            // 检查是否传入参数
            
		if ($this->order_ID) {
			$select_sql = "SELECT * FROM " . $this->dbname . 
				" WHERE order_ID='" . $temp[0] . "'";
		}                 

		// 优先按order_ID查询
		
		else if ($this->user_id) {
				$select_sql = "SELECT * FROM " . $this->dbname .
						 " WHERE user_id='" . $temp[0] . "'";
			} 

			else if ($this->contract) {
					$select_sql = "SELECT * FROM " . $this->dbname .
							 " WHERE contract='" . $temp[0] . "'";
				}
            
        } //传入参数时候的检验
		
		
		else {// 不传入任何参数时候默认是：order_id
            
            $select_sql = "SELECT * FROM " . $this->dbname . " WHERE order_ID='" .
                     $this->order_ID . "'";//插入一行订单信息马上查询用到这个
        }
        // echo $select_sql . '<br>';
        
        $this->result = parent::$MySQLi->query($select_sql);//返回的是  MySQLi_Result类型的对象 他有属性num_rows
        
        $Order_num = $this->result->num_rows;
        // echo "订单数目为".$Order_num."<br>";
        $save = array();//清除前面的影响
        if ($this->result && $Order_num > 0) {
            
            $i = 0;
            $j = 0;
            while ($row = $this->result->fetch_row()) { // 循环从结果集中遍历每条记录到数组中
                                                                                             
                $i = 0;
                foreach ($row as $data) {
                    $save["Order" . $j][$this->detail_key[$i]] = $data; // 循环遍历一条数据记录中的每个字段key
					
                    $i ++;
                }
                
                $j ++;
            }
        
			$this->result->free(); // 释放查询的结果集资源
			
			//一旦查询数据库 那肯定是没有缓存  那就现在缓存
			if ($_GET["user_id"] && $this->user_id)//如果首次按照user_id 查询的话  就缓存起来
			{
				foreach ($save as $key => $value) {
					$order_ID[$key] = $value["order_ID"];
				}
			
				array_multisort($order_ID, SORT_NUMERIC, SORT_DESC, $save);//按照订单ID排序 // 按照order_id按照倒序排序
				parent::mmc_setdata("user_order_".$this->user_id , $save);
				//echo "这是缓存后马上读取出来的数据".parent::mmc_getdata("user_order_".$this->user_id)."这是缓存后马上读取出来的数据";
			}
			
			return $save;
		
		} //判断订单数目的结束

        else {
            return array(); // 返回空数组表示没有数据
        }
        

    }

    function Update_Order ()
    {
        {
            /* 获取需要修改的记录数据 */
            $this->order_ID = $_GET["order_ID"];
            $nowtime = date("Y-m-d G:i:s");
            
            $update_sql = "UPDATE " . $this->dbname . " SET ";
            
            for ($i = 2; $i < count($this->detail_key) - 2; $i ++) {
                // order_ID 与 user_name user_id不允许更改 从索引2开始更改
                $update_sql = $update_sql . $this->detail_key[$i] . "='" .
                         $this->detail[$i - 1] . "',";
            }
            
            $update_sql = $update_sql . $this->detail_key[$i] . "='" . $nowtime .
                     "' WHERE ";
            $update_sql = $update_sql . $this->detail_key[0] . "='" .
                     $this->order_ID . "'";
            
            parent::$MySQLi->query($update_sql);//之后能访问affected_rows属性
             // 1为正常修改
             // 0没做任何修改
			parent::mmc_deletedata("user_order_".$_GET ["user_id"]);//key的格式为 user_order_13
			
			return parent::$MySQLi->affected_rows;//返回影响行数 1为正常
        }
        
        if (! parent::$MySQLi->errno) {
            return "-1";
        }

    }

    function Cancel_Order ()
    {
        if ($_GET["order_ID"]) {
            $this->order_ID = $_GET["order_ID"];
            
            $delete_sql = "DELETE FROM " . $this->dbname . " WHERE order_ID='" .
                     $this->order_ID . "'";
            // 按order_ID进行清除订单
            // echo $delete_sql . '<br>';
            
            parent::$MySQLi->query($delete_sql);
			parent::mmc_deletedata("user_order_".$_GET ["user_id"]);
            return parent::$MySQLi->affected_rows;
            
        }  // if ($_GET ["order_ID"])的结束

        else {
            return "-1";
        }
    }
}