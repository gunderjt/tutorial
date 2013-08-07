function showContent(url){
	$.ajax(url, {
		success: function(response) {
			$("#info_container").html(response).fadeIn();	
		}
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