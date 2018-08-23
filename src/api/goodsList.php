<?php
	header("Content-type=text/html;charset=utf-8");
	include "linkData.php";

	$brand = isset($_GET['brand']) ? $_GET['brand'] : null;
	$origin = isset($_GET['origin']) ? $_GET['origin'] : null;
	$odor = isset($_GET['odor']) ? $_GET['odor'] : null;
	$kind = isset($_GET['kind']) ? $_GET['kind'] : null;
	$apply = isset($_GET['apply']) ? $_GET['apply'] : null;
	$alcohol = isset($_GET['alcohol']) ? $_GET['alcohol'] : null;

	$sql = "select * from goods";
	$result = $conn->query($sql);
	$row = $result->fetch_all(MYSQLI_ASSOC);
	$result->close();
	for ($i=0; $i<count($row); $i++) {
		foreach ($row[$i] as $key => $value) {
			echo mb_detect_encoding($value, mb_detect_order()) . "<br>";
		}
	}
 ?>