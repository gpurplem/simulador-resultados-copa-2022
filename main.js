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
/*============================
Mostrar seleções (passo 1).
============================*/

const apiUrl = "https://estagio.geopostenergy.com/WorldCup/GetAllTeams";
var dados;
var selecoesArray = new Array(32);
var dadosHtml = "";

class selecaoObj {
    constructor(Name, Token) {
        this.Name = Name;
        this.Token = Token;
        this.QtdGols = 0;
        this.QtdGolsPenalti = 0;
        this.Pontuacao = 0;
    }
}

async function getSelecoes(url) {
    
    const resposta = await fetch(url, 
        {
            method: 'GET', headers: {'git-user': 'gpurplem'},
            response: 'JSON' 
        });
    
        dados = await resposta.json();

        for(let i = 0; i<32; i++){
            selecoesArray[i] = new selecaoObj(dados.Result[i].Name, dados.Result[i].Token);
        }
}

async function mostrarSelecoes() {
    dadosHtml = "<table class='table1'>" + 
    "<tr><th colspan='4'>Seleções</th></tr>";

    for(let i = 0; i<32; i++){
        dadosHtml += '<tr>' + '<td>' + selecoesArray[i]['Name'] + '</td>' + '<td>' + selecoesArray[++i]['Name'] + '</td>' 
        + '<td>' + selecoesArray[++i]['Name'] + '</td>' + '<td>' + selecoesArray[++i]['Name'] + '</td>' + '</tr>';
    }
    dadosHtml += "</table>";

    document.getElementById("main_body").innerHTML = dadosHtml;
    document.getElementById("nav-top").innerHTML  += "<button class='btn btn-nav'>AVANÇAR</button>";
}

var iniciarBtn = document.getElementById("iniciar-btn");

async function iniciar() {
    iniciarBtn.remove();
    document.getElementById("main_body").className = "index_main_body_inner1";
    await getSelecoes(apiUrl);
    await mostrarSelecoes();
};

iniciarBtn.addEventListener('click', iniciar);




/*async function mostrarSelecoes() {
    dadosHtml = "<h2 style='text-align: center'>Seleções e placar inicial</h2><table class='table1'>" + 
    "<tr><th>Seleção</th><th>Gols</th><th>Pênaltis</th><th>Pontuação</th></tr>";

    for(let i = 0; i<32; i++){
        let pais = selecoesArray[i]['Name'];
        let gols = selecoesArray[i]['QtdGols'];
        let penaltis = selecoesArray[i]['QtdGolsPenalti'];
        let pontuacao = selecoesArray[i]['Pontuacao'];

        dadosHtml += '<tr>' + '<td>' + pais + '</td>' + '<td>' + gols + '</td>' 
        + '<td>' + penaltis + '</td>' + '<td>' + pontuacao + '</td>' + '</tr>';
    }
    dadosHtml += "</table>";

    document.getElementById("main_body").innerHTML = dadosHtml;
    document.getElementById("nav-top").innerHTML  += "<button class='btn btn-nav'>AVANÇAR</button>";
}*/