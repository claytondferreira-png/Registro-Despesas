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



// Inicializar Firebase

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);




// Elementos

const nomeUsuario = 
document.getElementById("nomeUsuario");


const emailUsuario = 
document.getElementById("emailUsuario");


const fotoPerfil = 
document.getElementById("fotoPerfil");


const sair = 
document.getElementById("sair");




// Carregar usuário

onAuthStateChanged(auth, async (usuario)=>{


    if(usuario){


        await usuario.reload();



        const usuarioAtual = auth.currentUser;



        nomeUsuario.innerHTML =
        usuarioAtual.displayName || "Usuário";



        emailUsuario.innerHTML =
        usuarioAtual.email;



        if(usuarioAtual.photoURL){


            fotoPerfil.src =
            usuarioAtual.photoURL;


        }


    }


});






// Botão sair

if(sair){


    sair.onclick = ()=>{


        signOut(auth)

        .then(()=>{


            window.location.href =
            "login.html";


        })

        .catch((erro)=>{


            console.log(
            "Erro ao sair:",
            erro
            );


        });


    };


}
