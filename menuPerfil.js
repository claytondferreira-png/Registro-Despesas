// =============================
// MENU DA FOTO DE PERFIL
// CONTABILIZE AI
// =============================


const fotoContainer =
document.querySelector(".fotoContainer");


const menuPerfil =
document.getElementById("menuPerfil");


const fotoPerfil =
document.getElementById("fotoPerfil");


const editarFoto =
document.getElementById("editarFoto");


const editarNome =
document.getElementById("editarNome");


const selecionarFoto =
document.getElementById("selecionarFoto");





// Abrir e fechar menu

fotoPerfil.addEventListener("click",(e)=>{


    e.stopPropagation();


    if(menuPerfil.style.display === "block"){

        menuPerfil.style.display = "none";

    }else{

        menuPerfil.style.display = "block";

    }


});





// Clicar fora fecha o menu

document.addEventListener("click",()=>{


    menuPerfil.style.display = "none";


});





// Botão alterar foto

editarFoto.addEventListener("click",(e)=>{


    e.stopPropagation();


    selecionarFoto.click();


    menuPerfil.style.display="none";


});





// Botão editar nome

editarNome.addEventListener("click",(e)=>{


    e.stopPropagation();


    const campoNome =
    document.getElementById("novoNome");


    if(campoNome){


        campoNome.scrollIntoView({

            behavior:"smooth"

        });


        campoNome.focus();


    }


    menuPerfil.style.display="none";


});
