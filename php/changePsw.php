<?php
  // 修改密码
  require_once('connection.php');
  header("content-type:text/html;charset=utf-8");
	$id=$_GET['id'];
	$character = $_GET['character'];
	$oldPassword = $_GET['oldPassword'];
	$newPassword = $_GET['newPassword'];
	$conn = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
  $query = "select password from $character where id=$id";
  mysqli_query($conn, "SET NAMES utf8");
  $result = mysqli_query($conn, $query);
  $row = mysqli_fetch_array($result);
  if ($row["password"] == $oldPassword) {
    //更新密码
    mysqli_query($conn, "update $character set password = '$newPassword' where id = $id");
    echo "密码已更改";
  } else {
    echo "原密码错误";
  }
  mysqli_close($conn);
?>