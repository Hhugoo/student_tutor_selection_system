<?php
	// 获取管理员信息
	header("content-type:text/html;charset=utf-8");
	require_once('connection.php');
	require_once('encode.php');

	$query = "select * from manager";
	$conn = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
	mysqli_query($conn, "SET NAMES utf8");
	$result = mysqli_query($conn, $query);
	
	$manager = array();
	while($row = mysqli_fetch_array($result, MYSQL_ASSOC)) {
		array_push($manager, array("id" => $row["id"], "name" => $row["name"], "maxNum" => $row["maxNum"], "photo" => $row["photo"]));
	}
	echo encode_json(array("manager" => $manager));    
	mysqli_close($conn);
?>