<?php
// 登出
  session_start();
  if (isset($_SESSION['id'])) {
    $_SESSION = array();
    session_destroy();
  }
  header('Location: ../pages/login.html');
?>