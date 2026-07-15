// ==============================
// CONTABILIZE AI
// Perfil Completo
// ==============================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getAuth,
    onAuthStateChanged,
    signOut,
    updateProfile
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";



// Firebase

const firebaseConfig = {

    apiKey: "AIzaSyB2lgYqvEaCQOuEXoIt3VM5ILGs65G7vts",

    authDomain: "contabiliza-dc4dd.firebaseapp.com",

    projectId: "contabiliza-dc4dd",

    storageBucket: "contabiliza-dc4dd.firebasestorage.app",

    messagingSenderId: "348846627427",

    appId: "1:348846627427:web:b7899209bed30200abb656",

    measurementId: "G-CME7DK2ZN2"

};



const app = initializeApp(firebaseConfig);

const auth = getAuth(app);



// Elementos

const nomeUsuario =
document.getElementById("nomeUsuario");


const emailUsuario =
document.getElementById("emailUsuario");


const fotoPerfil =
document.getElementById("fotoPerfil");


const editarFoto =
document.getElementById("editarFoto");


const editarNome =
document.getElementById("editarNome");


const selecionarFoto =
document.getElementById("selecionarFoto");


const sair =
document.getElementById("sair");



let usuarioAtual = null;

// ==============================
// CARREGAR PERFIL
// ==============================

onAuthStateChanged(auth, async (usuario) => {

    if (!usuario) {

        window.location.href = "login.html";
        return;

    }

    usuarioAtual = usuario;

    await usuario.reload();

    // Nome
    if (nomeUsuario) {

        nomeUsuario.textContent =
            usuario.displayName || "Usuário";

    }

    // Email
    if (emailUsuario) {

        emailUsuario.textContent =
            usuario.email || "";

    }

    // Foto do Firebase tem prioridade
    if (fotoPerfil) {

        if (usuario.photoURL) {

            fotoPerfil.src = usuario.photoURL;

        } else {

            // Se não existir foto no Firebase,
            // tenta carregar do navegador

            const fotoLocal =
                localStorage.getItem("fotoPerfil");

            if (fotoLocal) {

                fotoPerfil.src = fotoLocal;

            }

        }

    }

});



// ==============================
// ALTERAR FOTO
// ==============================

if (editarFoto && selecionarFoto) {

    editarFoto.addEventListener("click", () => {

        selecionarFoto.click();

    });

}



if (selecionarFoto) {

    selecionarFoto.addEventListener("change", (e) => {

        const arquivo = e.target.files[0];

        if (!arquivo) return;

        const leitor = new FileReader();

        leitor.onload = function (evento) {

            const imagem = evento.target.result;

            if (fotoPerfil) {

                fotoPerfil.src = imagem;

            }

            // Salva localmente por enquanto
            localStorage.setItem(
                "fotoPerfil",
                imagem
            );

        };

        leitor.readAsDataURL(arquivo);

    });

}

// ==============================
// ALTERAR NOME
// ==============================

if (editarNome) {

    editarNome.addEventListener("click", async () => {

        if (!usuarioAtual) return;

        const novoNome = prompt(
            "Digite seu novo nome:"
        );

        if (!novoNome) return;

        try {

            await updateProfile(usuarioAtual, {
                displayName: novoNome
            });

            if (nomeUsuario) {
                nomeUsuario.textContent = novoNome;
            }

            alert("Nome atualizado com sucesso!");

        } catch (erro) {

            console.error(erro);

            alert("Erro ao atualizar o nome.");

        }

    });

}



// ==============================
// SAIR
// ==============================

if (sair) {

    sair.addEventListener("click", async () => {

        try {

            await signOut(auth);

            window.location.href = "login.html";

        } catch (erro) {

            console.error(erro);

            alert("Erro ao sair da conta.");

        }

    });

}
