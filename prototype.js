function getJsession3(){
    fetch(login_url)
        .then((res) =>res.json())
        .then((data) => {
            console.log("Jsession2.0 ::> "+data)

            id = data.jsession

            console.log("Jsession2.0 ::> "+id)



            document.getElementById('output').innerHTML = id;
        })
}


    function getJsession() {
        console.log("Work")
        fetch('users2.json')
            .then((res) => res.json())
            .then((data) => {
                data.forEach(function(user2) {

                    var jsx = user2.jsession
                    var acc = user2.account_name
                    Jx = user2.jsession
                    Account = user2.account_name

                    //x = user2.JSESSIONID
                    console.log("JsessionX :: ", jsx)
                    console.log("AccX :: ", acc)
                    //console.log(data)


                    Spin = acc
                    //console.log("Spin",Spin)
                    //console.log("Account",Account)

                    return data2 = data
                    return Account
                    return Jx




                })
            })
        }