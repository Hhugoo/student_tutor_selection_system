<?php
// 教师选择学生
	header("content-type:text/html;charset=utf-8");
	require_once('connection.php');
	$stuId = $_GET['stuId'];
	$choose = $_GET['choose'];
	$teacherId = $_GET['teaId'];

	$conn = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
	mysqli_query($conn, "SET NAMES utf8");
	//得到教师的已选人数
	$query0 = "select choosedNum from teacher where id='$teacherId'";
	$result = mysqli_query($conn, $query0);
	while($row = mysqli_fetch_array($result)) {
		$choosedNum = $row['choosedNum'];
	}
	if($choose == 'yes') {
		if ($choosedNum < 5) {
			$choosedNum += 1;
			$query1 = "update students set state = '选定' where id = '$stuId'";
			$query2 = "update teacher set choosedNum = '$choosedNum' where id = '$teacherId'";
			mysqli_query($conn, $query1);
			mysqli_query($conn, $query2);
			echo "成功选择该学生!";
		} else {
			echo "您的可选人数已达上限!";
		}
	} else {
		$query = "update students set state = '未选', tutorId = '' where id = '$stuId'";
		mysqli_query($conn, $query);
		echo "您已拒绝该学生!";
	}
	mysqli_close($conn);
?>