// =============================
// CONTABILIZE AI
// Perfil do usuário
// =============================


import { initializeApp } from 
"https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";


import { 
getAuth,
onAuthStateChanged,
signOut
}
from 
"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";



// Configuração Firebase

const firebaseConfig = {

apiKey: "AIzaSyB2lgYqvEaCQOuEXoIt3VM5ILGs65G7vts",

authDomain: "contabiliza-dc4dd.firebaseapp.com",

projectId: "contabiliza-dc4dd",

storageBucket: "contabiliza-dc4dd.firebasestorage.app",

messagingSenderId: "348846627427",

appId: "1:348846627427:web:b7899209bed30200abb656",

measurementId: "G-CME7DK2ZN2"

};



// Inicializar

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);



// Elementos

const nomeUsuario =
document.getElementById("nomeUsuario");


const emailUsuario =
document.getElementById("emailUsuario");


const sair =
document.getElementById("sair");



const fotoPerfil =
document.getElementById("fotoPerfil");




// Ver usuário logado

onAuthStateChanged(auth,(usuario)=>{


    if(usuario){


        nomeUsuario.innerHTML =
        usuario.displayName || "Usuário";


        emailUsuario.innerHTML =
        usuario.email;



        if(usuario.photoURL){

            fotoPerfil.src =
            usuario.photoURL;

        }


    }


});




// Botão sair

if(sair){


    sair.addEventListener("click",()=>{


        signOut(auth)

        .then(()=>{


            window.location.href =
            "login.html";


        });


    });


}
