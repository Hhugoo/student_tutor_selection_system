//重置密码
$(document).ready(function() {
  var id;
  $("#secondPage").hide();//隐藏第二页的内容(密保问题)
  $("#firstStep").submit(function(event){
    event.preventDefault();
    var form = $(this);
    var formData = new FormData(document.getElementById("firstStep"));
    $.ajax({
      type: form.attr('method'),
      url: form.attr('action'),
      data: formData,
      contentType: false,
      processData: false,
      success:function (data) {
        if(data.slice(0,1) == 0) {
          //隐藏第一步,显示第二步
          $("#firstPage").hide();
          $("#secondPage").show();
          //修改数字颜色
          $("#number1").attr("src", "../images/Number01-grey.png");
          $("#number2").attr("src", "../images/Number02.png");
          id = data.slice(1);//得到用户id
          getQuestions(id);//查看此人的密保问题
          $("#id").val(id);
        } else {
          alert(data);
        }
      }
    })
  })
  //提交密保问题
  $("#secondStep").submit(function(event){
    event.preventDefault();
    var form = $(this);
    var formData = new FormData(document.getElementById("secondStep"));
    $.ajax({
      type: form.attr('method'),
      url: form.attr('action'),
      data: formData,
      contentType: false,
      processData: false,
      success:function (data) {
        if(data == 0) {
          alert("密码修改成功!初始密码为123456!");
          window.location.href="login.html";
        } else {
          alert(data);
        }
        $(".answer").val('');
      }
    })
  })
  function getQuestions(id) {
    var flag = false; //记录该人是否有密保问题
    $.getJSON("../php/questionInfo.php", function(json) {
      if(json.question.length>0) {
        $(".question").val('');//置空问题
        $.each(json.question, function () { 
          if(id == this['id']) {
            flag = true;
            $(".question").eq(0).append(this['question1']);
            $(".question").eq(1).append(this['question2']);
            $(".question").eq(2).append(this['question3']);
          }
        })
      }
      //若该人没有设置密保问题,显示提示
      if (flag == false) {
        $("#secondPage").children().hide();
        $("#secondPage").append("<div class='alert alert-warning' style='margin: 20px;'>你还未设置密保问题，自行联系管理员更改密码吧！</div>")
      }
    })
  }
})