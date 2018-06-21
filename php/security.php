<?php
  // 设置密保问题存入数据库
  header("content-type:text/html;charset=utf-8");
  require_once('connection.php');
  session_start();
	$question1 = $_POST['question1'];
  $answer1 = $_POST['answer1'];
  $question2 = $_POST['question2'];
  $answer2 = $_POST['answer2'];
  $question3 = $_POST['question3'];
  $answer3 = $_POST['answer3'];
  $id = $_SESSION['id'];

  if ($question1 == '' ||$question2 == '' || $question3 == '') {
    echo "密保问题不能为空!";
  }
  if ($question1 == $question2 || $question1 == $question3 || $question2 == $question3) {
    echo "三个密保问题必须设置成不同哦!";
  } else {
    $conn = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
    $query1 = "select * from security where id = '$id'";
    mysqli_query($conn, "SET NAMES utf8");
		$result = mysqli_query($conn, $query1);
		$num = $result->num_rows;
		if ($num) {
      echo "您已设置密保问题!无需重复设置!";
    } else {
      $query = "insert into security set id='$id', question1='$question1', answer2='$answer2', question2='$question2', answer3='$answer3', question3='$question3', answer1='$answer1'";
      mysqli_query($conn, $query);
      echo "密保问题设置成功!";
    }
  }
?>