<?php

class db_connect
{

    private static $db_connector = null;

    protected static $MySQLi = null;
	protected static $mmc = null;
 // 继承的子类可访问
    private function __construct ()
    {
        if (is_null(self::$MySQLi)) {
            self::$MySQLi = new MySQLi(SAE_MYSQL_HOST_M, SAE_MYSQL_USER, 
                    SAE_MYSQL_PASS, SAE_MYSQL_DB, SAE_MYSQL_PORT);
			self::$mmc = new Memcache;//初始化缓存 && self::$mmc
			
            if ((! self::$MySQLi->connect_error)) {
                //echo "数据库连接 在父类";
                self::$MySQLi->set_charset('utf8');
                
                //$MySQLi->query("set names 'utf8'"); // 写库
               	self::$MySQLi->select_db(SAE_MYSQL_DB);
				
				try {
					
					if (self::$mmc -> connect("nothing",0))//成功为true
					{}//不做任何事情
					else 
					{
						$error="memcache服务没有开启self::mmc -> connect()";
						throw new Exception($error);
					}
					
					}
				catch (Exception $event)
				{
					//echo $event->getMessage();
				}
            }
        }
    }

    function __destruct ()
    {
        // echo "父类析构函数调用";
        self::$MySQLi->close();
        // echo "父类析构函数 数据库断开连接";
		
		try {
					
			  if (self::$mmc -> close())//成功为true
			  {}//不做任何事情
			  else 
			  {
				  $error="memcache服务没有开启self::mmc ->close()";
				  throw new Exception($error);
			  }
			  
			  }
		  catch (Exception $event)
		  {
			  //echo $event->getMessage();
		  }
    }

    static function getInstance ()
    {
		//echo "单例模式调用";
        if (is_null(self::$db_connector)) {
            self::$db_connector = new self();
        } // 自动调用构造函数
        
        return self::$db_connector;
    }

    static function ConnectDB ()
    { // 这个函数名就不再更改了 单纯返回一个
		//echo "ConnectDB函数调用";
        return self::$MySQLi;
    }
	
	function mmc_getdata($key)
	{
		
		try {
			
			
			if ($data = self::$mmc -> get($key))//正常
			{}
			else
			{
				$error="memcache服务没有开启self::mmc -> get($key)";
				throw new Exception($error);
			}
			//echo "get没有异常  返回data";
			return $data;
			}
		catch (Exception $event)
		{
			//echo $event->getMessage();
			return array();
		}
	}
	
	function mmc_setdata($key,$data)
	{
		
		try {
			if($isset = self::$mmc -> set($key , $data))
			{}
			else 
			{
				$error="memcache服务没有开启self::mmc -> set($key , $data)";
				throw new Exception($error);
			}
			//echo "set没有异常";
			return $isset;
			}
		catch (Exception $event)
		{
			//echo $event->getMessage();
			return 0;
		}
	}
	
	function mmc_deletedata($key)
	{
		
		try {
			
			if ($is_delete = self::$mmc -> delete($key))
			{}
			else
			{
				$error="memcache服务没有开启self::mmc -> delete($key)";
				throw new Exception($error);
			}
			
			//echo "delete没有异常";
			return $is_delete;
			}
		catch (Exception $event)
		{
			//echo $event->getMessage();
			return 0;
		}
	}
}

?>