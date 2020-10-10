<?php
include_once('./database_connection.php');
$res = [];
$ipp = $_GET['items_per_page'];
$so = $_GET['sort_order'];
$sb = $_GET['sort_by'];
$c = $_GET['currency'];
$l = $_GET['lang'];
$pn = 1;
$p = 1;
if ($_GET['sort_by'] == 'product') {
    $sb = 'pName_' . str_replace('-', '', $l);
} else if ($_GET['sort_by'] == 'price') {
    $sb = 'pPrice_' . $c;
} else {
    $sb = "product_uuid";
}
$init = 'select * from products order by ' . $sb . ' ' . $so . '';
$init = mysqli_query($con, $init);
if (!$init) {
    $res['status'] = 404;
    $res['error'] = 'An error has occured on the server side.\n' . mysqli_error($con);
} else {
    if (mysqli_num_rows($init) > 0) {
        $res['status'] = 200;
        $init_data_num = mysqli_num_rows($init);
        $res['ipp'] = $ipp;
        if (floatval('0.' . (explode('.', $init_data_num / $ipp)[1])) >= 0.5) {
            $res['num_pages'] = round($init_data_num / $ipp);
        } else {
            $res['num_pages'] = round($init_data_num / $ipp) + 1;
        }
        $res['num_products'] = $init_data_num;
        while (($init_data = mysqli_fetch_assoc($init)) != null) {
            if ($init_data == null) break;
            $uuids[$pn] = $init_data['product_uuid'];
            $res['_page' . $p]['_prod' . $pn]['puuid'] = $init_data['product_uuid'];
            $res['_page' . $p]['_prod' . $pn]['name_enGB'] = $init_data['pName_enGB'];
            $res['_page' . $p]['_prod' . $pn]['name_lgUG'] = urlencode($init_data['pName_lgUG']);
            $res['_page' . $p]['_prod' . $pn]['price_USD'] = $init_data['pPrice_USD'];
            $res['_page' . $p]['_prod' . $pn]['price_Ush'] = $init_data['pPrice_Ush'];
            $res['_page' . $p]['_prod' . $pn]['category'] = $init_data['ProdCategory'];
            $res['_page' . $p]['_prod' . $pn]['availability'] = $init_data['pAvail'];
            $res['_page' . $p]['_prod' . $pn]['saleQty'] = $init_data['saleQty'];
            $img = urldecode($init_data['pImg_loc']) . strtolower($init_data['pImg_name']);
            $res['_page' . $p]['_prod' . $pn]['pImg'] = $img;
            $res['_page' . $p]['_prod' . $pn]['alt'] = $init_data['pImg_name'];
            if (($pn % $ipp) == 0) {
                $p += 1;
            }
            $pn += 1;
        }
        $res['_uuids'] = $uuids;
    }
}
echo json_encode($res);