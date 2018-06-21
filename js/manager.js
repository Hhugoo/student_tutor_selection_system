$(document).ready(function () {
	$.ajax({
		type: "GET",
		url: "../php/getID.php",
		success: function (data) {
			managerId = data;
		}
	})
	var stuState = ''; //学生状态分类
	var tutorState = 0; //导师状态分类
	var waitChoose = new Array(); //待选学生的导师
	var choosed = new Array(); //有学生的导师
	getDBStudents();
	getMyInfo();
	getDBTeachers(tutorState);
	$("#stuState").change(function () {
		//未选 待定 选定
		stuState = $(this).children("option:selected").val();
		getDBStudents();
	})
	$("#tutorState").change(function () {
		//0 所有老师 1 无学生 2 待选学生 3 有学生
		tutorState = $(this).children("option:selected").val();
		getDBTeachers(tutorState);
	})

	//根据不同的状态获取学生信息
	function getDBStudents() {
		$.getJSON("../php/studentInfo.php", function (json) {
			$("#stuTable").empty();
			if (json.student.length > 0) {
				$.each(json.student, function () {
					var info = '';
					//相应状态或所有学生
					if (stuState == this['state'] || stuState == '') {
						info = `<tr>
											<td>` + this['id'] + `</td>
											<td>` + this['name'] + `</td>
											<td>` + this['sex'] + `</td>
											<td>` + this['major'] + `</td>
											<td>` + this['classId'] + `</td>
											<td>` + this['phone'] + `</td>
											<td>` + this['state'] + `</td>
											<td>` + this['tutorId'] + `</td>
										</tr>`;
					}
					$("#stuTable").append(info);
					getTutorState(this['state'], this['tutorId']); //从学生表中的state和tutorId得到导师状态
				});
			}
		});
	}

	//将不同状态的导师存入不同的数组中,并将该数组去重
	function getTutorState(state, tutorId) {
		if (state == '待定') {
			var flag = true;
			for (var i = 0; i < waitChoose.length; i++) {
				if (waitChoose[i] == tutorId) {
					flag = false; //已在数组中
				}
			}
			//保证数组中的元素不重复
			if (flag) waitChoose.push(tutorId);
		}
		if (state == '选定') {
			var flag = true;
			for (var i = 0; i < choosed.length; i++) {
				if (choosed[i] == tutorId) {
					flag = false;
				}
			}
			if (flag) choosed.push(tutorId);
		}
	}

	//得到管理员的信息
	function getMyInfo() {
		$.getJSON("../php/managerInfo.php", function (json) {
			if (json.manager.length > 0) {
				$.each(json.manager, function () {
					if (managerId = this['id']) {
						$("#managerId").append(this['id']);
						$("#managerName").append(this['name']);
						$('#photo').attr('src', '../headshots/' + this['photo']);
						$('#photoId').attr('value', this['id']);
						
						$('#logout span').append(this['name']);
					}
				});
			}
		});
	}

	//根据不同的状态获取导师信息
	function getDBTeachers(state) {
		var info = '';
		$("#tutorTable").empty();
		$.getJSON("../php/teacherInfo.php", function (json) {
			if (json.teacher.length > 0) {
				$.each(json.teacher, function () {
					info = `<tr>
										<td>` + this['id'] + `</td>
										<td>` + this['name'] + `</td>
										<td>` + this['sex'] + `</td>
										<td>` + this['position'] + `</td>
										<td>` + this['direction'] + `</td>
										<td>` + this['phone'] + `</td>
									</tr>`;
					if (state == 0) {
						$("#tutorTable").append(info);
					} else if (state == 1) {
						if (choosed.indexOf(this['id']) == -1) {
							$("#tutorTable").append(info);
						}
					} else if (state == 2) {
						if (waitChoose.indexOf(this['id']) != -1) {
							$("#tutorTable").append(info);
						}
					} else {
						if (choosed.indexOf(this['id']) != -1) {
							$("#tutorTable").append(info);
						}
					}
				})
			}
		})
	}
})