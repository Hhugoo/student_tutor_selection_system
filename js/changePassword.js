$(document).ready(function () {
  //动态加载修改密码页面
  $.ajax({
    type: "get",
    url: "../pages/changePsw.html",
    async: true,
    success: function(data) {
      $("#changePswPage").html(data);
      validateForm();
    }
  });
  //得到当前用户的id
  var id;
  $.ajax({
		type: "GET",
		url: "../php/getID.php",
		success: function (data) {
			id = data;
		}
  });
  //动态绑定点击事件
  $("#changePsw").click(function () {
    $("#hidebox").css("display", "block");
    $("#hidebg").css("display", "block");
  });
  $("body").on("click", "#cancel", function() {
    $("#hidebox").css("display", "none");
    $("#hidebg").css("display", "none");
  });
  $("body").on("click", "#confirmBtn", function() {
    var character = window.location.href.split('pages/')[1].split('.')[0];
    var oldPassword = $("#oldPassword").val();
    var newPassword = $("#confirmPassword").val();
    $.ajax({
      type: "GET",
      url: "../php/changePsw.php",
      data: {
        character: character,
        id: id,
        oldPassword: oldPassword,
        newPassword: newPassword
      },
      success: function (data) {
        alert(data);
      }
    })
    $("#hidebox").css("display", "none");
    $("#hidebg").css("display", "none");
    $("#oldPassword").val('');
    $("#newPassword").val('');
    $("#confirmPassword").val('');
    return false;
  });
  //使用jQuery Validate插件
  function validateForm() {
    $("#changePswForm").validate({
      rules: {
        oldPassword: {
          required: true,
          minlength: 6
        },
        newPassword: {
          required: true,
          minlength: 6
        },
        confirmPassword: {
          required: true,
          minlength: 6,
          equalTo: "#newPassword"
        }
      },
      messages: {
        oldPassword: {
          required: "请输入当前密码",
          minlength: "密码长度不能小于6个字母"
        },
        newPassword: {
          required: "请输入新密码",
          minlength: "密码长度不能小于6个字母"
        },
        confirmPassword: {
          required: "请再次输入密码",
          minlength: "密码长度不能小于6个字母",
          equalTo: "两次密码输入不一致"
        }
      }
    })
  }
})