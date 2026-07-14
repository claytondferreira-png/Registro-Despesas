const fotoPerfil = document.getElementById("fotoPerfil");
const menuPerfil = document.getElementById("menuPerfil");


if(fotoPerfil && menuPerfil){


    fotoPerfil.addEventListener("click", function(event){

        event.stopPropagation();


        if(menuPerfil.style.display === "block"){

            menuPerfil.style.display = "none";

        } else {

            menuPerfil.style.display = "block";

        }

    });



    document.addEventListener("click", function(){

        menuPerfil.style.display = "none";

    });


}
