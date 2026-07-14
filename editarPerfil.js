import { initializeApp } from 
"https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";


import { 
getAuth,
onAuthStateChanged,
updateProfile
}
from 
"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";



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



const novoNome =
document.getElementById("novoNome");


const salvarPerfil =
document.getElementById("salvarPerfil");



let usuarioAtual = null;



onAuthStateChanged(auth,(usuario)=>{


    if(usuario){

        usuarioAtual = usuario;


        novoNome.value =
        usuario.displayName || "";

    }


});




salvarPerfil.onclick = ()=>{


    if(!novoNome.value){

        alert("Digite um nome.");

        return;

    }



    updateProfile(usuarioAtual,{

        displayName:
        novoNome.value

    })

    .then(()=>{


        alert(
        "Perfil atualizado!"
        );


        location.reload();


    });


};
