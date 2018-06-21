$(document).ready(function () {
	var stuId;
	//获取用户id
	$.ajax({
		type: "GET",
		url: "../php/getID.php",
		success: function (data) {
			stuId = data;
		}
	});
	var teaDir = ""; //导师研究方向
	var teacher = ""; //导师姓名
	var flag = false; //搜索时默认为没找到老师
	var character = 'students';
	var tutorId = '';
	getDBTeachers();
	getDBStudents();

	//选择导师研究方向
	$("#tutorDirection").change(function () {
		$("#tutorTable > div").remove(); //保证"未找到导师的提示"删除
		teaDir = $(this).children("option:selected").val();
		getDBTeachers();
	})

	//搜索导师
	$("#searchTutor").click(function () {
		flag = false;
		$("#tutorTable > div").remove(); //保证"未找到导师的提示"删除
		teacher = $("#tutorName").val(); //得到搜索的导师名
		if (teacher) {
			getDBTeachers();
		} else {
			//未输入就提交
			alert('请输入你要查找的老师!');
		}
		//输入框置空
		$("#tutorName").val('');
		return false;
	})

	//获取对应的导师信息(按研究分类,查找)
	function getDBTeachers() {
		$.getJSON("../php/teacherInfo.php", function (json) {
			$("#tutorTableInfo").empty();
			if (json.teacher.length > 0) {
				$.each(json.teacher, function () {
					var info = '';
					//如果没搜索导师
					if (teacher == '') {
						//根据下拉菜单的选项添加相应导师
						flag = true; //该条件下一定有导师
						if (teaDir == this['direction'] || teaDir == '') {
							info = `<tr>
												<td>` + this['id'] + `</td>
												<td>` + this['name'] + `</td>
												<td>` + this['sex'] + `</td>
												<td>` + this['position'] + `</td>
												<td>` + this['direction'] + `</td>
												<td>` + this['phone'] + `</td>
												<td>` + this['maxNum'] + `</td>
												<td>` + this['choosedNum'] + `</td>
												<td><a href="#">选为导师</a><td>
											</tr>`;
						}
					} else {
						//搜索导师
						if (teacher == this['name']) {
							flag = true; //找到导师
							info = `<tr>
												<td>` + this['id'] + `</td>
												<td>` + this['name'] + `</td>
												<td>` + this['sex'] + `</td>
												<td>` + this['position'] + `</td>
												<td>` + this['direction'] + `</td>
												<td>` + this['phone'] + `</td>
												<td>` + this['maxNum'] + `</td>
												<td>` + this['choosedNum'] + `</td>
												<td><a href="#">选为导师</a><td>
											</tr>`;
						}
					}
					$('#tutorTableInfo').append(info);
				});
				$("td a").click(function() {
					var teaId = $(this).parent().parent().find('td').eq(0).html();
					var maxNum = $(this).parent().parent().find('td').eq(6).html();
					var choosedNum = $(this).parent().parent().find('td').eq(7).html();
					$.ajax({
						type: "GET",
						url: "../php/chooseTutor.php",
						data: {
							stuId: stuId,
							teaId: teaId,
							maxNum: maxNum,
							choosedNum: choosedNum
						},
						success: function(data) {
							alert(data);
						}
					})
				})
				if (!flag) $('#tutorTable').append("<div class='alert alert-warning'>未找到该老师</div>");
				//搜索的老师名置空
				teacher = "";
			}
		});
	}

	function getDBStudents() {
		$.getJSON("../php/studentInfo.php", function (json) {
			if (json.student.length > 0) {
				$.each(json.student, function () {
					//找到自己的信息
					if (this['id'] == stuId) {
						$('#stuId').append(this['id']);
						$('#stuName').append(this['name']);
						$('#sex').append(this['sex']);
						$('#major').append(this['major']);
						$('#classId').append(this['classId']);
						$('#phone').append(this['phone']);
						$('#state').append(this['state']);

						$('#photo').attr('src', '../headshots/' + this['photo']);
						$('#photoId').attr('value', this['id']);
						$('#logout span').append(this['name']);

						//显示消息中心以及我的导师页的提示
						if (this['state'] == '未选') {
							$('#mytutor dl').append("<div class='alert alert-warning'>" + this['name'] + "同学,你还未选取任何导师,请尽快选择!</div>");
							$("#sysMessage").append("<div class='alert alert-warning'>" + this['name'] + "同学,你还未选取任何导师,请尽快选择!</div>")
							notask();
						} else {
							//待定或选定
							showTutorInfo(this['tutorId'], this['name'], this['state']);
							if (this['state'] == '选定') {
								showTaskMessage(this['tutorId']);
							} else {
								//没有选定导师就没有任务
								notask();
							}
						}
					}
				});
			}
		});
	}

	//我的导师信息
	function showTutorInfo(id, name, state) {
		$.getJSON("../php/teacherInfo.php", function (json) {
			if (json.teacher.length > 0) {
				$.each(json.teacher, function () {
					if (id == this['id']) {
						if (state == '待定') {
							$("#sysMessage").append("<div class='alert alert-info'>" + name + "同学,你的导师选择结果已提交,请等待导师确认</div>");
							$("#mytutor > h4 > strong").append('待定导师');
						} else {
							$("#sysMessage").append("<div class='alert alert-success'>" + name + "同学,你已完成导师选择,你的导师是" + this['name'] + "</div>");
							$("#mytutor > h4 > strong").append('选定导师');
						}
						var tutor = `
													<dt>工号:</dt>
													<dd>` + this['id'] + `</dd>
													<dt>姓名:</dt>
													<dd>` + this['name'] + `</dd>
													<dt>性别:</dt>
													<dd>` + this['sex'] + `</dd>
													<dt>职位:</dt>
													<dd>` + this['position'] + `</dd>
													<dt>研究方向:</dt>
													<dd>` + this['direction'] + `</dd>
													<dt>联系方式:</dt>
													<dd>` + this['phone'] + `</dd>
												`;
						$('#mytutor dl').append(tutor);
						var tutorPhoto = '../headshots/' + this['photo'];
						$('#tutorImg').attr('src', tutorPhoto);
					}
				});
			}
		});
	}

	//显示学生任务
	function showTaskMessage(tutorId) {
		var hasTask = false;//默认无任务
		$.getJSON("../php/taskInfo.php", function (json) {
			if (json.task.length > 0) {
				$.each(json.task, function () {
					if(this['tutorId'] == tutorId) {
						hasTask = true;
						var taskInfo = `<tr>
															<td>` + this['taskName'] + `</td>
															<td>` + this['startTime'] + `</td>
															<td>` + this['deadline'] + `</td>
															<td style="display:none">` + this['taskDetail'] + `</td>
															<td><a href="#" class="showDetail" data-toggle="modal" data-target="#myModal">查看详情</a><td>
														</tr>`;
						$("#taskTable").append(taskInfo);
						$("td > a.showDetail").click(function() {
							//从表格中获取任务详情
							var ctx = $(this).parent().parent().find("td").eq(3).html();
							//绑定到模态框的内容中
							$("#myModalContent").html(ctx);
						})
					}
				})
				//若没有任务
				if (!hasTask) {
					$("#taskTable").parent().parent().append("<div class='alert alert-warning'>你的导师暂未布置任务!</div>")
				}
			}
		})
	}
	function notask() {
		$("#taskTable").parent().parent().append("<div class='alert alert-warning'>你还没有已选定的导师呢,没有任务!</div>")
	}
});
