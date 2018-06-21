// 上传头像
$("#photoForm").submit(function(event){
	event.preventDefault();
	var form = $(this);
	var formData = new FormData(document.getElementById("photoForm"));
	$.ajax({
		type: form.attr('method'),
		url: form.attr('action'),
		data: formData,
		contentType: false,
		processData: false,
		mimeType: "multipart/form-data",
		success:function (data) {
			if (data.indexOf('success') == 0) {
				alert("头像上传成功!");
				$('#photo').attr('src', data.split('success')[1]);
			} else {
				alert(data);
			}
		}
	})
})