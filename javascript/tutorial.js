function showContent(url){
	$.ajax(url, {
		success: function(response) {
			$("#info_container").html(response).fadeIn();	
		},
		error: function(request, error, errorText) {
			$("#info_container").html("<p>There was an error getting this tutorial.  Error: " + error +", Error Message "+ errorText +"</p>");
		},
		timeout: 3000
	});
}
$(document).ready( function() {
	$(".showContent").on('click', function () {	
		showContent($(this).data('url'));
	});
	$("#Hshot").on('click', function() {
		$(".tutImage").fadeToggle(600);
	});
});