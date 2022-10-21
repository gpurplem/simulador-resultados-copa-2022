//Realça nav de acordo com página acessad.

var nomePagina = window.location.pathname;
var nomePagina = nomePagina.split("/").pop();

if(nomePagina === "index.html"){
    var elem_inicio = document.getElementById("inicio");
    elem_inicio.style.color = "white";
} else if(nomePagina === "sobre.html"){
    var elem_sobre = document.getElementById("sobre");
    elem_sobre.style.color = "white";
}