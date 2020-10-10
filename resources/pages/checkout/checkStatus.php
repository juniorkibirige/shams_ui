<?php
 include_once('./../../app_engine/side_processes/checkout.settings.php');
 include_once('xmlhttprequest.php');
 
 function checkStatus($trackingID, $referenceNO){
	
	$token = $params = NULL;
	$statusrequest = 'https://www.pesapal.com/api/querypaymentstatus';
	$signature_method = new OAuthSignatureMethod_HMAC_SHA1();
	$consumer_key = 'lhiP9QWtQQsXWU+G5HdFHEUr41COHMiI';//demo merchant key
 	$consumer_secret = '5k6xJ7E0G5JFgUowlc+13SFEfkY=';//demo merchant secret
				
	$consumer = new OAuthConsumer($consumer_key,$consumer_secret);
		
	//get transaction status
	$request_status = OAuthRequest::from_consumer_and_token($consumer, $token,"GET", $statusrequest, $params);
	$request_status->set_parameter("pesapal_merchant_reference", $referenceNO);
	$request_status->set_parameter("pesapal_transaction_tracking_id",$trackingID);
	$request_status->sign_request($signature_method, $consumer, $token);
	
	
	//curl request
	$ajax_req =  new XMLHttpRequest();
	$ajax_req->open("GET",$request_status);
	$ajax_req->send();
	//if curl request successful
	
	
	if($ajax_req->status == 200){
	$values = array();
	$elements = preg_split("/=/",$ajax_req->responseText);
	$values[$elements[0]] = $elements[1];
	}
	//transaction status
	$status = $values['pesapal_response_data'];
		
	return $status;
}
