<?php
include_once('./database_connection.php');
$res = [];
if (isset($_GET['pid']) && !empty($_GET['pid'])) {
    $init = 'select * from products where product_uuid = "' . mysqli_real_escape_string($con, $_GET['pid']) . '"';
    $init = mysqli_query($con, $init);
    if (!$init) {
        $res['status'] = 404;
        $res['error'] = 'An error has occured on the server side.\n' . mysqli_error($con);
    } else {
        $init_data = mysqli_fetch_assoc($init);
        $res['puuid'] = $init_data['product_uuid'];
        $res['name_enGB'] = $init_data['pName_enGB'];
        $res['name_lgUG'] = urlencode($init_data['pName_lgUG']);
        $res['price_USD'] = $init_data['pPrice_USD'];
        $res['price_Ush'] = $init_data['pPrice_Ush'];
        $res['category'] = $init_data['ProdCategory'];
        $res['availability'] = $init_data['pAvail'];
        $res['saleQty'] = $init_data['saleQty'];
        $img = urldecode($init_data['pImg_loc']) . strtolower($init_data['pImg_name']);
        $res['pImg'] = $img;
        $res['alt'] = $init_data['pImg_name'];
    }
}
echo json_encode($res);