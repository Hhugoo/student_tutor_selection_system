$(document).ready(function () {
  var id;
  var setQuestion = false;
  //得到当前登录账号的id
	$.ajax({
		type: "GET",
		url: "../php/getID.php",
		success: function (data) {
      id = data;
      getSetQ(); // 判断是否已经设置过密保问题
		}
  });
  function getSetQ() {
    $.getJSON("../php/questionInfo.php", function (json) {
      if (json.question.length > 0) {
        $.each(json.question, function () {
          if (id == this['id']) { //判断是否有该人的id,若有,则说明已设置密保问题
            setQuestion = true;
            // break;
          }
        })
        if (!setQuestion) { //没设置密保执行以下代码
          //通过AJAX获取HTML
          $.ajax({
            type: "get",
            url: "../pages/setSecurity.html",
            async: true,
            success: function(data) {
              $("#security").html(data);
            }
          });
          $("#sysMessage").append("<div class='alert alert-warning'>你还未设置密保问题,为了你的账户安全,尽快设置吧!</div>");
        } else {
          $("#security").html("<div class='alert alert-warning'>你已经设置过密保问题,无需重复设置!</div>");
        }
      }
    })
  } 
  $("body").on("click", "#setSecurityBtn", function() {
    event.preventDefault();
    var form = $("#setSecurityForm");
    var formData = new FormData(document.getElementById("setSecurityForm"));
    $.ajax({
      type: form.attr('method'),
      url: form.attr('action'),
      data: formData,
      contentType: false,
      processData: false,
      success:function (data) {
        alert(data);
        $(".answer").val('');
      }
    })
  })
})