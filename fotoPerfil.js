// =============================
// Foto de perfil local
// Contabilize AI
// =============================


const selecionarFoto =
document.getElementById("selecionarFoto");


const fotoPerfil =
document.getElementById("fotoPerfil");




// Carregar foto salva

const fotoSalva =
localStorage.getItem("fotoPerfil");



if(fotoSalva){

    fotoPerfil.src =
    fotoSalva;

}




// Escolher nova foto

if(selecionarFoto){


    selecionarFoto.addEventListener(
    "change",
    ()=>{


        const arquivo =
        selecionarFoto.files[0];



        if(!arquivo){

            return;

        }



        const leitor =
        new FileReader();



        leitor.onload = function(e){


            const imagem =
            e.target.result;



            fotoPerfil.src =
            imagem;



            localStorage.setItem(

                "fotoPerfil",

                imagem

            );


        };



        leitor.readAsDataURL(arquivo);



    });


}
