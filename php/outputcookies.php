<?php
//jq先请求outputcookies 检查登陆状态  检验data.islogin == 1 && data.contract && data.user_id
//这个文件没有User0
session_start();
$login=json_encode($_SESSION);
print_r($login);
?>