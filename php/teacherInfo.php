<?php
	// 获取教师信息
	header("content-type:text/html;charset=utf-8");
  require_once('connection.php');
  require_once('encode.php');

	$query = "select * from teacher";
	$conn = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
  mysqli_query($conn, "SET NAMES utf8");
  $result = mysqli_query($conn, $query);

	$teacher = array(); 
	while($row = mysqli_fetch_array($result, MYSQL_ASSOC)) {
		array_push($teacher, array("id" => $row["id"], "name" => $row["name"],
		 "sex" => $row["sex"], "position" => $row["position"], 
		 "direction" => $row["direction"], "phone" => $row["phone"],
		 "photo" => $row["photo"], "maxNum" => $row["maxNum"],
		 "choosedNum" => $row["choosedNum"]));
	}
	echo encode_json(array("teacher" => $teacher));
  mysqli_close($conn);
?>