// var worker=new Worker('js/worker.js');

function adaugaProdus() {
    //console.log('Funcția adaugaProdus() este apelată!');
    var product = document.getElementById('product').value;
    var quantity = document.getElementById('quantity').value;
    
    var tabelCumparaturi = document.getElementById('tabel_cumparaturi');
    var newRow = tabelCumparaturi.insertRow();
    var cellNr = newRow.insertCell(0);
    var cellNume = newRow.insertCell(1);
    var cellCantitate = newRow.insertCell(2);
    
    cellNr.innerHTML = tabelCumparaturi.rows.length - 1;
    cellNume.innerHTML = product;
    cellCantitate.innerHTML = quantity;
}

