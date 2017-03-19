<?php
	header('Content-Type: application/json');

	$allowed = ['png', 'jpg', 'svg'];
	$processed = [];

	foreach($_FILES['files']['name'] as $key => $name) {

		if($_FILES['files']['error'][$key] === 0){

			$temp = $_FILES['files']['tmp_name'][$key];

			$ext = strtolower(end(explode('.', $name)));

			$file = uniqid('', true).time().'.'.$ext;

			if(in_array($ext, $allowed) && move_uploaded_file($temp, 'uploads/'.$file)) {

				$processed[] = array (
					'name' => $name,
					'file' => $file,
					'uploaded' => true
 				);

			} else{

				$processed[] = array(
					'name' => $name,
					'uploaded' => false
 				);

			}
		}

	}

	echo json_encode($processed);