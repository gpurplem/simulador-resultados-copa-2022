/*============================
Classes e estruturas globais.
============================*/
class selecaoObj {
    constructor(Name, Token) {
        this.Name = Name;
        this.Token = Token;
        this.QtdGols = 0;
        this.QtdGolsPenalti = 0;
        this.Pontuacao = 0;
    }
}

let selecoesArray = new Array(32);
let controleBtnAvancar = 0;

/*============================
Ordem de execução
============================*/
function iniciarPrograma() {
    document.getElementById("iniciar-btn").remove();
    document.getElementById("main_body").className = "index_main_body_inner1"; //Muda classe da div main_body_inner.
    mostrarSelecoes();
    modBtnAvancar("mostrarSelecoesAH");
}

/*
Ordem do botão avançar:
1. mostrarSelecoesAH()
2. a 7. rodada1() a rodada6()
8. 
*/

/*============================
Funções
============================*/
async function mostrarSelecoes() {
    const apiUrl = "https://estagio.geopostenergy.com/WorldCup/GetAllTeams";
    let dadosHtml = "";
    let dados;

    //Get dados da API
    const resposta = await fetch(apiUrl,
        {
            method: 'GET', headers: { 'git-user': 'gpurplem' },
            response: 'JSON'
        });

    dados = await resposta.json();

    //Load vetor de seleções.
    for (let i = 0; i < 32; i++) {
        selecoesArray[i] = new selecaoObj(dados.Result[i].Name, dados.Result[i].Token);
    }

    //Mod HTML: mostrar as seleções em uma tabela
    dadosHtml =
        `<table class='table1' id='table1'>
        <tr>
            <th colspan='4'>Seleções</th>
        </tr>`;

    for (let i = 0; i < 32; i++) {
        dadosHtml +=
            `<tr>
            <td>${selecoesArray[i]['Name']}</td>
            <td>${selecoesArray[++i]['Name']}</td>
            <td>${selecoesArray[++i]['Name']}</td>
            <td>${selecoesArray[++i]['Name']}</td>
        </tr>`;
    }

    dadosHtml +=
        `</table>`;

    document.getElementById("main_body").innerHTML = dadosHtml;
}

function modBtnAvancar(funcao) {
    const btn = document.getElementById("avancar-btn");
    
    if(btn == null){
        document.getElementById("nav-top").innerHTML +=
        `<button class='btn btn-nav' id='avancar-btn' onclick='${funcao}()'>AVANÇAR</button>`;
    } else {
        btn.remove();
        document.getElementById("nav-top").innerHTML +=
        `<button class='btn btn-nav' id='avancar-btn' onclick='${funcao}()'>AVANÇAR</button>`;
    }
}

function situacaoAtualizadas(){
    let dadosHtml = "";
    const grupo = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

    //Mod HTML: mostrar as seleções em grupos      
    for (let i = 0, j=0; i < 32; i++) {
        dadosHtml +=
        `<table class='table1' id='table2'>
            <tr>
                <th>${grupo[j++]}</th>
                <th>Gol</th>
                <th>Penalti</th>
                <th>Ponto</th>
            </tr>            
            <tr>
                <td>${selecoesArray[i]['Name']}</td>
                <td>${selecoesArray[i]['QtdGols']}</td>
                <td>${selecoesArray[i]['QtdGolsPenalti']}</td>
                <td>${selecoesArray[i]['Pontuacao']}</td>
            </tr>
            <tr>
                <td>${selecoesArray[++i]['Name']}</td>
                <td>${selecoesArray[i]['QtdGols']}</td>
                <td>${selecoesArray[i]['QtdGolsPenalti']}</td>
                <td>${selecoesArray[i]['Pontuacao']}</td>
            </tr>
            <tr>
                <td>${selecoesArray[++i]['Name']}</td>
                <td>${selecoesArray[i]['QtdGols']}</td>
                <td>${selecoesArray[i]['QtdGolsPenalti']}</td>
                <td>${selecoesArray[i]['Pontuacao']}</td>
            </tr>
            <tr>
                <td>${selecoesArray[++i]['Name']}</td>
                <td>${selecoesArray[i]['QtdGols']}</td>
                <td>${selecoesArray[i]['QtdGolsPenalti']}</td>
                <td>${selecoesArray[i]['Pontuacao']}</td>
            </tr>`;
    }

    return dadosHtml;
}

function mostrarSelecoesAH(){
    let dadosHtml = "";
    //const grupo = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    FisherYatesShuffle(selecoesArray);

    document.getElementById('table1').remove();

    dadosHtml = situacaoAtualizadas();
     
    document.getElementById('main_container').className = 'main_body_outer2';
    document.getElementById('main_body').className = 'index_main_body_inner2';
    document.getElementById("main_body").innerHTML = dadosHtml;

    //Modificar o botão avançar.
    modBtnAvancar("rodada1");
}

function FisherYatesShuffle(array){
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); //Gera de 0 a i

        [array[i], array[j]] = [array[j], array[i]];
      }
}

function rodada1(){
    document.getElementById('main_body').className = 'rodada1';
    modBtnAvancar("rodada2");

    
}

function rodada2(){
    document.getElementById('main_body').className = 'rodada2';
    modBtnAvancar("rodada3");
}

function rodada3(){
    document.getElementById('main_body').className = 'rodada3';
    modBtnAvancar("rodada4");
}

function rodada4(){
    document.getElementById('main_body').className = 'rodada4';
    modBtnAvancar("rodada5");
}

function rodada5(){
    document.getElementById('main_body').className = 'rodada5';
    modBtnAvancar("rodada6");
}

function rodada6(){
    document.getElementById('main_body').className = 'rodada6';
    modBtnAvancar("oitava1");
}















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