<?php
include_once('OAuth.php');
$token = $params = NULL;
$consumer_key = 'ynuTaKF/PwvEgW9bKk3jcUDZXVAefXBP';
$consumer_secret = '5q6HY2UyYk/pw6EZ+k9EqTg500o=';
// $consumer_key = 'bJnFASnki5qW6+CGQAvXdor1Yqr1hITL';
// $consumer_secret = 'uhyNIb87MLdCO0LB3VsuWwaDKrc=';
$signature_method = new OAuthSignatureMethod_HMAC_SHA1();
$iframelink = 'https://demo.pesapal.com/API/PostPesapalDirectOrderV4';
?>