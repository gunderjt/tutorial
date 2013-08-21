//This function is called everytime an element with class="showContent" is clicked
function showContentfunc(os){

//ajax is the defacto protocol for communicating between server and client without
//having to reload the web page.  This is the jQuery syntax for ajax
//The first parameter is the url that ajax will envoke, the second parameter is a JSON
//for the options.
    $.ajax('phpscript/renderHTML.php', {
        //type: is the type of HTML request being made to the server
        type: "POST",
        //data: is a JSON object that is being sent to the server.  'osType' is
        //the key and 'os' is equal to whatever was passed as a parameter of
        //'showContentfunc().  (this is either "mac" "7" or "8")
        data: {osType: os},
        //success: defines the function that is called if our ajax call is successful.
        //It takes the response from the server and puts it into
        //the info_container div 
        success: function(response) {
            $("#info_container").html(response).fadeIn();	
        },
        //error: defines the function that is called if our ajax call fails
        error: function(request, error, errorText) {
            $("#info_container").html("<p>There was an error getting this tutorial.  Error: " + error +", Error Message "+ errorText +"</p>");
        },
        //timeout: is the time (in ms) that our ajax call will wait before it calls the
        //error function with error "timeout"
        timeout: 3000
    });
    
    //sets the state of the program so that the program knows that images are on.
    getNsetState(0);
    
}

//this function animates the page when one hides/unhides the screenshot images
//it is called when one clickes the id='Hshot' element.
function animateTut(){
    //first we want to see if the images are showing (ie getNsetstate.state == 0)
    //if they are then we want to animate the image div so that it hides and goes
    //away.  If the image div isn't showing (getNsetstate.state == 1) then we want 
    //to reverse the process
	if(getNsetState() == 0){
            //getNset says images are on, so animate the image div ('tutImage')
            //so that they disappear and change getNset to off
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
            //getNset says images are off, so animate the image div ('tutImage')
            //so that they appear.
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
    //getNsetState() is a function that I use for metadata purposes. Mainly,
    //I want the whole application to know if the images are being shown or not
    //if they are then getNsetState.state is = 0, if they are not then
    //getNsetState.state is = 1.  Knowing if the images are shown or not is
    //important for the animation purposes.  Call this function
    //with a parameter to set the state or without a parameter to inquire about
    //the state

    //initialize the state of the program (not necessary but a good practice)
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
    //$document.ready() is only called when the page is finished loading
    //this is important because if we try to manipulate elements on the page
    //such as $(".showContent") before the element actually
    //has been rendered then it will fail.  So everything has to be
    //rendered before we can begin to manipulate it
  
    //This function is called an event handler.  In plain english it means every
    //time an element with the class attribute of "showContent" is "click"ed we 
    //run the function(), which itself calls the function "showContentfunc".
    $(".showContent").on('click', function () {	
    //$(this).data('os') is being passed into "showContentfunc" as a parameter.
    //$(this) refers to the element that was clicked.  If we clicked on the "Mac"
    //button, $(this) would refer to that button alone, if we clicked on the
    //"Windows 7" button then $(this) refers to that button.  data('os') is a 
    //jQuery function call that says find the data attribute of 'os' and return
    //that value.  In our HTML we had "data-os="mac/7/8"" inside the buttons
    //elements.  So $(this).data('os'), essentially finds the string that was
    //stored in the html under the 'data-os' attribute for the element that was clicked
    //and returns that string (eg. "mac" "7" "8")
        showContentfunc($(this).data('os'));
    });
    
    //this is another event handler.  Everytime the element with the id="Hshot"
    //is clicked, then the function animateTut is executed
    $("#Hshot").on('click', animateTut);
    
    //localscroll uses the javascript plugin for smooth scrolling.  lazy: "true"
    //essentially means that 'smooth scrolling' will still happen for links that
    //haven't been rendered yet....like the links ("NEXT" "PREVIOUS") in our tutorial.
    $.localScroll({
        lazy: "true"
    });
});