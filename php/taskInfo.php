<?php
	// 获取任务信息
	header("content-type:text/html;charset=utf-8");
	require_once('connection.php');
	require_once('encode.php');

	$query = "select * from task";
	$conn = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
	mysqli_query($conn, "SET NAMES utf8");
	$result = mysqli_query($conn, $query);
    
	$task = array();
	while($row = mysqli_fetch_array($result, MYSQL_ASSOC)) {
		array_push($task, array("id" => $row["id"], 
		"tutorId" => $row["tutorId"], "taskName" => $row["taskName"], 
		"startTime" => $row["startTime"], "deadline" => $row["deadline"], 
		"taskDetail" => $row["taskDetail"]));
	}
	echo encode_json(array("task" => $task));    
	mysqli_close($conn);
?>