<?php

?>
<!DOCTYPE html>
<html>

<head>
    <meta charset='utf-8'>
    <meta http-equiv='X-UA-Compatible' content='IE=edge'>
    <title>Page Title</title>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <link rel='stylesheet' type='text/css' media='screen' href='https://bootswatch.com/4/lux/bootstrap.min.css'>

    <!--<script src='main.js'></script>-->
</head>

<body>
    <br>
    <!--
    <select id="list" onchange=" getSelectValue();">
        <option value="888888"> 888888 </option>
        <option value="0"> No car</option>
        <option value=""
    </select>

    <p> test </p>
-->
    <!-- <input type="text" id="mytext"> -->

    select:car
    <select id="car" onchange="ChangeCarList()">
        <option value="">-- Car --</option>
        <option value="VO">Volvo</option>
        <option value="VW">Volkswagen</option>
        <option value="BMW">BMW</option>
    </select>


    select:carmodel
    <select id="carmodel"></select>

    <hr>

    <button id="test" class="btn btn-danger"> TEST </button>

    <hr>

    <select  id="test">
    
    </select>


</body>

</html>




<script type="text/javascript">

    document.getElementById("test").addEventListener('click', test);


    function getSelectValue() {

        var selectedValue = document.getElementById("list").value
        console.log(selectedValue);


    }

    var test = "Hello";
    // document.getElementById("mytext").value = test;



    var carsAndModels = {};
    carsAndModels['VO'] = ['V70', 'XC60', 'XC90'];
    carsAndModels['VW'] = ['Golf', 'Polo', 'Scirocco', 'Touareg'];
    carsAndModels['BMW'] = ['M6', 'X5', 'Z3'];
    GPScar = ['x', 'y', 'z']

    function ChangeCarList() {
        var carList = document.getElementById("car");
        console.log(carList)

        var modelList = document.getElementById("carmodel");
        console.log(modelList)

        var selCar = carList.options[carList.selectedIndex].value;
        while (modelList.options.length) {
            modelList.remove(0);
        }
        var cars = carsAndModels[selCar];
        if (cars) {
            var i;
            for (i = 0; i < cars.length; i++) {
                var car = new Option(cars[i], i);
                modelList.options.add(car);
            }
        }
    }

    

    function test(){

        var carList = document.getElementById("car");
        console.log(carList)

        var modelList = document.getElementById("carmodel");
        console.log(modelList)

        for (let index = 0; index < GPScar.length; index++) {
            //const element = array[index];
             var selCar = GPScar[index]
            console.log(selCar)
            
        } 
    }

        let myArray = ['x','y','z'];

        for (let i = 0; i < myArray.length; i++) {
            var string =`<option value"+ myArray[i] +">x </option>`;            
        }
        console.log(string)
        document.getElementById("test").innerHTML = string
        
 
</script>