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

<body>

    <p> test </p>
    <button id="getText"> Get Jsession</button>
    <div id="output"></div>

    <br>

    <button id="getses"> Fetch Users</button>
    <div id="output2"></div>

    <br>

    <button id="getfetch"> Fetch jsession</button>
    <div id="output3"></div>

    <br>

    <button id="getdata"> getdata </button>
    <div id="getdata"></div>

        <br>
    <button id="test"> Test </button>
    <div id="test"></div>

</body>

</html>


<script type="text/javascript">
    // ทดสอบแสดงตัวแปร
    let jsondata;


    document.getElementById('getText').addEventListener('click', getText);
    document.getElementById('getses').addEventListener('click', getses);
    document.getElementById('getfetch').addEventListener('click', getfetch);
    document.getElementById('getdata').addEventListener('click', getdata);
    document.getElementById('test').addEventListener('click', test);



    function getText() {
        fetch('http://tod-office2.ddns.net:8080/StandardApiAction_login.action?account=' + data + '&password=' + pass)
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
                    <li>ID: ${user.jsession}</li>
                    <li>Name: ${user.account_name}</li>
                    <li>JSESSIONID : ${user.JSESSIONID}</li>
                   
                  
                </ul>
            
                `;
                });
                document.getElementById('output2').innerHTML = output;
            })
    }

    function getfetch() {
        fetch('http://tod-office2.ddns.net:8080/StandardApiAction_login.action?account=admin&password=admin')
            .then((res) => res.json())
            .then((data) => {
                let output = '<h2>Jsession</h2>';
                data.forEach(function(user) {
                    output += ` 
                <ul>
                    <li>ID: ${user.jsession}</li>
                    <li>Name: ${user.account_name}</li>
                   
                  
                </ul>
            
                `;
                });
                document.getElementById('output3').innerHTML = output;
            })
    }

    function getdata() {
        let js
        fetch('users2.json').then(
            function(u) {
                return u.json();
            }
        ).then(
            function(json) {
                jsondata = json;
            }
        )

        console.log(jsondata)

    }

    function test() {
        var obj;

        fetch('https://jsonplaceholder.typicode.com/posts/1')
            .then(res => res.json())
            .then(data => obj = data)
            .then(() => console.log(obj))
    }
</script>