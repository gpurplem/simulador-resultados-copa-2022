/*==================================================
Dados globais
==================================================*/

//Molde de uma seleção
class selecaoObj {
    constructor(Name, Token) {
        this.Name = Name;
        this.Token = Token;
        this.QtdGols = 0;
        this.QtdGolsPenalti = 0;
        this.Pontuacao = 0;
        this.Vitorias = 0;
        this.VenceuRodadas = false;
        this.VenceuOitavas = false;
        this.VenceuQuartas = false;
    }
}

//Armazena todas as seleções
let selecoesArray = new Array(32);

/*==================================================
Main
==================================================*/

//Inicia a cadeia de chamadas das funções do programa
function iniciarPrograma() {
    document.getElementById("iniciar-btn").remove();
    document.getElementById("main_body").className = "index_main_body_inner1";

    inicializarSimulador();
    modBtnAvancar("inicializarGruposAH");
    //simularRodada() - 1 a 3
}

/*==================================================
Funções de suporte a outras
==================================================*/

//Define método de comparação do objeto seleçãoObj
function comparePorPontos(time1, time2) {
    if (time1.Pontuacao > time2.Pontuacao) {
        return -1;
    }
    if (time1.Pontuacao < time2.Pontuacao) {
        return 1;
    }
    return 0;
}

//Modifica onClick do botão avançar para qualquer função
function modBtnAvancar(funcao) {
    const btn = document.getElementById("avancar-btn");

    if (btn == null) {
        document.getElementById("nav-top").innerHTML +=
            `<button class='btn btn-nav' id='avancar-btn' onclick='${funcao}()'>AVANÇAR</button>`;
    } else {
        //Se não remover e recriá-la, onclick não muda.
        btn.remove();
        document.getElementById("nav-top").innerHTML +=
            `<button class='btn btn-nav' id='avancar-btn' onclick='${funcao}()'>AVANÇAR</button>`;
    }
}

//Embaralha os elementos de um vetor
function FisherYatesShuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); //Gera de 0 a i

        [array[i], array[j]] = [array[j], array[i]];
    }
}

function gerarInt09() {
    return Math.floor(Math.random() * 10);
}

//Retorna HTML com dados atualizados dos oito grupos (AH).
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

//Age sobre vetor global selecoesArray[]
function atualizarPontuacao() {
    for (let i = 0; i < 32; i++) {
        selecoesArray[i].Pontuacao = 3 * selecoesArray[i].Vitorias;
    }
}

//Gera resultados de pênalti entre dois times
function gerarPenaltis(time1, time2) {
    let p1 = 0;
    let p2 = 0;

    for (let i = 0; i < 5; i++) {
        p1 += Math.round(Math.random());
        p2 += Math.round(Math.random());

        //Checar se algum time já ganhou (mesmo se oponente acertasse as tentativas restantes)
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

    if (p1 > p2) {
        selecoesArray[time1].Vitorias += 1;
    } else {
        selecoesArray[time2].Vitorias += 1;
    }

    selecoesArray[time1].QtdGolsPenalti += p1;
    selecoesArray[time2].QtdGolsPenalti += p2;
}

//Percorre todas as seleções simulando partidas entre dois times dentro do mesmo grupo (AH) sem possibilidade de empate
function gerarGols(time1, time2) {
    let qtd1 = 0;
    let qtd2 = 0;

    //Cada passada é uma partida entre 2 times
    while (time1 < 32 && time2 < 32) {
        qtd1 = gerarInt09();
        qtd2 = gerarInt09();

        selecoesArray[time1].QtdGols += qtd1;
        selecoesArray[time2].QtdGols += qtd2;

        //Verificar necessidade de pênalti
        if (qtd1 === qtd2) {
            gerarPenaltis(time1, time2);
        } else {
            if (qtd1 > qtd2) {
                selecoesArray[time1].Vitorias += 1;
            } else {
                selecoesArray[time2].Vitorias += 1;
            }
        }

        //Próximo time
        time1 += 4;
        time2 += 4;

        //Verifica se houve empate para então chamar gerarPenaltis()
        qtd1 = 0;
        qtd2 = 0;
    }
}

//Analisa quantidade de gols e depois de pênaltis quando pontução entre times é igual.
function desempatar(a, b, c, d) {
    const CisNull = c == null;
    const DisNull = d == null;

    //Quando houver 2 parâmetros apenas: selecao B(a) e C(b)
    if (CisNull && DisNull) {
        const golsB = selecoesArray[a].QtdGols;
        const golsC = selecoesArray[b].QtdGols;
        const penaltiB = selecoesArray[a].QtdGolsPenalti;
        const penaltiC = selecoesArray[b].QtdGolsPenalti;

        if (golsB !== golsC) {
            if (golsB > golsC) {
                selecoesArray[a].VenceuRodadas = true;
            } else {
                selecoesArray[b].VenceuRodadas = true;
            }
        } else {
            if (penaltiB > penaltiC) {
                selecoesArray[a].VenceuRodadas = true;
            } else if (penaltiB < penaltiC) {
                selecoesArray[b].VenceuRodadas = true;
            } else { //Caso pontuação, gols e pênaltis sejam iguais.
                const resultado = Math.round(Math.random());
                if (resultado === 0) {
                    selecoesArray[a].VenceuRodadas = true;
                } else {
                    selecoesArray[b].VenceuRodadas = true;
                }
            }
        }
    //Selecao B(a) e C(b) e D(c) com mesma pontuação
    } else if (!CisNull && DisNull) { 
        const golsB = selecoesArray[a].QtdGols;
        const golsC = selecoesArray[b].QtdGols;
        const golsD = selecoesArray[c].QtdGols;
        const penaltiB = selecoesArray[a].QtdGolsPenalti;
        const penaltiC = selecoesArray[b].QtdGolsPenalti;
        const penaltiD = selecoesArray[c].QtdGolsPenalti;

        //Se os 3 forem != ou 2 forem == e 1 maior
        if (golsB > golsC && golsB > golsD) {
            selecoesArray[a].VenceuRodadas = true;
            return;
        } else if (golsC > golsB && golsC > golsD) {
            selecoesArray[b].VenceuRodadas = true;
            return;
        } else if (golsD > golsB && golsD > golsC) {
            selecoesArray[c].VenceuRodadas = true;
            return;
        }

        //Se os 3 forem ==
        if (golsB === golsC && golsC === golsD) {
            if (penaltiB > penaltiC && penaltiB > penaltiD) {
                selecoesArray[a].VenceuRodadas = true;
                return;
            } else if (penaltiC > penaltiB && penaltiC > penaltiD) {
                selecoesArray[b].VenceuRodadas = true;
                return;
            } else {
                selecoesArray[c].VenceuRodadas = true;
                return;
            }
        }

        //Se 2 forem iguais e maiores que o 1 restante
        if (golsB === golsC) {
            if (penaltiB > penaltiC) {
                selecoesArray[a].VenceuRodadas = true;
            } else {
                selecoesArray[b].VenceuRodadas = true;
            }
            return;
        } else if (golsB === golsD) {
            if (penaltiB > penaltiD) {
                selecoesArray[a].VenceuRodadas = true;
            } else {
                selecoesArray[c].VenceuRodadas = true;
            }
            return;
        } else if (golsC === golsD) {
            if (penaltiC > penaltiD) {
                selecoesArray[b].VenceuRodadas = true;
            } else {
                selecoesArray[c].VenceuRodadas = true;
            }
            return;
        }
    } else { //4 parâmetros
        const golsA = selecoesArray[a].QtdGols;
        const golsB = selecoesArray[b].QtdGols;
        const golsC = selecoesArray[c].QtdGols;
        const golsD = selecoesArray[d].QtdGols;
        const penaltiA = selecoesArray[a].QtdGolsPenalti;
        const penaltiB = selecoesArray[b].QtdGolsPenalti;
        const penaltiC = selecoesArray[c].QtdGolsPenalti;
        const penaltiD = selecoesArray[d].QtdGolsPenalti;

        //Se os 4 gols forem != ou 1 é maior que todos
        if (golsA > golsB && golsA > golsC && golsA > golsD) {
            selecoesArray[a].VenceuRodadas = true;
            desempatar(b, c, d);
            return;
        } else if (golsB > golsA && golsB > golsC && golsB > golsD) {
            selecoesArray[b].VenceuRodadas = true;
            desempatar(a, c, d);
            return;
        } else if (golsC > golsA && golsC > golsB && golsC > golsD) {
            selecoesArray[c].VenceuRodadas = true;
            desempatar(b, a, d);
            return;
        } else if (golsD > golsA && golsD > golsB && golsD > golsC) {
            selecoesArray[d].VenceuRodadas = true;
            desempatar(b, c, a);
            return;
        }

        //Se os 4 gols forem ==
        if (golsA === golsB && golsB === golsC && golsC === golsD) {
            if (penaltiA > penaltiB && penaltiA > penaltiC && penaltiA > penaltiD) {
                selecoesArray[a].VenceuRodadas = true;
                desempatar(b, c, d);
                return;
            } else if (penaltiB > penaltiA && penaltiB > penaltiC && penaltiB > penaltiD) {
                selecoesArray[b].VenceuRodadas = true;
                desempatar(a, c, d);
                return;
            } else if (penaltiC > penaltiA && penaltiC > penaltiB && penaltiC > penaltiD) {
                selecoesArray[c].VenceuRodadas = true;
                desempatar(b, a, d);
                return;
            } else {
                selecoesArray[d].VenceuRodadas = true;
                desempatar(b, c, a);
                return;
            }
        }

        //Se 2 forem iguais e maiores que o restante
        if (golsA > golsC && golsA > golsD) {
            selecoesArray[a].VenceuRodadas = true;
            selecoesArray[b].VenceuRodadas = true;
            return;
        } else if (golsA > golsB && golsA > golsD) {
            selecoesArray[a].VenceuRodadas = true;
            selecoesArray[c].VenceuRodadas = true;
            return;
        } else if (golsA > golsB && golsA > golsC) {
            selecoesArray[a].VenceuRodadas = true;
            selecoesArray[d].VenceuRodadas = true;
            return;
        } else if (golsB > golsA && golsB > golsD) {
            selecoesArray[b].VenceuRodadas = true;
            selecoesArray[c].VenceuRodadas = true;
            return;
        } else if (golsB > golsA && golsB > golsC) {
            selecoesArray[b].VenceuRodadas = true;
            selecoesArray[d].VenceuRodadas = true;
            return;
        } else if (golsC > golsA && golsC > golsB) {
            selecoesArray[c].VenceuRodadas = true;
            selecoesArray[d].VenceuRodadas = true;
            return;
        }

        //Se 3 forem iguais e maiores que o restante
        if (golsA === golsB === golsC) {
            desempatar(a, b, c);
        } else if (golsB === golsC === golsD) {
            desempatar(b, c, d);
        } else if (golsA === golsB === golsD) {
            desempatar(a, b, d);
        } else {
            desempatar(a, c, d);
        }
        
        //Checar qual foi selecionado e selecionar mais 1
        const classificouA = selecoesArray[a].VenceuRodadas === true;
        const classificouB = selecoesArray[b].VenceuRodadas === true;
        const classificouC = selecoesArray[c].VenceuRodadas === true;

        if (classificouA) {
            desempatar(b, c, d);
        } else if (classificouB) {
            desempatar(a, c, d);
        } else if (classificouC) {
            desempatar(a, b, d);
        } else {
            desempatar(a, b, c);
        }
    }
}

//Marca em todo o vetor global seleções que passaram da primeira etapa da copa
function atualizarVenceuRodadas() {
    //selecoesArray[]: cada grupo (AH) está ordenado descrescente por pontuação

    //Marcar quais seleções passaram da primeira etapa da copa
    for (let i = 0; i < 32; i += 4) {
        let AmaiorB = selecoesArray[i].Pontuacao > selecoesArray[i + 1].Pontuacao;
        let AigualB = selecoesArray[i].Pontuacao === selecoesArray[i + 1].Pontuacao;
        let BigualC = selecoesArray[i + 1].Pontuacao === selecoesArray[i + 2].Pontuacao;
        let CmaiorD = selecoesArray[i + 2].Pontuacao > selecoesArray[i + 3].Pontuacao;
        let CigualD = selecoesArray[i + 2].Pontuacao === selecoesArray[i + 3].Pontuacao;

        //A=B=C=D
        if (AigualB && BigualC && CigualD) {
            desempatar(i, i + 1, i + 2, i + 3);
        }
        //A=B=C>d
        else if(AigualB && BigualC && CmaiorD) {
            desempatar(i, i + 1, i + 2);

            const desempatouA = selecoesArray[i].VenceuRodadas;
            const desempatouB = selecoesArray[i+1].VenceuRodadas;
            const desempatouC = selecoesArray[i+2].VenceuRodadas;

            if(desempatouA){
                desempatar(i + 1, i + 2);
            } else if(desempatouB){
                desempatar(i, i + 2);
            } else {
                desempatar(i, i + 1);
            }
        }
        //A>b=c=d
        else if (AmaiorB && BigualC && CigualD) {
            selecoesArray[i].VenceuRodadas = true;
            desempatar(i + 1, i + 2, i + 3);
        }
        //A>b=c>d
        else if (AmaiorB && BigualC && CmaiorD) {
            selecoesArray[i].VenceuRodadas = true;
            desempatar(i + 1, i + 2);
        }
        //AB>cd
        else {
            selecoesArray[i].VenceuRodadas = true;
            selecoesArray[i + 1].VenceuRodadas = true;
        }
    }
}

/*==================================================
Funções
==================================================*/

//Obtem dados da API e exibe primeira tabela com nomes das seleções
async function inicializarSimulador() {
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

//Exibe as seleções e suas informações pela primeira vez no programa.
function inicializarGruposAH() {
    let dadosHtml = "";
    FisherYatesShuffle(selecoesArray);

    //Apaga a primeira tabela que fora exibida no programa
    const btn = document.getElementById('table1');
    if (btn !== null) {
        btn.remove();
    }

    dadosHtml = situacaoAtualizada();

    //Atualiza classe da tabela que exibirá as seleções e seus placares
    document.getElementById('main_container').className = 'main_body_outer2';
    document.getElementById('main_body').className = 'index_main_body_inner2';

    //Insere os dados no HTML
    document.getElementById("main_body").innerHTML = dadosHtml;

    //Modifica o botão avançar para continuar alterando a página
    modBtnAvancar("simularRodada1A");
}

function simularRodada1A() {
    document.getElementById('main_body').className = 'simularRodada1A';
    modBtnAvancar("simularRodada1B");
    gerarGols(0, 1);
    atualizarPontuacao();
    document.getElementById("main_body").innerHTML = situacaoAtualizada();
}

function simularRodada1B() {
    document.getElementById('main_body').className = 'simularRodada1B';
    modBtnAvancar("simularRodada2A");
    gerarGols(0, 2);
    atualizarPontuacao();
    document.getElementById("main_body").innerHTML = situacaoAtualizada();
}

function simularRodada2A() {
    document.getElementById('main_body').className = 'simularRodada2A';
    modBtnAvancar("simularRodada2B");
    gerarGols(0, 3);
    atualizarPontuacao();
    document.getElementById("main_body").innerHTML = situacaoAtualizada();
}

function simularRodada2B() {
    document.getElementById('main_body').className = 'simularRodada2B';
    modBtnAvancar("simularRodada3A");
    gerarGols(1, 2);
    atualizarPontuacao();
    document.getElementById("main_body").innerHTML = situacaoAtualizada();
}

function simularRodada3A() {
    document.getElementById('main_body').className = 'simularRodada3A';
    modBtnAvancar("simularRodada3B");
    gerarGols(1, 3);
    atualizarPontuacao();
    document.getElementById("main_body").innerHTML = situacaoAtualizada();
}

function simularRodada3B() {
    document.getElementById('main_body').className = 'simularRodada3B';
    
    //modBtnAvancar("atualizarVenceuRodadas");
    gerarGols(2, 3);
    atualizarPontuacao();

    //Ordenar dentro dos grupos (AH) por pontuação
    let selecoesArrayTmp = new Array();
    for (let i = 0; i < 32; i += 4) {
        selecoesArrayTmp = selecoesArrayTmp.concat(selecoesArray.slice(i, i + 4).sort(comparePorPontos));
    }
    selecoesArray = selecoesArrayTmp;

    document.getElementById("main_body").innerHTML = situacaoAtualizada();

    atualizarVenceuRodadas();
    modBtnAvancar("test");
}

function test(){
    alert("teste");
}

