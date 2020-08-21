<?php
  require 'connect.php';
  
 $userRecords= []; 
 $sql = "SELECT * FROM userdata";
 
 if($result = mysqli_query($con, $sql)){
	 $cr = 0;
	 while($row = mysqli_fetch_assoc($result)){
		 $userRecords[$cr]['Name'] = $row['Name'];
		 $userRecords[$cr]['Age'] = $row['Age'];
		 $userRecords[$cr]['Gender']	= $row['Gender'];
		 $userRecords[$cr]['Email'] = $row['Email'];
		 $cr++;
	 }
	 
	 echo json_encode($userRecords); 
 }	else {
	 http_response_code(404);
 }
 
?>