// =============================
// CONTABILIZE AI
// Proteção de Login
// =============================

import { initializeApp } from 
"https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { 
getAuth,
onAuthStateChanged
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


// Verificar usuário

onAuthStateChanged(auth,(usuario)=>{


    if(!usuario){

        window.location.href="login.html";

    }


});
