export const arrayDatos = [];

// Funcion registro
export const registro = (e) => {
    e.preventDefault();
    const nombreReg = document.getElementById(`nombreReg`).value;
    const telefonoReg = document.getElementById(`telefonoReg`).value;
    const emailReg = document.getElementById(`emailReg`).value;
    const passwordReg = document.getElementById(`passwordReg`).value;

    const datosRegistro = {
        nombreReg,
        telefonoReg,
        emailReg,
        passwordReg
    }

    const datosRegistroJSON = JSON.stringify(datosRegistro);
    
    localStorage.setItem(`datosRegistro`, datosRegistroJSON);
    arrayDatos.push(datosRegistro);
    const arrayDatosJSON = JSON.stringify(arrayDatos);
    localStorage.setItem(`arrayDatos`, arrayDatosJSON);
}


// Funcion login
export const login = (e) => {
    e.preventDefault(); 

    const emailLogin = document.getElementById(`emailLogin`).value;
    const passwordLogin = document.getElementById(`passwordLogin`).value;

    const datosRegistro = JSON.parse(localStorage.getItem(`arrayDatos`));
    console.log(datosRegistro);

    let usuario = datosRegistro.find((usuarioRegistrado) => usuarioRegistrado.emailReg == emailLogin);
    console.log(usuario)
    if(!usuario){
        console.log(`Datos ingresados incorrectos.`);
    } else if (usuario.passwordReg == passwordLogin){
        const nombreLogueado = document.getElementById(`nombreLogueado`);
        nombreLogueado.innerHTML = `${usuario.nombreReg}`;
        console.log(nombreLogueado.innerHTML)
    }else {
        console.log(`Datos ingresados incorrectos.`);
    }
}

const formularioReg = document.getElementById(`formularioReg`);
formularioReg.addEventListener(`submit`, registro);
const formularioLogin = document.getElementById(`formularioLogin`);
formularioLogin.addEventListener(`submit`, login);

// Validaciones test:
// const emailLogin = document.getElementById(`emailLogin`);
// const passwordLogin = document.getElementById(`passwordLogin`);


// emailLogin.addEventListener(`blur`, () => {
//     const error = document.getElementById(`errorEmailLogin`);
//     if(emailLogin.value.length > 0 && emailLogin.value.includes(`@`) && emailLogin.value.includes(`.`)){
//         error.innerHTML = ``;
//     } else {
//         error.innerHTML = `Formato de Email incorrecto`;
//     }
// })


// passwordLogin.addEventListener(`blur`, () => {
//     const error = document.getElementById(`errorPasswordLogin`);
//     if(passwordLogin.value.length > 0){
//         error.innerHTML = ``;
//     } else {
//         error.innerHTML = `Formato de contraseña incorrecto.`;
//     }
// });
