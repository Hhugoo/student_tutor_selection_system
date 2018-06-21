$(document).ready(function () {
	var TeaId;
	//AJAX得到导师ID
	$.ajax({
		type: "GET",
		url: "../php/getID.php",
		success: function (data) {
			TeaId = data;
		}
	})
	getDBTeachers();
	getDBStudents();

	// 发布任务提交
	$("#taskForm").submit(function(event) {
		event.preventDefault();
		var form = $(this);
		var formData = new FormData(document.getElementById("taskForm"));
		$.ajax({
			type: form.attr('method'),
			url: form.attr('action'),
			data: formData,
			contentType: false,
			processData: false,
			success:function(data) {
				alert(data);
				// 置空当前内容
				$("#taskDetail").val('');
				$("#taskName").val('');
				$("#deadline").val('');
			}
		});
	})

	//获取导师个人信息
	function getDBTeachers() {
		$.getJSON("../php/teacherInfo.php", function (json) {
			if (json.teacher.length > 0) {
				$.each(json.teacher, function () {
					if (this['id'] == TeaId) {
						$('#teaId').append(this['id']);
						$('#teaName').append(this['name']);
						$('#sex').append(this['sex']);
						$('#position').append(this['position']);
						$('#direction').append(this['direction']);
						$('#phone').append(this['phone']);
						$('#maxNum').append(this['maxNum']);

						$('#photo').attr('src', '../headshots/' + this['photo']);
						$('#photoId').attr('value', this['id']);
						$('#logout span').append(this['name']);
					}
				});
			}
		});
	}

	//选择自己的学生信息
	function getDBStudents() {
		$.getJSON("../php/studentInfo.php", function (json) {
			var choosed = false; //选定自己
			var forChoose = false; //待定自己
			if (json.student.length > 0) {
				$.each(json.student, function () {
					//找到导师id为自己id的学生
					if (TeaId == this['tutorId']) {
						if (this['state'] == '待定') {
							forChoose = true;
							var info = `<tr>
														<td>` + this['id'] + `</td>
														<td>` + this['name'] + `</td>
														<td>` + this['sex'] + `</td>
														<td>` + this['major'] + `</td>
														<td>` + this['classId'] + `</td>
														<td>` + this['phone'] + `</td>
														<td><a href="#" class="yes">同意</a><td>
														<td><a href="#" class="no">拒绝</a><td>
													</tr>`;
							$('#myStu').append(info);		
						} else {
							choosed = true;
							var info = `<tr>
														<td>` + this['id'] + `</td>
														<td>` + this['name'] + `</td>
														<td>` + this['sex'] + `</td>
														<td>` + this['major'] + `</td>
														<td>` + this['classId'] + `</td>
														<td>` + this['phone'] + `</td>
													</tr>`;
							$('#myChoosedStu').append(info);
						}
					}
				});
				$("td a.yes").click(function() {
					var stuId = $(this).parent().parent().find('td').eq(0).html();
					$.ajax({
						type: "GET",
						url: "../php/chooseStudent.php",
						data: {
							stuId: stuId,
							choose: 'yes',
							teaId: TeaId
						},
						success: function(data) {
							alert(data);
							location.reload();
						}
					})
				})
				$("td a.no").click(function() {
					var stuId = $(this).parent().parent().find('td').eq(0).html();
					$.ajax({
						type: "GET",
						url: "../php/chooseStudent.php",
						data: {
							stuId: stuId,
							choose: 'no',
							teaId: TeaId
						},
						success: function(data) {
							alert(data);
						}
					})
				})
				if (choosed == false) {
					$('#choosed').append("<div class='alert alert-warning'>您还没有已选定的学生!</div>");
				}
				if (forChoose == false) {
					$('#forChoose').append("<div class='alert alert-warning'>暂无新的学生选择您!</div>");
				}
			}
		});
	}
});