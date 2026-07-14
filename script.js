// ==========================
// CONTABILIZE AI
// SCRIPT PRINCIPAL
// PARTE 1
// ==========================


// Banco de dados local

let registros = JSON.parse(
    localStorage.getItem("registros")
) || [];


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

let graficoPizza = null;
let graficoBarra = null;


// ==========================
// Salvar dados
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

function formatar(valor){

    return Number(valor).toLocaleString(
        "pt-BR",
        {
            style:"currency",
            currency:"BRL"
        }
    );

}



// ==========================
// ADICIONAR REGISTRO
// ==========================

function adicionarRegistro(){


    if(!descricao.value || !valor.value || !data.value){

        alert("Preencha todos os campos.");

        return;

    }


    const novo = {

        id: Date.now(),

        descricao: descricao.value,

        valor: Number(valor.value),

        categoria: categoria.value,

        tipo: tipo.value,

        data: data.value

    };


    registros.push(novo);


    salvarDados();


    atualizarTudo();


    limparCampos();


    alert("Registro salvo com sucesso!");

}



// ==========================
// Limpar campos
// ==========================

function limparCampos(){

    descricao.value="";

    valor.value="";

    data.value="";

}



// ==========================
// BOTÃO SALVAR
// ==========================


if(salvar){

    salvar.addEventListener(
        "click",
        adicionarRegistro
    );

}


// ==========================
// Atualizar dashboard
// ==========================


function atualizarDashboard(){


    let receitaTotal = 0;

    let despesaTotal = 0;



    registros.forEach(item=>{


        if(item.tipo==="receita"){

            receitaTotal += item.valor;

        }else{

            despesaTotal += item.valor;

        }


    });



    saldo.innerHTML =
    formatar(receitaTotal - despesaTotal);


    receitas.innerHTML =
    formatar(receitaTotal);


    despesas.innerHTML =
    formatar(despesaTotal);


    quantidade.innerHTML =
    registros.length;


}

// ==========================
// CONTABILIZE AI
// SCRIPT PRINCIPAL
// PARTE 2
// ==========================


// ==========================
// ATUALIZAR TABELA
// ==========================

function atualizarTabela(filtro = ""){


    tabela.innerHTML = "";


    const lista = registros.filter(item=>{


        const texto = (

            item.descricao +

            item.categoria +

            item.data

        ).toLowerCase();



        return texto.includes(
            filtro.toLowerCase()
        );


    });



    if(lista.length === 0){


        tabela.innerHTML = `

        <tr>

            <td colspan="6">
                Nenhum registro encontrado.
            </td>

        </tr>

        `;


        return;

    }



    lista.forEach(item=>{


        const linha = document.createElement("tr");



        linha.innerHTML = `


        <td>
            ${item.data}
        </td>


        <td>
            ${item.descricao}
        </td>


        <td>
            ${item.categoria}
        </td>


        <td class="${
            item.tipo === "receita"
            ?
            "tipo-receita"
            :
            "tipo-despesa"
        }">

            ${
                item.tipo === "receita"
                ?
                "Receita"
                :
                "Despesa"
            }

        </td>


        <td>
            ${formatar(item.valor)}
        </td>


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
// EXCLUIR REGISTRO
// ==========================


function excluirRegistro(id){


    const confirmar =
    confirm(
        "Deseja excluir este registro?"
    );


    if(!confirmar){

        return;

    }



    registros =
    registros.filter(
        item=>item.id !== id
    );



    salvarDados();


    atualizarTudo();


}




// ==========================
// PESQUISA
// ==========================


if(pesquisa){


    pesquisa.addEventListener(
        "input",
        ()=>{

            atualizarTabela(
                pesquisa.value
            );

        }
    );


}




// ==========================
// GRÁFICOS
// ==========================


function atualizarGraficos(){


    if(
        !document.getElementById("graficoPizza")
    ){

        return;

    }



    let receita = 0;

    let despesa = 0;


    let categorias = {};



    registros.forEach(item=>{


        if(item.tipo==="receita"){


            receita += item.valor;


        }else{


            despesa += item.valor;



            if(!categorias[item.categoria]){

                categorias[item.categoria]=0;

            }


            categorias[item.categoria]
            += item.valor;


        }


    });





    if(graficoPizza){

        graficoPizza.destroy();

    }



    graficoPizza =
    new Chart(

        document
        .getElementById("graficoPizza"),

        {


        type:"pie",


        data:{


            labels:[
                "Receitas",
                "Despesas"
            ],


            datasets:[{

                data:[
                    receita,
                    despesa
                ]


            }]


        }


        }

    );





    if(graficoBarra){

        graficoBarra.destroy();

    }




    graficoBarra =
    new Chart(

        document
        .getElementById("graficoBarra"),

        {


        type:"bar",


        data:{


            labels:
            Object.keys(categorias),


            datasets:[{

                label:"Gastos",

                data:
                Object.values(categorias)


            }]


        }


        }

    );



}



// ==========================
// ATUALIZA TUDO
// ==========================


function atualizarTudo(){


    atualizarDashboard();

    atualizarTabela();

    atualizarGraficos();


}



// ==========================
// INICIAR SISTEMA
// ==========================


atualizarTudo();



// Data automática

if(data){


    data.value =
    new Date()
    .toISOString()
    .split("T")[0];


}
