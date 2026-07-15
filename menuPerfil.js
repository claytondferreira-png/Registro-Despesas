// ============================
// MENU DO PERFIL
// ============================

const editarFoto = document.getElementById("editarFoto");
const editarNome = document.getElementById("editarNome");
const selecionarFoto = document.getElementById("selecionarFoto");

const nomeUsuario = document.getElementById("nomeUsuario");


// Atualizar foto
editarFoto.addEventListener("click", () => {

    selecionarFoto.click();

});


// Mudar nome
editarNome.addEventListener("click", () => {

    const novoNome = prompt("Digite seu novo nome:");

    if (!novoNome) return;

    nomeUsuario.textContent = novoNome;

    localStorage.setItem("nomeUsuario", novoNome);

});


// Carregar nome salvo
const nomeSalvo = localStorage.getItem("nomeUsuario");

if (nomeSalvo) {

    nomeUsuario.textContent = nomeSalvo;

}
