<?php 
	header("Content-type=text/html;charset=utf-8");
	include "linkData.php";
	$idx = isset($_GET['idx']) ? $_GET['idx'] : null;
	$sql = "select * from goods where id='$idx'";
	$result = $conn->query($sql);
	$row = $result->fetch_all(MYSQLI_ASSOC);
	$result->close();

	echo json_encode($row);
 ?>