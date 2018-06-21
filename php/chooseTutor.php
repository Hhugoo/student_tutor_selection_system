<?php
	// 学生选择教师
	header("content-type:text/html;charset=utf-8");
	require_once('connection.php');
	$stuId = $_GET['stuId'];
	$teaId = $_GET['teaId'];
	$maxNum = $_GET['maxNum'];
	$choosedNum = $_GET['choosedNum'];

	$conn = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
	//查询该学生当前的状态
	$query = "select state from students where id = '$stuId'";
	mysqli_query($conn, "SET NAMES utf8");
	$result = mysqli_query($conn, $query);
	$row = mysqli_fetch_array($result);
	if ($row['state'] == '选定') {
		echo "你已选定了导师,不可再次选择!";
	} else if ($row['state'] == '待定') {
		echo "你已选择了导师,请等待老师的选择结果,若老师拒绝了你,可再次选择!";
	} else {
		if ($choosedNum < $maxNum) {
			$query1 = "update students set state = '待定', tutorId = '$teaId' where id = '$stuId'";
			mysqli_query($conn, $query1);
			echo "成功选择该导师,请耐心等待老师的选择结果!";
		} else {
			echo "当前导师已满员哦！换个导师选选吧！";
		}
	}
	mysqli_close($conn);
?>