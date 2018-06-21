<?php
	// 获取学生信息
	header("content-type:text/html;charset=utf-8");
	require_once('connection.php');
	require_once('encode.php');

	$query = "select * from students";
	$conn = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
	mysqli_query($conn, "SET NAMES utf8");
	$result = mysqli_query($conn, $query);
    
	$student = array();
	while($row = mysqli_fetch_array($result, MYSQL_ASSOC)) {
		array_push($student, array("id" => $row["id"], 
		"name" => $row["name"], "sex" => $row["sex"], 
		"major" => $row["major"], "classId" => $row["classId"], 
		"phone" => $row["phone"], "state" => $row["state"], 
		"tutorId" => $row["tutorId"], "photo" => $row["photo"]));
	}
	echo encode_json(array("student" => $student));    
	mysqli_close($conn);
?>