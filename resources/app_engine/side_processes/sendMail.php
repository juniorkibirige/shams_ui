<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';
header('Content-Type: json');

$response = array();
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(403);
?>
<?php
    $response['status'] = 403;
    $response['err'] = 'Direct Script Access Denied!';
    die(json_encode($response));
}
function sendMail($a, $data, $n, $i, $tel, $dest)
{
    $dtel = '256' . substr($tel, 1, 9);
    if ($data != null) {
        $nohtml = "Order Details for {$n} located in {$dest} contact them on {$tel} Cost of Order is Ush. $a \r\nOrder Items:\r\n".implode(',', $data)."
        ";
        $html = "<style>
        body {
            background-color: grey;
        }
        .main-mail-body {
            justify-content: center;
            padding: 2em;
        }
        .mail-logo {
            background-color: whitesmoke;
        }
        .mail-logo-text {
            display: flex;
            flex-wrap: wrap;
            padding: 1.5rem;
            font-size: 2rem;
            text-align: center;
            color: green;
        }
        .mail-logo>img {
            // float: left;
            align-self: center;
            padding: 0 26%;
            padding-top: 1.5rem;
        }
        .mail-body {
            background-color: blanchedalmond;
            padding: 1.5rem 0.5rem;
            text-align: center;
            justify-content: space-around;

        }
        .mail-body__body {
            padding: 0.5rem 2rem;
        }
        .mail-body__body-contents {
            justify-content: center;
            text-align: center;
            align-self: center;
            border-collapse: collapse;
            width: 100%;
        }
        thead{
            border-width: thin;
            border-style:solid;
            border-color: blue;
        }
        th{
            padding: 0.25rem;
        }
        tbody tr:first-child{
            border-top: 3px solid black;
            border-left: 1px solid blue;
            border-right: 1px solid blue;
        }
        tbody tr:last-child{
            border-left: 1px solid blue;
            border-right: 1px solid blue;
            border-bottom: 1px solid blue;
        }
        tbody tr:not(:first-child){
            border-top: 1px solid green;
            border-left: 1px solid blue;
            border-right: 1px solid blue;
        }
        thead th:not(:last-child), td:not(:last-child){
            border-right: 1px solid black;
        }
        .mail-body__title {
            text-align: center;
        }
        .mail-body__footer {
            margin: .75rem 0rem;
            border-top: 2px solid grey;
            padding: .75rem;
        }
    </style>
    <div class='row'>
        <div class='col'>
            <div class='main-mail-body'>
                <div class='mail-logo'>
                    <img src='cid:logo' alt='Shams Errand and Grocery Services' style='width: 9rem; height: 7rem'>
                    <div class='mail-logo-text'>Shams Errand and Grocery Services</div>
                </div>
                <div class='mail-body'>
                    <div class='mail-body__title'>
                    <span style='font-size: 20px'><strong>Here comes another order from your site</strong></span><br/>
                    Please make a call to
                    <br><em><u>{$n}</u></em><br>
                    located in
                    <br><em><u>{$dest}</u></em><br>
                    to confirm the order payable by cash on delivery on
                    <br><a href='tel:+{$dtel}'><em><u>{$tel}</u></em></a></br>
                    Total Cost of the Order is Ush. $a
                    </div>
                    <div class='mail-body__body'>
                        <table class='mail-body__body-contents'>
                            <thead>
                                <tr>
                                    <th>Ind.</th>
                                    <th>Name</th>
                                    <th>Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                            ";
        for ($i = 1; $i <= count($data); $i++) {
            $html .= '<tr>';
            $html .= '<td>' . $i . '</td>';
            $html .= '<td>' . explode('=>', $data[$i - 1])[0] . '</td>';
            $html .= '<td>' . explode('=>', $data[$i - 1])[1] . '</td>';
            $html .= '</tr>';
        }
        $html .= "
        </tbody>
    </table>
    </div>
    <div class='mail-body__footer'>
        Location Details to be provided
        And Unsubscribe Info
    </div>
    </div>
    </div>
    </div>
    </div>";
    }
    $mail = new PHPMailer(true);
    require_once './../main_processes/m.s.ting.cons.php';
    try {
        $mail->SMTPDebug = SMTP::DEBUG_SERVER;
        $mail->isSMTP();
        $mail->SMTPAuth = true;
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port = 465;
        $mail->addEmbeddedImage(__DIR__.'/../../../data/images/mail-logo.jpg', 'logo', 'Shams Errand and Grocery Services');
        $mail->addAddress('lawaang26@gmail.com', 'Shams Errand and Grocery Services');
        $mail->addReplyTo('query@tmsystem.live', 'Query Shams Online Shop');
        $mail->isHTML(true);
        $mail->Subject = 'Order details for ' . $n;
        $mail->Body = $html;
        $mail->AltBody = $nohtml;
        $mail->send();
        $response['status'] = 200;
        $response['msg'] = 'Message has been sent';
        return json_encode($response);
    } catch (Exception $e) {
        http_response_code(404);
        $response['status'] = 404;
        $response['msg'] = "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
        return json_encode($response);
    }
}
