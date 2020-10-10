<?php
include_once('./../../app_engine/side_processes/checkout.settings.php');
$statusrequestAPI = 'http://demo.pesapal.com/api/querypaymentstatus'; //change to      
//https://www.pesapal.com/api/querypaymentstatus' when you are ready to go live!

// Parameters sent to you by PesaPal IPN
$pesapalNotification = $_GET['pesapal_notification_type'];
$pesapalTrackingId = $_GET['pesapal_transaction_tracking_id'];
$request['uuid'] = $_COOKIE['authId'];
$request['transaction_tracker'] = $pesapalTrackingId;
$pesapal_merchant_reference = $_GET['pesapal_merchant_reference'];
$request['merchant_reference'] = $pesapal_merchant_reference;
$signature_method = new OAuthSignatureMethod_HMAC_SHA1();

if ($pesapalNotification == "CHANGE" && $pesapalTrackingId != '') {
   $token = $params = NULL;
   $consumer = new OAuthConsumer($consumer_key, $consumer_secret);

   //get transaction status
   $request_status = OAuthRequest::from_consumer_and_token($consumer, $token, "GET", $statusrequestAPI, $params);
   $request_status->set_parameter("pesapal_merchant_reference", $pesapal_merchant_reference);
   $request_status->set_parameter("pesapal_transaction_tracking_id", $pesapalTrackingId);
   $request_status->sign_request($signature_method, $consumer, $token);

   $ch = curl_init();
   curl_setopt($ch, CURLOPT_URL, $request_status);
   curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
   curl_setopt($ch, CURLOPT_HEADER, 1);
   curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
   // if (defined('CURL_PROXY_REQUIRED')) if (CURL_PROXY_REQUIRED == 'True') {
   //    $proxy_tunnel_flag = (defined('CURL_PROXY_TUNNEL_FLAG') && strtoupper(CURL_PROXY_TUNNEL_FLAG) == 'FALSE') ? false : true;
   //    curl_setopt($ch, CURLOPT_HTTPPROXYTUNNEL, $proxy_tunnel_flag);
   //    curl_setopt($ch, CURLOPT_PROXYTYPE, CURLPROXY_HTTP);
   //    curl_setopt($ch, CURLOPT_PROXY, CURL_PROXY_SERVER_DETAILS);
   // }

   $response = curl_exec($ch);

   $header_size = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
   $raw_header  = substr($response, 0, $header_size - 4);
   $headerArray = explode("\r\n\r\n", $raw_header);
   $header      = $headerArray[count($headerArray) - 1];

   //transaction status
   $elements = preg_split("/=/", substr($response, $header_size));
   $status = $elements[1];

   curl_close($ch);

   if (updateDb(json_encode($request))) {
      $resp = "pesapal_notification_type=$pesapalNotification&pesapal_transaction_tracking_id=$pesapalTrackingId&pesapal_merchant_reference=$pesapal_merchant_reference";
      ob_start();
      echo $resp;
      ob_flush();
      exit;
   }
}

function updateDb($data = false)
{
   $curl = curl_init();
   $token = $_COOKIE['authToken'];
   curl_setopt($curl, CURLOPT_CUSTOMREQUEST, 'PATCH');
   curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
   curl_setopt($curl, CURLOPT_URL, 'https://api.live:1443/orders/');
   curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
   curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
   curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
   curl_setopt($curl, CURLOPT_HEADER, true);
   curl_setopt($curl, CURLOPT_HTTPHEADER, array(
      'Accept: application/json',
      'Content-Type: application/json',
      'Authorization: Bearer ' . $token
   ));
   $result = curl_exec($curl);

   $header_size = curl_getinfo($curl, CURLINFO_HEADER_SIZE);
   $raw_header  = substr($result, 0, $header_size - 4);
   $headerArray = explode("\r\n\r\n", $raw_header);
   $header      = $headerArray[count($headerArray) - 1];

   //transaction status
   $elements = json_decode(preg_split("/=/", substr($result, $header_size))[0]);
   if ($elements !== NULL) {
      $status = $elements->status;
      if ($status == 400) {
         return true;
      } else if (stripos(print_r(curl_error($curl), true), 'refused') !== false) {
         var_dump(parse_str($result));
         return false;
      } else {
         return true;
      }
   } else {
      echo '<script>if(confirm("Is your computer connected to the internet")){
         setTimeout(_=>{
         window.location.reload()}, 5000)
      } else {
         alert("Please check your internet connection")
      }
      </script>';
      return false;
   }
}
