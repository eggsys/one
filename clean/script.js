

document.getElementById('output2').addEventListener('click', show);
document.getElementById('getcus').addEventListener('click',GetCusID)

function show() {
    let outputX = "Value";
    document.getElementById('run').innerHTML = outputX;
    
}




function GetCusID(){ 
    const checkStatus = response => {
        if(response.ok){
            return response;
        }else {
            const error = new Error(response.statusText);
            error.response = response;
            throw error;
        }
    };

    const parseJson = res => res.json();
    const url = 'http://tod-gps.com/logistics/mdvr_device.php?cus=3603';
    fetch(url)
        .then(checkStatus)
        .then(parseJson)
        .then(data => {
            console.log('succeeded with JSON repponse', data);
            document.getElementById('cusid').innerHTML = data[0].GpsID;
            //console.log(parseJson);
        }).catch(function(error){
            console.log('request failed', error);
        });
}