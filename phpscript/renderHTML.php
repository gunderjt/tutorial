<?php
//This php script is called by the ajax function in tutorial.js, the output of
// this script (ie 'echo html;' at line ~75) is the return value set back to the 
//client.

//this function is simply a mysql call to the database to get the individual rows
//of a substep.  
function get_subSteps($row, $con){
    return $subResult = mysqli_query($con,"SELECT * FROM substeps 
        WHERE Step_ID=" . $row['PID'] . " ORDER BY SubNum");

}
//initializing variables HTML output
$html = "";
//the ajax call allowed us to send in data to this script via POST.  We are taking
//that variable and storing it in a local variable callsed $os
$os = $_POST['osType'];
//connect to the mysql database 'relDatTest', store connection in $con
$con=mysqli_connect('127.0.0.1','gunderjt','P@$$word1234', 'relDatTest');
// Check connection
if (mysqli_connect_errno()){
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
}
    
//call to our first table 'tutorials' to get the unique ID (PID) of the tutorial
// we want.  The return value of mysqli_query is mysqli_result 
//(http://www.php.net/manual/en/class.mysqli-result.php)
//note: this isn't the final product, I only have one tutorial so I'm taking that
//for granted and just using the first row.  As I add more tutorials I am going
//to have to change this around
$result = mysqli_query($con,"SELECT * FROM tutorials");
//turn mysqli_result into an array called 'row'
$row = mysqli_fetch_array($result);

//pull out information from the row array and store it into local variables for
//future use.
//$tutorial_HTML_ID = "mapP"
$tutorial_ID = $row['PID'];
$tutorial_HTML_ID = $row['htmlID'];

//call our second table 'os' where we will get the operating systems that are
//associated with our tutorial_ID
$result = mysqli_query($con,"SELECT * FROM os WHERE tutorial_id=" . $tutorial_ID);
//Parse through os looking for os that matches the button press in the HTML doc
while($row = mysqli_fetch_array($result)){
    if ($row['htmlID_os'] == $os){
        $os_ID = $row['PID'];
        //$os_HTML_ID = 7/8/mac/etc;
        $os_HTML_ID = $row['htmlID_os'];
        break;
    }
}

//the page id is the unique identifier for the page. An example of its format is
//"mapP_7".  Since I use this several times I just store it in it's own variable
$pageID = $tutorial_HTML_ID ."_" . $os_HTML_ID;



///-----Here is where we start creating the HTML to be returned ---------------
//Create the page <div>
$html .= "<div id=\"". $pageID . "\" class=\"instructions\">";


////Create the steps here
//get the steps associated with the operating systems unique identifier ($os_ID)
$result = mysqli_query($con,"SELECT * FROM step WHERE os_id=" . $os_ID . " ORDER BY StepNum");
//figure out how many 'steps' (rows in the table) there are because we are going
//to change our navigation layout if we are at the last step (It won't have a NEXT
//button)
$num_of_rows = mysqli_num_rows ($result);
$i = 1;
while($row = mysqli_fetch_array($result)){
    //Each row contains the info to a specific step
    $html .= "<div id=\"step". $row['StepNum'] . "_". $os_HTML_ID ."\" class=\"step\">";
    //Create the image tutorial div
    $html .= "<div class=\"tutImage\">";
    $html .= "<a href=\"". $row['ImageLoc'] ."\" data-lightbox=\"". $pageID ."\" title=\"Step ". $row['StepNum'] ." image\"> ";
    $html .= "<img src=\"". $row['ImageLocSmall'] . "\" >";
    $html .= "</a><p>Click image to view larger version</p></div>";
    //end of image tutorial div
    //Get the subSteps
    $subResult = get_subSteps($row, $con);
    //Create the tutorial description div
    $html .= "<div class=\"tutDesc\">";
    $html .= "<h1>Step ". $row['StepNum'] ."</h1>";
    while($subRow = mysqli_fetch_array($subResult)){
        $html .= "<p><em>(". $subRow['SubNum'] . ".)</em>". $subRow['Desc'] ."</p>";
    }
    $html .= "</div>";
    //end of the tutorial description div
    //create the navigation div
    $html .= "<div class=\"nav\">";
    if ($i != 1){
        //create the PREV button (as long as it isn't step 1)
        $html .= "<a href=\"#step". ($i - 1) . "_". $os_HTML_ID  ."\" class=\"btn\">PREVIOUS</a>";
    }
    if ($i != $num_of_rows){
        //create the NEXT button (as long as it isn't the last step)
        $html .= "<a href=\"#step". ($i + 1) . "_". $os_HTML_ID  ."\" class=\"btn\">NEXT</a>";
    }
    $i++;
    //end of the navication div and final step div
    $html .= "</div></div>";
   
}
//end of page div
$html .= "</div>";

//echo (return) the html that has been created
echo $html;
//close the connection to the server, to prevent memory leaks.
mysqli_close($con);
?>
