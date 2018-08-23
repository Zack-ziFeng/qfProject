<?php 
	$servername = 'localhost';
	$username = 'root';
	$password = '';
	$dbname = 'zjw';

	$conn = new mysqli($servername, $username, $password, $dbname);
	if ($conn->connect_error) {
		die("链接失败：" . $conn->connect_error);
	}
 ?>