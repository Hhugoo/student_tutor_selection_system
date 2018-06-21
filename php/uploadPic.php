<?php
// 上传头像
require_once('appvars.php');
require_once('connection.php');
$id = $_POST['id'];
$character = $_POST['character'];

$photo = $_FILES['myphoto']['name'];
$photo_type = $_FILES['myphoto']['type'];
$photo_size = $_FILES['myphoto']['size'];

if (!empty($photo)) {
	if((($photo_type=='image/gif') || ($photo_type=='image/jpeg') || 
		($photo_type=='image/pjpeg') || ($photo_type=='image/png')) && 
		($photo_size>0) && ($photo_size<GW_MAXFILESIZE)){
		if($_FILES['myphoto']['error']==0){
		    // 定义新的文件名及路径（确保文件名不重复）
			$photo = time().$photo;
			$target = GW_UPLOADPATH.$photo;
			echo "success$target";
		    // 把文件移到目标文件夹中
			if(move_uploaded_file($_FILES['myphoto']['tmp_name'], $target)){
				$dbc = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
				$query = "update $character set photo = '$photo' where id = '$id'";
				mysqli_query($dbc, $query);
				mysqli_close($dbc);
			}
			else{
				echo '抱歉,上传的图像有问题';
			}
		} 
	}
	else{
		echo '抱歉,图片仅支持GIF,PJPEG,JPEG,PNG格式,并且大小不超过' . (GW_MAXFILESIZE / 1024) . ' KB';
	}
	@unlink($_FILES['myphoto']['tmp_name']);
}
?>