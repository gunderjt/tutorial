<?php
$con=mysqli_connect('127.0.0.1','gunderjt','P@$$word1234', 'tutorialdata');
$result = mysqli_query($con,"SELECT * FROM substeps");
while($row = mysqli_fetch_array($result)){
    echo "Changing row: " . $row['ID'] . " SubNum: " . $row['SubNum'] . " to subOrder: ". $row['subOrder'] ."<br/>";
    $outcome = mysqli_query($con,"UPDATE substeps SET subOrder=" . $row['SubNum']. " WHERE ID=". $row["ID"]);
}
mysqli_close($con);
?>
