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

    if (btn == null) {
        document.getElementById("nav-top").innerHTML +=
            `<button class='btn btn-nav' id='avancar-btn' onclick='${funcao}()'>AVANÇAR</button>`;
    } else {
        btn.remove();
        document.getElementById("nav-top").innerHTML +=
            `<button class='btn btn-nav' id='avancar-btn' onclick='${funcao}()'>AVANÇAR</button>`;
    }
}

function situacaoAtualizada() {
    let dadosHtml = "";
    const grupo = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

    //Mod HTML: mostrar as seleções em grupos      
    for (let i = 0, j = 0; i < 32; i++) {
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

function mostrarSelecoesAH() {
    let dadosHtml = "";
    //const grupo = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    FisherYatesShuffle(selecoesArray);

    document.getElementById('table1').remove();

    dadosHtml = situacaoAtualizada();

    document.getElementById('main_container').className = 'main_body_outer2';
    document.getElementById('main_body').className = 'index_main_body_inner2';
    document.getElementById("main_body").innerHTML = dadosHtml;

    //Modificar o botão avançar.
    modBtnAvancar("rodada1");
}

function FisherYatesShuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); //Gera de 0 a i

        [array[i], array[j]] = [array[j], array[i]];
    }
}

function gerarInt09() {
    return Math.floor(Math.random() * 10);
}

function gerarPenalti(time1, time2) {
    let p1 = 0;
    let p2 = 0;

    for (let i = 0; i < 5; i++) {
        p1 += Math.round(Math.random());
        p2 += Math.round(Math.random());

        //Checar se algum time já ganhou (mesmo que oponente acerte as tentativas restantes)
        p1jaganhou = p1 > (p2 + (4 - i));
        p2jaganhou = p2 > (p1 + (4 - i));

        if ((p1jaganhou && !p2jaganhou) || (!p1jaganhou && p2jaganhou)) {
            break;
        }
    }

    //Verificar se precisa de "perda-súbita"
    while (p1 === p2) {
        p1 += Math.round(Math.random());
        p2 += Math.round(Math.random());
    }

    selecoesArray[time1].QtdGolsPenalti += p1;
    selecoesArray[time2].QtdGolsPenalti += p2;
}

function gerarGols(time1, time2) {
    let qtd1 = 0;
    let qtd2 = 0;

    while (time1 < 32 && time2 < 32) {
        //Vetor guarda gols anteriores
        selecoesArray[time1].QtdGols += gerarInt09();
        selecoesArray[time2].QtdGols += gerarInt09();

        //Verificar se NESTA partida será preciso pênalti
        qtd1 += selecoesArray[time1].QtdGols;
        qtd2 += selecoesArray[time2].QtdGols;

        //Verificar necessidade de pênalti
        if (qtd1 === qtd2) {
            gerarPenalti(time1, time2);
        }

        time1 += 4;
        time2 += 4;
        qtd1 = 0;
        qtd2 = 0;
    }
}

function rodada1() {
    document.getElementById('main_body').className = 'rodada1';
    modBtnAvancar("rodada2");
    gerarGols(0, 1);
    document.getElementById("main_body").innerHTML = situacaoAtualizada();
}

function rodada2() {
    document.getElementById('main_body').className = 'rodada2';
    modBtnAvancar("rodada3");
    gerarGols(0, 2);
    document.getElementById("main_body").innerHTML = situacaoAtualizada();
}

function rodada3() {
    document.getElementById('main_body').className = 'rodada3';
    modBtnAvancar("rodada4");
    gerarGols(0, 3);
    document.getElementById("main_body").innerHTML = situacaoAtualizada();
}

function rodada4() {
    document.getElementById('main_body').className = 'rodada4';
    modBtnAvancar("rodada5");
    gerarGols(1, 2);
    document.getElementById("main_body").innerHTML = situacaoAtualizada();
}

function rodada5() {
    document.getElementById('main_body').className = 'rodada5';
    modBtnAvancar("rodada6");
    gerarGols(1, 3);
    document.getElementById("main_body").innerHTML = situacaoAtualizada();
}

function rodada6() {
    document.getElementById('main_body').className = 'rodada6';
    modBtnAvancar("oitava1");
    gerarGols(2, 3);
    document.getElementById("main_body").innerHTML = situacaoAtualizada();
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