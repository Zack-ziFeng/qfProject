<?php
	header("Content-type=text/html;charset=utf-8");
	include "linkData.php";

	$brand = isset($_GET['brand']) ? $_GET['brand'] : null;
	$origin = isset($_GET['origin']) ? $_GET['origin'] : null;
	$odor = isset($_GET['odor']) ? $_GET['odor'] : null;
	$kind = isset($_GET['kind']) ? $_GET['kind'] : null;
	$apply = isset($_GET['apply']) ? $_GET['apply'] : null;
	$alcohol = isset($_GET['alcohol']) ? $_GET['alcohol'] : null;

	$page = isset($_GET['page']) ? $_GET['page'] : null;
	$qty = isset($_GET['qty']) ? $_GET['qty'] : null;

	$sql = "select * from goods";
	$result = $conn->query($sql);
	$row = $result->fetch_all(MYSQLI_ASSOC);
	$result->close();

	$msg = array(
		'total' => count($row),
		"data" => array_slice($row, ($page-1)*$qty, $qty),
		"page" => $page,
		"qty" => $qty
	);

	echo json_encode($msg);
 ?>