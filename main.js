/*============================
Mudar fonte de nav dependendo da página.
============================*/

var nomePagina = window.location.pathname;
var nomePagina = nomePagina.split("/").pop(); //Pega o último elemento do vetor.

if(nomePagina === "index.html"){
    var elem_inicio = document.getElementById("inicio");
    elem_inicio.style.color = "white";
} else if(nomePagina === "sobre.html"){
    var elem_sobre = document.getElementById("sobre");
    elem_sobre.style.color = "white";
}

/*============================
Botão iniciar.
============================*/

var iniciarBtn = document.getElementById("iniciar-btn");

alerting = () => {alert("teste")};

iniciarBtn.addEventListener('click', alerting);