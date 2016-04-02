<?php 
	$typeofconsult = $address = $housenumber = $name = $number = "";
	
	if($_SERVER["REQUEST_METHOD"] == "post"){
		$name = test_input($_POST("name"));
		echo $name;
	}
	
	
	function test_input($data) {
		$data = trim($data);
		$data = stripcslashes($data);
		$data = htmlspecialchars($data);
		return $data;
	}
	
?>