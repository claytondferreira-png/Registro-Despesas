// ==========================
// CONTABILIZE AI
// script.js - Parte 1
// ==========================

// Banco de dados
alert("Sistema carregou");

let registros = JSON.parse(localStorage.getItem("registros")) || [];

// Elementos
const descricao = document.getElementById("descricao");
const valor = document.getElementById("valor");
const categoria = document.getElementById("categoria");
const tipo = document.getElementById("tipo");
const data = document.getElementById("data");

const salvar = document.getElementById("salvar");

const tabela = document.getElementById("tabela");

const saldo = document.getElementById("saldo");
const receitas = document.getElementById("receitas");
const despesas = document.getElementById("despesas");
const quantidade = document.getElementById("quantidade");

const pesquisa = document.getElementById("pesquisa");

// Gráficos
let graficoPizza;
let graficoBarra;

// ==========================
// Salvar no navegador
// ==========================

function salvarDados(){

    localStorage.setItem(
        "registros",
        JSON.stringify(registros)
    );

}

// ==========================
// Formatar dinheiro
// ==========================

function dinheiro(valor){

    return valor.toLocaleString("pt-BR",{

        style:"currency",
        currency:"BRL"

    });

}

// ==========================
// Atualizar Dashboard
// ==========================

function atualizarDashboard(){

    let totalReceita = 0;
    let totalDespesa = 0;

    registros.forEach(item=>{

        if(item.tipo==="receita"){

            totalReceita += item.valor;

        }else{

            totalDespesa += item.valor;

        }

    });

    saldo.textContent = dinheiro(totalReceita-totalDespesa);

    receitas.textContent = dinheiro(totalReceita);

    despesas.textContent = dinheiro(totalDespesa);

    quantidade.textContent = registros.length;

}

// ==========================
// Criar Registro
// ==========================

function adicionarRegistro(){

    if(

        descricao.value.trim()==="" ||

        valor.value==="" ||

        data.value===""

    ){

        alert("Preencha todos os campos.");

        return;

    }

    registros.push({

        id:Date.now(),

        descricao:descricao.value,

        valor:Number(valor.value),

        categoria:categoria.value,

        tipo:tipo.value,

        data:data.value

    });

    salvarDados();

    atualizarDashboard();

    atualizarTabela();

    atualizarGraficos();

    limparFormulario();

}

// ==========================
// Limpar formulário
// ==========================

function limparFormulario(){

    descricao.value="";

    valor.value="";

    categoria.selectedIndex=0;

    tipo.selectedIndex=0;

    data.value="";

}

// ==========================
// TESTE DO BOTÃO SALVAR
// ==========================

console.log(
    "Botão salvar encontrado:",
    salvar
);


// Clique botão salvar

if(salvar){

    salvar.addEventListener(

        "click",

        adicionarRegistro

    );

}else{

    console.log(
        "Botão salvar não foi encontrado."
    );

}
// ==========================
// Carregar dados
// ==========================

atualizarDashboard();

// ==========================
// CONTABILIZE AI
// script.js - Parte 2
// ==========================

// Atualizar tabela
function atualizarTabela(filtro = "") {

    tabela.innerHTML = "";

    let lista = registros.filter(item => {

        const texto = (
            item.descricao +
            item.categoria +
            item.tipo +
            item.data
        ).toLowerCase();

        return texto.includes(filtro.toLowerCase());

    });

    if (lista.length === 0) {

        tabela.innerHTML = `
            <tr>
                <td colspan="6">Nenhum registro encontrado.</td>
            </tr>
        `;

        return;

    }

    lista.forEach(item => {

        const linha = document.createElement("tr");

        linha.innerHTML = `

            <td>${item.data}</td>

            <td>${item.descricao}</td>

            <td>${item.categoria}</td>

            <td class="${
                item.tipo === "receita"
                ? "tipo-receita"
                : "tipo-despesa"
            }">

                ${
                    item.tipo === "receita"
                    ? "Receita"
                    : "Despesa"
                }

            </td>

            <td>${dinheiro(item.valor)}</td>

            <td>

                <button
                    class="btn-excluir"
                    onclick="excluirRegistro(${item.id})">

                    Excluir

                </button>

            </td>

        `;

        tabela.appendChild(linha);

    });

}

// ==========================
// Excluir registro
// ==========================

function excluirRegistro(id){

    const confirmar = confirm(
        "Deseja realmente excluir este registro?"
    );

    if(!confirmar) return;

    registros = registros.filter(item => item.id !== id);

    salvarDados();

    atualizarDashboard();

    atualizarTabela();

    atualizarGraficos();

}

// ==========================
// Pesquisa
// ==========================

pesquisa.addEventListener("input", () => {

    atualizarTabela(pesquisa.value);

});

// ==========================
// Carregar tabela
// ==========================

atualizarTabela();// ==========================
// CONTABILIZE AI
// script.js - Parte 3
// ==========================

// Atualizar gráficos
function atualizarGraficos(){

    let totalReceitas = 0;
    let totalDespesas = 0;

    const categorias = {};

    registros.forEach(item=>{

        if(item.tipo==="receita"){

            totalReceitas += item.valor;

        }else{

            totalDespesas += item.valor;

            if(!categorias[item.categoria]){

                categorias[item.categoria]=0;

            }

            categorias[item.categoria]+=item.valor;

        }

    });

    // -------- Gráfico Pizza --------

    const ctxPizza =
        document.getElementById("graficoPizza").getContext("2d");

    if(graficoPizza){

        graficoPizza.destroy();

    }

    graficoPizza = new Chart(ctxPizza,{

        type:"pie",

        data:{

            labels:["Receitas","Despesas"],

            datasets:[{

                data:[totalReceitas,totalDespesas],

                backgroundColor:[

                    "#16a34a",
                    "#dc2626"

                ]

            }]

        },

        options:{

            responsive:true,

            plugins:{

                legend:{

                    position:"bottom"

                }

            }

        }

    });

    // -------- Barras --------

    const ctxBarra =
        document.getElementById("graficoBarra").getContext("2d");

    if(graficoBarra){

        graficoBarra.destroy();

    }

    graficoBarra = new Chart(ctxBarra,{

        type:"bar",

        data:{

            labels:Object.keys(categorias),

            datasets:[{

                label:"Gastos",

                data:Object.values(categorias),

                backgroundColor:"#2563eb"

            }]

        },

        options:{

            responsive:true,

            scales:{

                y:{

                    beginAtZero:true

                }

            }

        }

    });

}

// ==========================
// Inicialização
// ==========================

if(registros.length > 0){

    atualizarTabela();

}

atualizarDashboard();

atualizarGraficos();

// ==========================
// Data atual automaticamente
// ==========================

window.addEventListener("load",()=>{

    if(data){

        data.value = new Date().toISOString().split("T")[0];

    }

});

// ==========================
// Enter salva registro
// ==========================

document.addEventListener("keydown",(e)=>{

    if(e.key==="Enter"){

        if(document.activeElement.tagName==="INPUT"){

            adicionarRegistro();

        }

    }

});

// ==========================
// Fim do arquivo
// ==========================
