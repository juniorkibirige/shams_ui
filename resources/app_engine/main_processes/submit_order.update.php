<?php
include_once('./database_connection.php');
include_once('./../side_processes/sendMail.php');
$resp = array();
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(403);
    $resp['status'] = 403;
    $resp['error'] = 'Direct Script Access not granted!';
} else {
    http_response_code(201);
    header('Content-Type: json');
    $r = $_POST['ref'];
    $p = $_POST['pid'];
    $ai = $_POST['addinfo'];
    $a = $_POST['amt'];
    $d = $_POST['desc'];
    $n = $_POST['names'];
    $t = $_POST['tel'];
    $b = $_POST['bt'];
    $id = $_POST['oid'];
    $tt = $_POST['tt'];
    $uid = $_COOKIE['authId'];
    $destination = json_decode($_COOKIE['location_data']);
    $ed = explode(',', $d);
    if($p == '6') {
        // Cash on Delivery
        processCOD($a, $ed, $n, $ai, $t, $destination->destination_addresses[0], 'COD');
        if(count($error) > 0){
            if($error[0] != ''){
                $msg = json_decode($error[0]);
                var_dump($msg);
            }
        }
        die();
        $init = 'insert into orders (id, uuid, trans_track, merch_ref, order_status, description, addinfo, amt, names, tel, type) values("' . $id . '","' . $uid . '", "' . $tt . '", "' . $r . '", "NULL", "' . $d . '", "' . $ai . '", ' . $a . ', "' . $n . '", "' . $t . '", "Cash on Delivery")';
        $init = mysqli_query($con, $init);
        if (!$init) {
            http_response_code(500);
            $resp['status'] = 500;
            $resp['error'] = mysqli_error($con);
        } else {
            $resp['status'] = 201;
            $resp['prt'] = $tt;
            $resp['mr'] = $r;
        }
    } else {
        http_response_code(505);
        processCOD($a, $ed, $n, $ai, $t, $destination->destination_addresses[0], 'PO');
        die();
        $init = 'insert into orders (id, uuid, trans_track, merch_ref, order_status, description, addinfo, amt, names, tel, type) values("' . $id . '","' . $uid . '", "' . $tt . '", "' . $r . '", "NULL", "' . $d . '", "' . $ai . '", ' . $a . ', "' . $n . '", "' . $t . '", "Phone Ordering")';
        $init = mysqli_query($con, $init);
        if (!$init) {
            http_response_code(500);
            $resp['status'] = 500;
            $resp['error'] = mysqli_error($con);
        } else {
            $resp['status'] = 201;
            $resp['prt'] = $tt;
            $resp['mr'] = $r;
        }
    }
}
echo json_encode($resp);
$error = array();
function processCOD(int $a, $d, String $n, String $i, String $t, String $dest, String $type){
    global $error;
    $error[] = sendMail($a, $d, $n, $i, $t, $dest);
    $error[] = sendSMS('+256751379687', '+256786730164', implode(',',$d), $dest);
    return $error;
}

function sendSMS($t1, $t2, $data, $dest){
    return;
}