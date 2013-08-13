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
	getNsetState(0);
}

function animateTut(){
	
	if(getNsetState() == 0){
    	$(".tutImage").animate({
   				opacity: "0",
    			width: "0%",
    			height: "toggle"},
    			{duration: 400, queue: false});
		$(".tutDesc").animate({
				width:"99%"},
				{duration: 400, queue: false});
		$(".nav").toggle();
		$(".tutDesc p, h1").toggleClass("descOnly");
		getNsetState(1);
		}
	else{
    	$(".tutImage").animate({
   				opacity: "1",
    			width: "45%",
    			height: "toggle"},
    			{duration: 400, queue: false});
		$(".tutDesc").animate({
				width:"54%"
				}, {
				duration: 400, 
				queue: false 
				}).promise().done(function(){
					$(".nav").toggle();
					$(".tutDesc p, h1").toggleClass("descOnly");
				});
		getNsetState(0);	
	}
	
}


function getNsetState(value){
	//initialize the state of the program
	if(typeof getNsetState.state == 'undefined'){
		getNsetState.state = 0;
	}
	//test if value was passed in
	if (typeof value == 'undefined'){
		return getNsetState.state;
	}
	else{
		return (getNsetState.state = value);
	}
}

$(document).ready( function() {
	$(".showContent").on('click', function () {	
		showContent($(this).data('url'));
	});
	$("#Hshot").on('click', animateTut);
	$.localScroll({
		lazy: "true"
	});

});