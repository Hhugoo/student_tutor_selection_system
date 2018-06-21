<?php
// 教师发布任务
require_once('appvars.php');
require_once('connection.php');
header("content-type:text/html;charset=utf-8");
session_start();
$tutorId = $_SESSION['id'];
$taskName = $_POST['taskName'];
$deadline = $_POST['deadline'];
$taskDetail = $_POST['taskDetail'];
$startTime = date("Y-m-d");
$conn = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
mysqli_query($conn, "SET NAMES utf8");
$query = "insert into task set tutorId='$tutorId', taskName='$taskName', startTime='$startTime', deadline='$deadline', taskDetail='$taskDetail'";
mysqli_query($conn, $query);
if (mysql_affected_rows() != -1)
  echo "任务发布成功!";
else
  echo "任务发布失败!";
?>