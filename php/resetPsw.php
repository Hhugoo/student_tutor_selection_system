<?php
	// 修改密码验证身份(第一次提交部分):提交学号姓名身份
  header("content-type:text/html;charset=utf-8");
  require_once('connection.php');

	$id = $_POST['myId'];
  $name = $_POST['myName'];
  $character = $_POST['myCharacter'];

	if ($id == "" || $name == "" || $character == "") {
		echo "请输入相关信息后再提交!";
	} else {
		$conn = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
		$query = "select * from $character where id=$id and name= '$name'";
		mysqli_query($conn, "SET NAMES utf8");
		$result = mysqli_query($conn, $query);
		$num = $result->num_rows;
		if ($num) {
			echo "0".$id;
		} else {
			echo "信息有误!请填写正确信息!";
		}
		mysqli_close($conn);
	}
?>