// ==============================
// CONTABILIZE AI
// PERFIL COMPLETO
// ==============================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getAuth,
    onAuthStateChanged,
    signOut,
    updateProfile
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";



// FIREBASE

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



// ELEMENTOS

const nomeUsuario = document.getElementById("nomeUsuario");
const emailUsuario = document.getElementById("emailUsuario");

const fotoPerfil = document.getElementById("fotoPerfil");

const editarFoto = document.getElementById("editarFoto");
const editarNome = document.getElementById("editarNome");

const selecionarFoto =
document.getElementById("selecionarFoto");

const sair =
document.getElementById("sair");



let usuarioAtual = null;



// ==============================
// CARREGAR USUÁRIO
// ==============================

onAuthStateChanged(auth, async (usuario)=>{

    if(!usuario){

        window.location.href="login.html";
        return;

    }

    usuarioAtual = usuario;

    await usuario.reload();



    // Nome

    if(nomeUsuario){

        nomeUsuario.textContent =
        usuario.displayName || "Usuário";

    }



    // Email

    if(emailUsuario){

        emailUsuario.textContent =
        usuario.email;

    }



    // Foto salva para este usuário

    const fotoSalva = localStorage.getItem(
        "fotoPerfil_" + usuario.uid
    );



    if(fotoPerfil){

        if(fotoSalva){

            fotoPerfil.src = fotoSalva;

        }

    }

});



// ==============================
// ALTERAR FOTO
// ==============================

if(editarFoto){

    editarFoto.onclick = ()=>{

        selecionarFoto.click();

    };

}



if(selecionarFoto){

    selecionarFoto.onchange = ()=>{

        const arquivo =
        selecionarFoto.files[0];

        if(!arquivo) return;

        const leitor =
        new FileReader();

        leitor.onload = (e)=>{

            const imagem =
            e.target.result;



            fotoPerfil.src = imagem;



            if(usuarioAtual){

                localStorage.setItem(

                    "fotoPerfil_" + usuarioAtual.uid,

                    imagem

                );

            }

        };

        leitor.readAsDataURL(arquivo);

    };

}

// ==============================
// ALTERAR NOME
// ==============================

if (editarNome) {

    editarNome.onclick = async () => {

        if (!usuarioAtual) return;

        const novoNome = prompt(
            "Digite seu novo nome:"
        );

        if (!novoNome) return;

        try {

            await updateProfile(usuarioAtual, {
                displayName: novoNome.trim()
            });

            if (nomeUsuario) {

                nomeUsuario.textContent =
                novoNome.trim();

            }

            alert("Nome atualizado com sucesso!");

        } catch (erro) {

            console.error(erro);

            alert("Erro ao atualizar o nome.");

        }

    };

}



// ==============================
// SAIR
// ==============================

if (sair) {

    sair.onclick = async () => {

        try {

            await signOut(auth);

            window.location.href =
            "login.html";

        } catch (erro) {

            console.error(erro);

            alert("Erro ao sair.");

        }

    };

}



// ==============================
// FIM DO ARQUIVO
// ==============================w
