const inputFoto =
document.getElementById("selecionarFoto");

const imagemCorte =
document.getElementById("imagemCorte");

const areaCorte =
document.getElementById("areaCorte");

const salvarFoto =
document.getElementById("salvarFoto");

const fotoPerfil =
document.getElementById("fotoPerfil");


let cropper;



inputFoto.addEventListener("change", function(){

    const arquivo = this.files[0];


    if(!arquivo){
        return;
    }



    const leitor = new FileReader();



    leitor.onload = function(e){


        imagemCorte.src = e.target.result;


        areaCorte.style.display = "block";

        salvarFoto.style.display = "block";



        if(cropper){

            cropper.destroy();

        }



        cropper = new Cropper(
            imagemCorte,
            {

                aspectRatio: 1,

                viewMode: 1,

                dragMode: "move",

                autoCropArea: 1

            }
        );


    };



    leitor.readAsDataURL(arquivo);


});





salvarFoto.addEventListener("click",()=>{


    if(!cropper){

        alert("Escolha uma foto primeiro");

        return;

    }



    const imagemFinal =
    cropper.getCroppedCanvas({

        width:300,

        height:300

    }).toDataURL();



    fotoPerfil.src = imagemFinal;


    localStorage.setItem(
        "fotoPerfil",
        imagemFinal
    );



    alert("Foto salva!");


});
