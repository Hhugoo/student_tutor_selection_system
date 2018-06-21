<?php
	// 获取密保问题
	header("content-type:text/html;charset=utf-8");
	require_once('connection.php');
	require_once('encode.php');

	$query = "select * from security";
	$conn = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
	mysqli_query($conn, "SET NAMES utf8");
	$result = mysqli_query($conn, $query);
	
	$question = array();
	while($row = mysqli_fetch_array($result, MYSQL_ASSOC)) {
    array_push($question, array("id" => $row["id"],
    "question1" => $row["question1"], "answer1" => $row["answer1"],
    "question2" => $row["question2"], "answer2" => $row["answer2"],
    "question3" => $row["question3"], "answer3" => $row["answer3"]));
	}
	echo encode_json(array("question" => $question));
	mysqli_close($conn);
?>