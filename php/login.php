<?php
	// 登录
  header("content-type:text/html;charset=utf-8");
  require_once('connection.php');

	$id = $_POST['id'];
	$password = $_POST['password'];
	$character = $_POST['character'];

	session_start();
	if ($id == "" || $password == "") {
		echo "请输入学(工)号或密码";
	} else {
		$conn = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
		$query = "select * from $character where id=$id and password= '$password'";
		mysqli_query($conn, "SET NAMES utf8");
		$result = mysqli_query($conn, $query);
		$num = $result->num_rows;
		if ($num) {
			$row = mysqli_fetch_array($result);
			$_SESSION['id'] = $row['id'];
			$_SESSION['character'] = $character;
			echo "$character";
		} else {
			echo "用户名或者密码不正确！";
		}
		mysqli_close($conn);
	}
?>