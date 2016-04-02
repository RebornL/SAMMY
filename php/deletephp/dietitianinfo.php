<?php
header('Content-type: text/json;charset:UTF-8');
$doctors = array (
    "id" => array(1,2,3),
    "name"  => array("蔡", "吴" , "韦"),
    "introduction" => array("非常厉害的蔡神！！！","smart Beauty Wu！！！","神一般的MAX WEI！！！"),
    "picture" => array("../images/picture1.jpg","../images/picture2.jpg","../images/picture3.jpg")
);
echo json_encode($doctors);
?>