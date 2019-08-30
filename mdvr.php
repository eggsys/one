<?php

$user = 'admin'; // ตัวแปร PHP
$pass = 'admin';
$devid = '888888';
$ip = 'tod-office2.ddns.net';

echo '<script type="text/javascript">';
echo "var data = '$user';"; // ส่งค่า $data จาก PHP ไปยังตัวแปร data ของ Javascript
echo "var pass = '$pass';";
echo "";
echo '</script>';


?>

<html>
<head>
 <link rel="stylesheet" href="https://bootswatch.com/4/lux/bootstrap.min.css">
</head>

<body>

    <h1> test </h1>
    <button id="getText" class="btn btn-info"> Get Jsession</button>
    <div id="output"></div>

    <br>




</body>



</html>

<script type="text/javascript">


    document.getElementById('getText').addEventListener('click', getText);

    function getText() {
        fetch('http://tod-office2.ddns.net:8080/StandardApiAction_login.action?account=' + data + '&password=' + pass)
            .then((res) => res.text())
            .then((data) => {
                document.getElementById('output').innerHTML = data;
            })
            .catch((err) => console.log(err))
    }















    
</script>