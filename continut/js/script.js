//Sectiunea1
/*function updatePageInfo() {
    var dateTimeElement = document.getElementById("currentDateTime");
    var urlElement = document.getElementById("currentURL");
    var locationElement = document.getElementById("currentLocation");
    var browserElement = document.getElementById("currentBrowser");
    var osElement = document.getElementById("currentOS");

    var currentDate = new Date();
    var currentDateTimeString = currentDate.toLocaleString();

    var currentURL = window.location.href;
    var currentLocation = window.location.hostname;
    var currentBrowser = window.navigator.userAgent;
    var currentOS = window.navigator.platform;

    dateTimeElement.innerHTML = "Data și timpul curent: " + currentDateTimeString;
    urlElement.innerHTML = "Adresa URL: " + currentURL;
    locationElement.innerHTML = "Locația curentă: " + currentLocation;
    browserElement.innerHTML = "Browser-ul folosit: " + currentBrowser;
    osElement.innerHTML = "Sistemul de operare folosit: " + currentOS;
}


window.onload = updatePageInfo;

setInterval(updatePageInfo, 1000);*/

function Data(){
    const data= new Date();
    document.getElementById("data").innerHTML=data.toLocaleDateString()+' '+ data.toLocaleTimeString();
}
setInterval(Ora, 1000);

function Site(){
    const url= document.URL;
    document.getElementById("url").innerHTML=url;
}

function Browser(){
    const browser=window.navigator.userAgent;
    const browserElement = document.getElementById("browser");
    browserElement.innerHTML = browser;
    
}

//Sectiunea2
function drawCanvas(event) {
    let canvas = document.getElementById("canva1");
    let rect = canvas.getBoundingClientRect(); // obține coordonatele mouse-ului relativ
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    //punctele dreptunghiului
    let first = [x, y];
    let second = [x + 10, y + 10];
    let ctx = canvas.getContext("2d");
    ctx.fillStyle = document.getElementById("fontcontur").value;
    ctx.strokeStyle = document.getElementById("contur").value;
    //umple dreptunghiul  în care se specifică coordonatele și dimensiunile dreptunghiului, 
    ctx.fillRect(
      Math.min(first[0], second[0]),
      Math.min(first[1], second[1]),
      Math.abs(first[0] - second[0]),
      Math.abs(first[1] - second[1])
    );
    //în care se specifică coordonatele și dimensiunile dreptunghiului și conturul său.
    ctx.strokeRect(
      Math.min(first[0], second[0]) - 1,
      Math.min(first[1], second[1]) - 1,
      Math.abs(first[0] - second[0]) + 2,
      Math.abs(first[1] - second[1]) + 2
    );
  }
 
//tema1 lab7 schimbaContinut 
function schimbaContinut(resursa,jsFisier,jsFunctie)
  {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
       document.getElementById("continut").innerHTML = this.responseText;
       if (jsFisier) {
          var elementScript = document.createElement('script');
          elementScript.onload = function () {
          console.log("hello");
          if (jsFunctie) {
          window[jsFunctie]();
          }
          };
          elementScript.src = jsFisier;
          document.head.appendChild(elementScript);
          } else {
          if (jsFunctie) {
          window[jsFunctie]();
          }
          }
    };
  }
  xhttp.open("GET", resursa + ".html", true); // Deschiderea conexiunii și specificarea resursei cerute
  xhttp.send(); // Trimiterea cererii
  }

//lab7 tema 3
function verificareTest(){
  var json, exists=false;
  var File= new XMLHttpRequest();
  File.overrideMimeType("application/json");
  File.open("GET","resurse/utilizatori.json",true);
  File.onreadystatechange=function()
  {
      if(File.readyState==4 && File.status==200){
          json=JSON.parse(File.responseText);
          for(i = 0; i < json.length; ++i)
          {
              if(document.getElementById("username").value == json[i].utilizator && document.getElementById("password").value == json[i].parola)
              {
                  exists = true;
                  break;
              }
          }
          if(exists)
          {
              alert("Autentificare reusita!");
          }
          else
          {
              alert("Autentificare nereusita ! Mai incearca !");
          }
      }
  }
  File.send();
}








