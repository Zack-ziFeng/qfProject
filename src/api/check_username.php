<?php 
	include 'linkData.php';

	/*
		验证用户名是否存在
	 */
	
	$username = isset($_GET['username']) ? $_GET['username'] : null;

	$sql = "select * from user where username='$username'";

	$result = $conn->query($sql);

	if ($result->num_rows>0) {
		echo "no";
	} else {
		echo "yes";
	}
 ?>