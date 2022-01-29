"use strict";

function captcha(){
    let numerorandom = Math.floor((Math.random()*1000)+1);
    let valorcaptcha = document.getElementById("captcha");
    valorcaptcha.value = numerorandom;
}
captcha();

function validar(){
    event.preventDefault();
    let captchausuario = document.getElementById("captcha-usuario");
    let inputusuario = captchausuario.value;
    let valorrandom = document.getElementById("captcha").value;

    if (inputusuario == valorrandom){ 
        let formularioenviado = document.getElementById("formularioenviado");
        formularioenviado.innerHTML = "El formulario ha sido enviado correctamente!";
  
    }else{
        let error = document.getElementById("error");
        error.innerHTML = "Captcha incorrecto, intentelo de nuevo!";
    }
    
    captcha();
}

let btn = document.getElementById("enviar");
btn.addEventListener("click", validar);