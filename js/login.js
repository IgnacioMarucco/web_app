// arrayDatos simularia una base de datos con usuarios registrados. Para facilitar pruebas ya tiene un objeto.
export const arrayDatos = [{nombreReg: "Ignacio", telefonoReg: "12345", emailReg: "ignacio@mail.com", passwordReg: "1234"}];

const formularioReg = document.getElementById(`formularioReg`);
const formularioLogin = document.getElementById(`formularioLogin`);

const nombreReg = document.getElementById(`nombreReg`);
const telefonoReg = document.getElementById(`telefonoReg`);
const emailReg = document.getElementById(`emailReg`);
const passwordReg = document.getElementById(`passwordReg`);

const emailLogin = document.getElementById(`emailLogin`);
const passwordLogin = document.getElementById(`passwordLogin`);

const errorNombreReg = document.getElementById(`errorNombreReg`);
const errorTelefonoReg = document.getElementById(`errorTelefonoReg`);
const errorEmailReg = document.getElementById(`errorEmailReg`);
const errorPasswordReg = document.getElementById(`errorPasswordReg`);

const errorEmailLogin = document.getElementById(`errorEmailLogin`);

// Funcion registro
export const registro = (e) => {
  e.preventDefault();

  const datosRegistro = {
    nombreReg: nombreReg.value,
    telefonoReg: telefonoReg.value,
    emailReg: emailReg.value,
    passwordReg: passwordReg.value
  }
  arrayDatos.push(datosRegistro);
}

// Funcion login
export const login = (e) => {
  e.preventDefault();

  // Encontrar el usuario en la base de datos (arrayDatos) a partir de los datos ingresados.
  let usuario = arrayDatos.find((usuarioRegistrado) => usuarioRegistrado.emailReg === emailLogin.value);
  if(!usuario){
    errorEmailLogin.textContent = `La cuenta no existe.`;
      console.log(`El usuario no existe.`);
  } else if (usuario.passwordReg === passwordLogin.value){
      const nombreLogueado = document.getElementById(`nombreLogueado`);
      nombreLogueado.innerHTML = `${usuario.nombreReg}`;
      
      const loginBtn = document.getElementById(`loginBtn`);
      loginBtn.style.display = `none`;
      
      console.log(nombreLogueado.innerHTML);

  }else {
      console.log(`Contraseña incorrecta.`);
  }
}

// Validaciones para el formulario de Registro:
const validacionNombreReg = () => {
  if (!(nombreReg.value.length > 0)) {
    errorNombreReg.textContent = `Formato de nombre incorrecto.`;
  } else {
    errorNombreReg.textContent = ``;
  }
}

const validacionEmailReg = () => {
  if (!(emailReg.value.length > 0 && emailReg.value.includes(`@`) && emailReg.value.includes(`.`))) {
    errorEmailReg.textContent = `Formato de Email incorrecto.`;
  } else {
    errorEmailReg.textContent = ``;
  }
}

const validacionTelefonoReg = () => {
  if (!(telefonoReg.value.length > 0)) {
    errorTelefonoReg.textContent = `Formato de numero incorrecto.`;
  } else {
    errorTelefonoReg.textContent = ``;
  }
}

const validacionPasswordReg = () => {
  if (!(passwordReg.value.length > 0)) {
    errorPasswordReg.textContent = `Formato de contraseña incorrecto.`;
  } else {
    errorPasswordReg.textContent = ``;
  }
}

// Validacion login
const validacionEmailLogin = () => {
  if (!(emailLogin.value.length > 0 && emailLogin.value.includes(`@`) && emailLogin.value.includes(`.`))) {
		errorEmailLogin.textContent = `Formato de Email incorrecto.`;
	} else {
    errorEmailLogin.textContent = ``;
  }
}
// Event listeners
formularioReg.addEventListener(`submit`, registro);
formularioLogin.addEventListener(`submit`, login);

nombreReg.addEventListener(`blur`, validacionNombreReg);
telefonoReg.addEventListener(`blur`, validacionTelefonoReg);
emailReg.addEventListener(`blur`, validacionEmailReg);
passwordReg.addEventListener(`blur`, validacionPasswordReg);

emailLogin.addEventListener(`blur`, validacionEmailLogin);