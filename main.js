document.getElementById('getjs2').addEventListener('click', getJsession);



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