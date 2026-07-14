// =============================
// CONTABILIZE AI
// Sistema de Login Firebase
// =============================


// Import Firebase

import { initializeApp } from 
"https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";


import { 
getAuth,
createUserWithEmailAndPassword,
signInWithEmailAndPassword
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

const email = document.getElementById("email");

const senha = document.getElementById("senha");

const entrar = document.getElementById("entrar");

const criar = document.getElementById("criar");

const mensagem = document.getElementById("mensagem");



// Criar conta

criar.addEventListener("click",()=>{


createUserWithEmailAndPassword(

auth,

email.value,

senha.value

)

.then(()=>{


mensagem.innerHTML =
"Conta criada com sucesso!";


setTimeout(()=>{

window.location.href="index.html";

},1500);


})


.catch((erro)=>{


mensagem.innerHTML =
erro.message;


});


});




// Login

entrar.addEventListener("click",()=>{


signInWithEmailAndPassword(

auth,

email.value,

senha.value

)

.then(()=>{


mensagem.innerHTML =
"Login realizado!";


setTimeout(()=>{


window.location.href="index.html";


},1000);


})


.catch((erro)=>{


mensagem.innerHTML =
"Usuário ou senha incorretos";


});


});
