// arrayDatos simularia una base de datos con usuarios registrados. Para facilitar pruebas ya tiene un objeto.
export const arrayDatos = [{nombreReg: "Ignacio", telefonoReg: "12345", emailReg: "ignacio@mail.com", passwordReg: "1234"}];

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

const loginBtn = document.getElementById(`loginBtn`);
const cerrarSesionBtn = document.getElementById(`cerrarSesionBtn`);

// Funcion para guardar el nombre de usuario en local storage
const guardarUsuarioLS = (usuario) => {
  delete usuario.passwordReg;
	let usuarioJSON = JSON.stringify(usuario);
	localStorage.setItem(`usuarioLogueado`, usuarioJSON);
}

// Funcion para verificar si ya esta logueado el usuario o no
const estadoLogin = () => {
  let usuarioLogueado = JSON.parse(localStorage.getItem(`usuarioLogueado`));
  return usuarioLogueado;
}

// Funcion mostrar usuario:
export const mostrarUsuario = () => {
  let usuarioLogueado = estadoLogin();
  const nombreRenderizado = document.getElementById(`nombre`);
  if (usuarioLogueado) {
    nombreRenderizado.innerHTML = `${usuarioLogueado.nombreReg}` ;
    // Ocultar boton login
    
    loginBtn.style.display = `none`;
    // Desactivar boton registro
    let regBtn = document.getElementById(`regBtn`);
    regBtn.style.pointerEvents = "none";

    // Activar boton logout
    cerrarSesionBtn.style.display = `inline-block`;
  } else {
    nombreRenderizado.innerHTML = `Registrate`;
    // Desactivar boton logout
    cerrarSesionBtn.style.display = `none`;
    // Mostrar boton login

    loginBtn.style.display = `inline-block`;
  }
}

// Funcion registro
export const registro = (event) => {
  event.preventDefault();

  const datosRegistro = {
    nombreReg: nombreReg.value,
    telefonoReg: telefonoReg.value,
    emailReg: emailReg.value,
    passwordReg: passwordReg.value
  }
  arrayDatos.push(datosRegistro);

  // Ocultar Modal
  let modalReg = bootstrap.Modal.getInstance(document.getElementById('modalReg'));
  modalReg.hide();
}

// Funcion login
export const login = (event) => {
  event.preventDefault();

  // Encontrar el usuario en la base de datos (arrayDatos) a partir de los datos ingresados.
  let usuario = arrayDatos.find((usuarioRegistrado) => usuarioRegistrado.emailReg === emailLogin.value);
  if(!usuario){
    errorEmailLogin.textContent = `La cuenta no existe.`;
  } else if (usuario.passwordReg === passwordLogin.value){
      guardarUsuarioLS(usuario);
      mostrarUsuario();
      // Ocultar Modal
      let modalLogin = bootstrap.Modal.getInstance(document.getElementById('modalLogin'));
      modalLogin.hide();
  }else {
    let errorPasswordLogin = document.getElementById(`errorPasswordLogin`);
    errorPasswordLogin.textContent = 'Contraseña Incorrecta.'; 
  }
}

// Funcion cerrar sesion
const cerrarSesion = () => {
  let cerrarSesionBtn = document.getElementById(`cerrarSesionBtn`);
  localStorage.removeItem('usuarioLogueado');
  mostrarUsuario();
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
const formularioReg = document.getElementById(`formularioReg`);
formularioReg.addEventListener(`submit`, registro);
const formularioLogin = document.getElementById(`formularioLogin`);
formularioLogin.addEventListener(`submit`, login);

nombreReg.addEventListener(`blur`, validacionNombreReg);
telefonoReg.addEventListener(`blur`, validacionTelefonoReg);
emailReg.addEventListener(`blur`, validacionEmailReg);
passwordReg.addEventListener(`blur`, validacionPasswordReg);

emailLogin.addEventListener(`blur`, validacionEmailLogin);

cerrarSesionBtn.addEventListener('click', cerrarSesion);