<?php 
	include 'linkData.php';

	$username = isset($_POST['username']) ? $_POST['username'] : null;
	$password = isset($_POST['password']) ? $_POST['password'] : null;
	
	$sql = "insert into user(username,password) values('$username','$password')";
	$result = $conn->query($sql);
	if ($result) {
		echo "注册成功";
	} else {
		echo "注册失败";
	}
 ?>