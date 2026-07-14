// =============================
// CONTABILIZE AI
// Firebase Authentication
// auth.js
// =============================


import { initializeApp } from 
"https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";


import { 
getAuth,
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
sendPasswordResetEmail,
updateProfile
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



// Campos

const nome = document.getElementById("nome");

const email = document.getElementById("email");

const senha = document.getElementById("senha");


const entrar = document.getElementById("entrar");

const criar = document.getElementById("criar");

const recuperar = document.getElementById("recuperar");

const mensagem = document.getElementById("mensagem");




// =============================
// CRIAR CONTA
// =============================


criar.addEventListener("click",()=>{


    if(
        nome.value === "" ||
        email.value === "" ||
        senha.value === ""
    ){

        mensagem.innerHTML =
        "Preencha todos os campos.";

        return;

    }



    createUserWithEmailAndPassword(

        auth,

        email.value,

        senha.value

    )


    .then((resultado)=>{


        const usuario = resultado.user;



        updateProfile(usuario,{

            displayName:
            nome.value

        })

        .then(()=>{


            mensagem.style.color="#16a34a";


            mensagem.innerHTML =
            "Conta criada com sucesso!";


            setTimeout(()=>{


                window.location.href="index.html";


            },1500);



        });



    })


    .catch((erro)=>{


        mensagem.style.color="#dc2626";


        if(
        erro.code ===
        "auth/email-already-in-use"
        ){

            mensagem.innerHTML =
            "Esse e-mail já está cadastrado.";

        }

        else if(
        erro.code ===
        "auth/weak-password"
        ){

            mensagem.innerHTML =
            "A senha precisa ter pelo menos 6 caracteres.";

        }

        else{

            mensagem.innerHTML =
            "Erro ao criar conta.";

        }


    });



});






// =============================
// LOGIN
// =============================


entrar.addEventListener("click",()=>{


    signInWithEmailAndPassword(

        auth,

        email.value,

        senha.value

    )


    .then(()=>{


        mensagem.style.color="#16a34a";


        mensagem.innerHTML =
        "Login realizado!";


        setTimeout(()=>{


            window.location.href="index.html";


        },1000);



    })


    .catch(()=>{


        mensagem.style.color="#dc2626";


        mensagem.innerHTML =
        "E-mail ou senha incorretos.";


    });



});






// =============================
// RECUPERAR SENHA
// =============================


recuperar.addEventListener("click",()=>{


    if(email.value===""){


        mensagem.innerHTML =
        "Digite seu e-mail primeiro.";


        return;

    }



    sendPasswordResetEmail(

        auth,

        email.value

    )


    .then(()=>{


        mensagem.style.color="#16a34a";


        mensagem.innerHTML =
        "Link enviado para seu e-mail.";


    })


    .catch(()=>{


        mensagem.style.color="#dc2626";


        mensagem.innerHTML =
        "Erro ao enviar o link.";

    });



});
