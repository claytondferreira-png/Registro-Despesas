// =============================
// FOTO DE PERFIL LOCAL
// CONTABILIZE AI
// =============================


const selecionarFoto = 
document.getElementById("selecionarFoto");


const fotoPerfil =
document.getElementById("fotoPerfil");


// Carrega foto salva

const fotoSalva =
localStorage.getItem("fotoPerfil");


if(fotoSalva && fotoPerfil){

    fotoPerfil.src = fotoSalva;

}




// Escolher foto

if(selecionarFoto){


    selecionarFoto.addEventListener(
        "change",
        function(){


            const arquivo =
            selecionarFoto.files[0];


            if(!arquivo){

                return;

            }



            const leitor =
            new FileReader();



            leitor.onload = function(event){


                const imagem =
                event.target.result;



                if(fotoPerfil){

                    fotoPerfil.src = imagem;

                }



                localStorage.setItem(
                    "fotoPerfil",
                    imagem
                );


            };



            leitor.readAsDataURL(arquivo);


        }
    );


}
