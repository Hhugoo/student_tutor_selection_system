// 验证当前是否有账户登录，若无跳出提示信息并跳转到登陆页面
$.ajax({
  type: "GET",
  url: "../php/getID.php",
  success: function (data) {
    if(data == 0) {
      alert("请先登录!");
      window.location.href="login.html";
    }
  }
});