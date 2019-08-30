<?php
$user = 'admin'; // ตัวแปร PHP
$pass = 'admin';
$devid = '888888';
$ip = 'tod-office2.ddns.net';
echo '<script type="text/javascript">';
echo "var user = '$user';"; // ส่งค่า $data จาก PHP ไปยังตัวแปร data ของ Javascript
echo "var pass = '$pass';";
echo "";
echo '</script>';
?>


<!DOCTYPE html>
<html>

<head>
    <meta charset='utf-8'>
    <meta http-equiv='X-UA-Compatible' content='IE=edge'>
    <title>Page Title</title>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <link rel='stylesheet' type='text/css' media='screen' href='https://bootswatch.com/4/lux/bootstrap.min.css'>
    <!--<script src='main.js'></script> -->
</head>

<body>

    <center>
        <h1> Jsession</h1>
    </center>

    <button id="getText" class="btn btn-info"> Get Test</button>
    <div id="output" class="jumbotron"></div>
    <br>
    <button id="getses" class="btn btn-info"> Get Jsession </button>
    <div id="output2" class="jumbotron"></div>
    <br>
    <button id="getjs" class="btn btn-danger"> Show only Jsession </button>
    <div id="js" class="jumbotron"></div>
    <br>

    <button id="getjs2" class="btn btn-danger"> Show only JsessionX </button>
    <div id="jsx" class="jumbotron"></div>
    <br>

    <center>
        <h2> Dev ID </h2>
    </center>

    <button id="getDevID" class="btn btn-outline-warning"> get Dev</button>
    <div id="outputdev" class="card border-success mb-3" style="max-width: 50rem;"></div>
    <br>

</body>

</html>



<script type="text/javascript">
    //var js = "xtestx"
    //console.log("Js at start ::" + js)
    var js;
    var js2;

    document.getElementById('getText').addEventListener('click', getText);
    document.getElementById('getses').addEventListener('click', getses);
    document.getElementById('getjs').addEventListener('click', getses);
    document.getElementById('getjs2').addEventListener('click', getJsession);
    document.getElementById('getDevID').addEventListener('click', getDevID);






    function getText() {
        fetch('users.json')
            .then((res) => res.text())
            .then((data) => {
                document.getElementById('output').innerHTML = data;
            })
            .catch((err) => console.log(err))
    }

    function getses() {
        fetch('users2.json')
            .then((res) => res.json())
            .then((data) => {
                let output = '<h2>Users</h2>';
                data.forEach(function(user) {
                    output += ` 
                <ul>
                    <li><b>ID:</b> ${user.jsession}</li>
                    <li><b>Name:</b> ${user.account_name}</li>
                    <li>JSESSIONID : ${user.JSESSIONID}</li>
                </ul>
                    `;
                });
                document.getElementById('output2').innerHTML = output;
                console.log("data")
                console.log(data)
                return data2 = data
            })
            .then((user) => {
                console.log("data2")
                console.log(user)
                data2.forEach(function(user2) {
                    var js = user2.jsession
                    var acc = user2.account_name
                    console.log("Jsession ->", js)
                    console.log("Account ->", acc)

                    output = '<h2> Jsession </h2>';
                    output += js;
                    document.getElementById('js').innerHTML = output;
                    //return js2 = js
                    //.log("line106 : "+js)
                })
                return js
                return js2 = js

            })
    }


    function getJsession() {
        console.log("Work")
        fetch('users2.json')
        .then((res) => res.json())
        .then((data) => { 
            data.forEach(function(user2) {
            var jsx = user2.jsession
            console.log("JsessionX :: ",jsx)
                   
            }) 
        }) 

    }




    function getDevID() {
        var url = ('http://tod-office2.ddns.net:8080/StandardApiAction_queryUserVehicle.action?jsession=' + js2)
        var test2 = url
        document.getElementById('outputdev').innerHTML = test2;

    }
</script>