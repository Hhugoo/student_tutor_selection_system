$("#login").submit(function(event){
	event.preventDefault();
	var form = $(this);
  var formData = new FormData(document.getElementById("login"));
	$.ajax({
		type: form.attr('method'),
		url: form.attr('action'),
		data: formData,
		contentType: false,
		processData: false,
		success:function (data) {
      if (data=='students'||data=='teacher'||data=='manager') {
        window.location.href=''+data+'.html';
      } else {
				alert(data);
				location.reload();
      }
		}
	})
})