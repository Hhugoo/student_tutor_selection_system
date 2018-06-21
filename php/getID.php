<?php
  // 获取用户ID
  session_start();
  if (isset($_SESSION['id'])) {
    $id=$_SESSION['id'];
    echo $id;
  } else {
    echo 0;
  }
?>