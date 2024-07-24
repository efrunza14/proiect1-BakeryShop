window.addEventListener('load',LoadingPeople);

function LoadingPeople() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    // in cazul in care starea devine 4 cererea a fost finalizata si raspunsul este pregatit
    // statusul este 200 inseamna ca raspunsul este afirmativ
      if (this.readyState == 4 && this.status == 200) {
          var xmlDoc = this.responseXML;

        //am creeat capul de tabel
          var tabel = document.createElement("table");
          var headtable = tabel.createTHead();
          var rowhead = headtable.insertRow();

        //introducem numele coloanelor
          var RowTable1 = rowhead.insertCell(0);
          var RowTable2 = rowhead.insertCell(1);
          var RowTable3 = rowhead.insertCell(2);
          var RowTable4 = rowhead.insertCell(3);
          var RowTable5 = rowhead.insertCell(4);
          var RowTable6 = rowhead.insertCell(5);
          var RowTable7 = rowhead.insertCell(6);
          
          RowTable1.innerHTML = "<b>Nume</b>";
          RowTable2.innerHTML = "<b>Prenume</b>";
          RowTable3.innerHTML = "<b>Varsta</b>";
          RowTable4.innerHTML = "<b>Adresa</b>";
          RowTable5.innerHTML = "<b>Sex</b>";
          RowTable6.innerHTML = "<b>CNP</b>";
          RowTable7.innerHTML = "<b>E-mail</b>";
          

          //se preiau informatiile din xml pentru a se completa tabelul 
          var corpTabel = tabel.createTBody();
          var persoane = xmlDoc.getElementsByTagName("persoana");
          for (var i = 0; i < persoane.length; i++) {
              var randTabel = corpTabel.insertRow();
              var Cell1 = randTabel.insertCell(0);
              var Cell2 = randTabel.insertCell(1);
              var Cell3 = randTabel.insertCell(2);
              var Cell4 = randTabel.insertCell(3);
              var Cell5 = randTabel.insertCell(4);
              var Cell6 = randTabel.insertCell(5);
              var Cell7 = randTabel.insertCell(6);
              
              Cell1.innerHTML = persoane[i].getElementsByTagName("nume")[0].childNodes[0].nodeValue;
              Cell2.innerHTML = persoane[i].getElementsByTagName("prenume")[0].childNodes[0].nodeValue;
              Cell3.innerHTML = persoane[i].getElementsByTagName("varsta")[0].childNodes[0].nodeValue;
              Cell4.innerHTML = persoane[i].getElementsByTagName("adresa")[0].getElementsByTagName("strada")[0].childNodes[0].nodeValue + ", " + persoane[i].getElementsByTagName("adresa")[0].getElementsByTagName("numar")[0].childNodes[0].nodeValue + ", " + persoane[i].getElementsByTagName("adresa")[0].getElementsByTagName("localitate")[0].childNodes[0].nodeValue + ", " + persoane[i].getElementsByTagName("adresa")[0].getElementsByTagName("judet")[0].childNodes[0].nodeValue + ", " + persoane[i].getElementsByTagName("adresa")[0].getElementsByTagName("tara")[0].childNodes[0].nodeValue;
              Cell5.innerHTML = persoane[i].getElementsByTagName("sex")[0].childNodes[0].nodeValue;
              Cell6.innerHTML = persoane[i].getElementsByTagName("cnp")[0].childNodes[0].nodeValue;
              Cell7.innerHTML = persoane[i].getElementsByTagName("email")[0].childNodes[0].nodeValue;
              
            
          }
          tabel.classList.add("tabel-stilizat");
          var tabelContainer = document.getElementById("tabel-container");
          tabelContainer.innerHTML = "";
          tabelContainer.appendChild(tabel);
      }
  };
  xhttp.open("GET", "./resurse/persoane.xml", true);
  xhttp.send();
}