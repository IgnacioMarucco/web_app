// import {arrayProductos} from './productos.js';

// Array de productos del carro
let arrayCarro = [];

// Funcion para verificar si existe ya un carrito de compras, si es asi, tomar sus valores.
export const existeCarro = () => {
  arrayCarro = JSON.parse(localStorage.getItem(`arrayCarro`)) || [];
  mostrarCarro();
}

// Funcion para guardar el carro en local storage
const guardarCarro = () => {
	let arrayCarroJSON = JSON.stringify(arrayCarro);
	localStorage.setItem(`arrayCarro`, arrayCarroJSON);
}

// Funcion agregar al carro el producto elegido por el usuario. 
export const agregarAlCarro = (event, data) => {
  let identificador = Number(event.target.id);
  // Este es el producto que voy a pushear al arrayCarro y modificar su cantidad.
  let producto = data.find((element) => element.id == identificador);

  // obtengo el formato elegido del producto elegido por el usuario. Si utilizara como value el precio, podria tener dos formatos con el mismo precio, por eso tengo un id unico para cada formato. (formato.id) en la funcion mostrarFormatos.
  let formatoElegido = document.querySelector(`input[name="precioProducto${producto.id}"]:checked`).value;
  // Modificar la cantidad: si no existe, pushearlo y agregar una unidad. Si ya existe solo agregarle una unidad.
	if (!(arrayCarro.some((element) => element.id == identificador))){
    console.log(arrayCarro[0]);
    arrayCarro.push(producto);
    console.log(arrayCarro[0].formatos[formatoElegido-1]);
    arrayCarro[arrayCarro.length - 1].formatos[formatoElegido-1].cantidad = 1;
    console.log(arrayCarro[0]);
	} else {
    arrayCarro.find((element)=> element.id == identificador).formatos[formatoElegido-1].cantidad++;
    console.log(arrayCarro);
	}
  // Notificacion:
  Toastify({
      text: `Agregaste ${producto.nombre} al carro.`,
      duration: 3500,
      offset: {
        y: '5em'
      },
      close: true,
      style: {
        color: '#000',
        background: '#fcab31',
      }
    }).showToast();

  guardarCarro();
  mostrarCarro();
}

// Funcion para eliminar elementos del carro
export const eliminarDelCarro = (event) => {
  const identificadores = event.target.id.split('-');

  const [identificadorProducto, identificadorFormato] = identificadores;

  // Identifico el producto a eliminar (no su formato)
  let productoAEliminar = arrayCarro.find((producto) => producto.id === Number(identificadorProducto));

  // Identifico el formato del producto a eliminar.
  const formatoAEliminar = productoAEliminar.formatos.find((formato) => formato.id === Number(identificadorFormato));

  // Modifico la cantidad a 0 DE ESE FORMATO en particular
  formatoAEliminar.cantidad = 0;

  // Itero sobre los formatos de cada producto, si todas las cantidades son 0, lo elimino al producto del array
  let cantidadDelMismoProducto = 0;
  for (const formato of productoAEliminar.formatos) {
    cantidadDelMismoProducto += formato.cantidad;
  }

  // Eliminar el producto:
  const eliminarProducto = () => {
    arrayCarro = arrayCarro.filter((producto) => producto.id != Number(identificadorProducto));
    return arrayCarro;
  }
  cantidadDelMismoProducto === 0 && eliminarProducto();

	guardarCarro();
	mostrarCarro();
}

// Funcion para mostrar en HTML el carro de compras 
export const mostrarCarro = () => {
  // Mostrar productos:
	let carro = document.getElementById(`carro`);
	carro.innerHTML = ``;
  cantidadCarroFuncion();
	for (const producto of arrayCarro) {
    for (const formato of producto.formatos) {
      let itemCarro = document.createElement(`div`);
      itemCarro.className = `d-flex flex-row justify-content-between`;  
      if (formato.cantidad > 0) {
        // Desestructuracion objeto formato
        const {peso, precio, cantidad } = formato;
        itemCarro.innerHTML += 
          `<p>${producto.nombre}</p><p>${peso} gramos</p><p>$${precio} c/u</p><p>Cantidad: ${cantidad}</p>
          <a  href="#">
            <i class="bi bi-x-square-fill btnEliminarCarro" id="${producto.id}-${formato.id}" ></i>
          </a><br>`;

        carro.appendChild(itemCarro);
      }
    }

		const eliminarBtn = document.querySelectorAll(".btnEliminarCarro");
		eliminarBtn.forEach((boton) => boton.addEventListener("click", eliminarDelCarro));
	}


  // Mostrar el total a pagar:
  let costoTotal = costoTotalFuncion();
  let botonesCarro = document.createElement(`div`);
  let total = document.createElement(`div`);
  botonesCarro.className = `d-flex flex-row justify-content-center`
  botonesCarro.innerHTML = 
  `<a id="pedirCantidadCuotasBtn" class="btn btn-success">Continuar</a>
  <a id="vaciarCarroBtn" class="btn btn-danger">Vaciar Carro</a>`;

	total.innerHTML = `<p>Total: $${costoTotal}</p>`;
	
	// carro.appendChild(total);
  carro.appendChild(botonesCarro);
  carro.appendChild(total);

  // Ocultar  botones si no hay productos en el  carro:
  arrayCarro.length === 0 && botonesCarro.setAttribute('style', 'display:none !important');
	
	const pedirCantidadCuotasBtn = document.querySelector("#pedirCantidadCuotasBtn");
	pedirCantidadCuotasBtn.addEventListener('click', definirCuotas);
  pedirCantidadCuotasBtn.addEventListener('click', () => {pedirCantidadCuotasBtn.setAttribute('style', 'display:none !important')});

  const vaciarCarroBtn = document.getElementById(`vaciarCarroBtn`);
  vaciarCarroBtn.addEventListener(`click`, () => {
    // Funcion que muestra un mensaje de confirmacion para vaciar el carro


    Swal.fire({
      title: '¿Estas seguro que quieres vaciar el carro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        vaciarCarro();
      }
    })
  } ); 
}

// Funcion para mostrar la cantidad de elementos del carro en el HTML
const cantidadCarroFuncion = () => {
  const cantidadCarroTexto = document.getElementById(`cantidadCarro`);
  
  let cantidadProductos = 0;
  arrayCarro.forEach((producto) => {
    cantidadProductos += producto?.formatos.reduce((acumulador,formato) => acumulador + Number(formato.cantidad), 0)
  })
  cantidadCarroTexto.innerHTML = `(${cantidadProductos})`;
}

// Funcion para vaciar el carro:
const vaciarCarro = () => {
  let cuotasTexto = document.getElementById(`cuotas`);
  cuotasTexto.innerHTML = ``;
  arrayCarro = [];
  localStorage.clear();
  guardarCarro();
  mostrarCarro();
}

// Funcion para calcular el costo total al usuario:
export const costoTotalFuncion = () => {
  let costoTotal = 0; 

  arrayCarro.forEach((producto) => {
    costoTotal += producto?.formatos.reduce((acumulador,formato) => acumulador + Number(formato.precio) * Number(formato.cantidad), 0)
  })
  return costoTotal;

}

// Funcion Para mostrar los medios de pago, cuotas, direccion.
function definirCuotas() {
  let cuotasTexto = document.getElementById(`cuotas`);
  cuotasTexto.innerHTML = 
  `<fieldset>
    <legend>Elegi en cuantas cuotas deseas realizar el pago:</legend>

    <div>
      <input type="radio" id="1" name="cuotas" value="1" checked>
      <label for="1">Pago Unico</label>
    </div>

    <div>
      <input type="radio" id="3-cuotas" name="cuotas" value="3">
      <label for="3-cuotas">3 Cuotas</label>
    </div>

    <div>
      <input type="radio" id="6-cuotas" name="cuotas" value="6">
      <label for="6-cuotas">6 Cuotas</label>
    </div>

    <div>
      <input type="radio" id="12-cuotas" name="cuotas" value="12">
      <label for="12-cuotas">12 Cuotas</label>
    </div>
  </fieldset>
  <a id="mostrarCuotasBtn" type="submit" class="btn btn-success">Continuar</a>`;

  let mostrarCuotasBtn = document.getElementById(`mostrarCuotasBtn`);

  mostrarCuotasBtn.addEventListener('click', () => {
    let {costoTotal, cantidadCuotas, costoCuota} = calcularCuotas();
    Swal.fire({
      title: '¿Estas seguro que quieres finalizar la compra?',
      text: `Total: $${costoTotal}. Tu compra sera en ${cantidadCuotas} cuotas de $${costoCuota.toFixed(2)}`,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Compra Realizada!',
          'Gracias por confiar en nosotros.',
          'success'
        );

        cuotasTexto.innerHTML = ``;
        vaciarCarro();
      }
    })
  });
}

// Funcion para calcular el monto de las cuotas
const calcularCuotas = () => {
	let costoTotal = costoTotalFuncion();
	let cantidadCuotas = Number(document.querySelector(`input[name="cuotas"]:checked`).value);
  let costoCuota = costoTotal / cantidadCuotas;
  return {costoTotal, cantidadCuotas, costoCuota};
}