<?php
  // 修改密码验证身份(第二次提交部分):回答完密保问题
  header("content-type:text/html;charset=utf-8");
  require_once('connection.php');

	$id = $_POST['id'];
  $answer1 = $_POST['answer1'];
  $answer2 = $_POST['answer2'];
  $answer3 = $_POST['answer3'];

	if ($answer1 == "" || $answer2 == "" || $answer3 == "") {
		echo "请回答所有问题后再提交!";
	} else {
		$conn = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
		$query = "select * from security where id=$id and answer1= '$answer1' and answer2='$answer2' and answer3='$answer3'";
		mysqli_query($conn, "SET NAMES utf8");
		$result = mysqli_query($conn, $query);
		$num = $result->num_rows;
		if ($num) {
			$query = "update students set password='123456' where id=$id";
      mysqli_query($conn, "SET NAMES utf8");
      $result = mysqli_query($conn, $query);
			echo "0";
		} else {
			echo "密保问题回答有误!";
		}
		mysqli_close($conn);
	}
?>