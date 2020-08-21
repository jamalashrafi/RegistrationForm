<?php
 require 'connect.php';
 
 $postdata = file_get_contents("php://input");
 
 if(isset($postdata) && !empty($postdata)){
	 $request = json_decode($postdata);
	 
	 $name_l = $request->name;
	 $age_l = $request->age;
	 $gender_l = $request->gender;
	 $email_l = $request->email;
	 
	 	 
	 $sql = "INSERT INTO userdata(
			Name,
			Age,
			Gender,
			Email
			) VALUES
			('{$name_l}',
			'{$age_l}',
			'{$gender_l}',
			'{$email_l}')
			";
			if(mysqli_query($con, $sql)){
				print_r('success');
				http_response_code(201);
			} else {
				print_r('error');
				http_response_code(422);
			}
	 
	 
 }
?>
 
