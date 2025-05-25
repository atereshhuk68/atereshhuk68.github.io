<?php
$response = array();

$inputs = array(
	'userName'       => '',
	'userPhone'      => '',
	'userEmail'      => '',
	'userMessage'    => '',
);

/**
 * Sanitizes input data by trimming whitespace and removing backslashes.
 *
 * @param mixed $data The input data to sanitize. It's expected to be a string,
 *                    but the function will attempt to process other types as well.
 * @return mixed The sanitized data. Returns the processed data after trimming
 *               whitespace from the beginning and end, and removing backslashes.
 */
function sanitize_input( $data ) {
	$data = trim( $data );
	$data = stripslashes( $data );
	$data = htmlspecialchars( $data, ENT_QUOTES, 'UTF-8' );

	return $data;
}

/**
 * Checks if a specific field exists and is not empty in the $_POST superglobal.
 *
 * @param string $field_name The name of the field to check.
 * @return bool True if the field exists and is not empty, false otherwise.
 */
function field_exist_and_not_empty( $field_name ) {
	return isset( $_POST[ $field_name ] ) && ! empty( $_POST[ $field_name ] );
}

function is_email( $email ) {
	$pattern = '/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/';
	return filter_var($email, FILTER_VALIDATE_EMAIL) && preg_match($pattern, $email);
}

/**
 * Checks if a string contains only digits.
 *
 * @param string $phone_number The string to check.
 * @return bool True if the string contains only digits, false otherwise.
 */
function is_phone_number( $phone_number ) {
	// Allows an optional plus sign at the beginning, followed by one or more digits.
	$pattern = '/^\+?\d+$/';
	return preg_match( $pattern, $phone_number );
}

/**
 * Validates the form submission data from the $_POST.
 *
 * @return bool True if validation passes for all checked fields, false otherwise.
 */
function contact_form_validation() {
	global $response, $inputs;

	$is_valid = false;

	if ( field_exist_and_not_empty( 'userName' ) ) {
		$inputs['userName'] = sanitize_input( $_POST['userName'] );
	}

	if ( field_exist_and_not_empty( 'userPhone' ) ) {
		if ( is_phone_number( $_POST['userPhone'] ) ) {
			$inputs['userPhone'] = sanitize_input( $_POST['userPhone'] );
		} else {
			array_push( $response, array( 'userPhone' => 'Invalid phone number format' ) );
		}
	}

	if ( field_exist_and_not_empty( 'userEmail' ) ) {
		if ( is_email( $_POST['userEmail'] ) ) {
			$inputs['userEmail'] = sanitize_input( $_POST['userEmail'] );
		} else {
			array_push( $response, array( 'userEmail' => 'Invalid email format' ) );
		}
	}

	if ( field_exist_and_not_empty( 'userMessage' ) ) {
		$inputs['userMessage'] = sanitize_input( $_POST['userMessage'] );
	}

	if ( empty( $response ) ) {
		$is_valid = true;
	}

	return $is_valid;
}

/**
 * Prepares the HTML body for the contact form email.
 *
 * Uses the global variable `$inputs` to populate
 * placeholders for username, email, and message within an HTML template string.
 *
 * @global array $inputs An array containing the submitted form data.
 *                                       Expected keys: 'userName', 'userEmail', 'userMessage'.
 *
 * @return string The formatted HTML email body.
 */
function prepare_mail_body() {
	global $inputs;

	$mail_body = str_replace( '%username%', $inputs['userName'], '<b>User</b>: %username% <br> ' );

	$mail_body .= str_replace( '%useremail%', $inputs['userEmail'], '<b>Email</b>: %useremail% <br> ' );

	$mail_body .= str_replace( '%userphone%', $inputs['userPhone'], '<b>Phone number</b>: %userphone% <br> ' );

	$mail_body .= '<hr>';

	$mail_body .= str_replace( '%usermessage%', $inputs['userMessage'], '<b>Message</b>: %usermessage%' );

	return $mail_body;
}

/**
 * Sends a JSON success response.
 * Sets the content type header, encodes the data, echoes it, and exits.
 *
 * @param mixed $data The data to include in the JSON response.
 * @param int $status_code Optional HTTP status code (e.g., 400, 500). Default is 200.
 */
function json_success( $data = null, $status_code = 200 ) {
	header( 'Content-Type: application/json' );
	http_response_code($status_code);
	echo json_encode( array( 'success' => true ) );
	exit;
}

/**
 * Sends a JSON error response.
 * Sets the content type header, encodes the error message/data, echoes it, and exits.
 * Optionally sets an HTTP error status code.
 *
 * @param mixed $data The error data/message to include in the JSON response.
 * @param int $status_code Optional HTTP status code (e.g., 400, 500). Default is 200.
 */
function json_error( $data = null, $status_code = 400 ) {
	header( 'Content-Type: application/json' );
	http_response_code($status_code);
	echo json_encode( array( 'success' => false, 'errors' => $data ) );
	exit;
}

/**
 * Sends an email using an external notification service via cURL.
 */
function send_email() {
	global $response, $inputs;

	$to = 'kontakt@bfancy.pl';
	$subject = 'BFancy| Contact Us | From ' . $inputs['userName'];
	$message = prepare_mail_body();

	$headers = "MIME-Version: 1.0" . "\r\n";
	$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
	$headers .= 'From: <' . $inputs['userEmail'] . '>' . "\r\n";

	if ( mail( $to, $subject, $message, $headers ) ) {
		json_success( array('status' => 'Email sent successfully') );
	} else {
		json_error( array( 'mail_error' => 'Server failed to send email. Please try again later.' ) );
	}
}

/**
 * This function will be called when the AJAX action 'handle_request_form' is triggered.
 */
function handle_contact_form_callback() {
	global $response;

	$is_valid  = contact_form_validation();

	if ( ! $is_valid ) {
		json_error( array( 'mail_error' => 'Validation failed. Check fields and try again.' ) );
	}

	send_email();
}

handle_contact_form_callback();