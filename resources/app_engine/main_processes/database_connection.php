<?php
    include_once('/var/www/shopping.live/resources/app_engine/side_processes/database_settings.php');
    $con = mysqli_connect($host, $user, $passwd);
    if(!$con) {
        echo 'Error: '.mysqli_error($con);
    } else {
        $db = mysqli_select_db($con, $database);
    }
