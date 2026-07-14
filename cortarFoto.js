// =============================
// Corte de foto de perfil
// Contabilize AI
// =============================


const inputFoto =
document.getElementById("selecionarFoto");


const imagemCorte =
document.getElementById("imagemCorte");


const salvarFoto =
document.getElementById("salvarFoto");


const fotoPerfil =
document.getElementById("fotoPerfil");



let cropper;



// Escolher imagem

inputFoto.addEventListener(
"change",
function(e){


const arquivo =
e.target.files[0];


if(!arquivo){

return;

}



const leitor =
new FileReader();



leitor.onload = function(event){


imagemCorte.src =
event.target.result;



if(cropper){

cropper.destroy();

}



cropper = new Cropper(
imagemCorte,
{

aspectRatio:1,

viewMode:1,

dragMode:"move",

autoCropArea:1

}
);



};



leitor.readAsDataURL(arquivo);



});





// Salvar corte

salvarFoto.addEventListener(
"click",
()=>{


if(!cropper){

alert("Escolha uma foto primeiro.");

return;

}



const imagemFinal =
cropper.getCroppedCanvas({

width:300,

height:300

})
.toDataURL();



fotoPerfil.src =
imagemFinal;



localStorage.setItem(
"fotoPerfil",
imagemFinal
);



alert(
"Foto atualizada!"
);



});
