$(document).ready( function() {
	$("#Mac").on('click', function() {
		$(".instructions").addClass("hidden");
		$("#mapP_Mac").removeClass("hidden");
	});
	$("#Win7").on('click', function() {
		$(".instructions").addClass("hidden");
		$("#mapP_7").removeClass("hidden");
	});
	$("#Win8").on('click', function() {
		$(".instructions").addClass("hidden");
		$("#mapP_8").removeClass("hidden");
	});
});
