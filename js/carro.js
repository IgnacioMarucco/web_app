import {arrayProductos} from './productos.js';

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
export const agregarAlCarro = (event) => {
  let identificador = Number(event.target.id);
  // Este es el producto que voy a pushear al arrayCarro y modificar su cantidad.
  let producto = arrayProductos.find((element) => element.id == identificador);

  // obtengo el formato elegido del producto elegido por el usuario. Si utilizara como value el precio, podria tener dos formatos con el mismo precio, por eso tengo un id unico para cada formato. (formato.id) en la funcion mostrarFormatos.
  let formatoElegido = document.querySelector(`input[name="precioProducto${producto.id}"]:checked`).value;
  // Modificar la cantidad: si no existe, pushearlo y agregar una unidad. Si ya existe solo agregarle una unidad.
	if (!(arrayCarro.some((element) => element.id == identificador))){
    arrayCarro.push(producto);
    arrayCarro[arrayCarro.length - 1].formatos[formatoElegido].cantidad++;
	} else {
    arrayCarro.find((element)=> element.id == identificador).formatos[formatoElegido].cantidad++;
	}
  

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
	let containerList = document.getElementById(`lista-carro`);
	containerList.innerHTML = ``;
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

        containerList.appendChild(itemCarro);
      }
    }

		const eliminarBtn = document.querySelectorAll(".btnEliminarCarro");
		eliminarBtn.forEach((boton) => boton.addEventListener("click", eliminarDelCarro));
	}


  // Mostrar el total a pagar:




  let costoTotal = costoTotalFuncion();
	let total = document.createElement(`div`);
	total.setAttribute("id", `total`);
	total.className = `d-flex flex-column`
	total.innerHTML = `<p>Total: $${costoTotal}</p>
                    <div class="d-flex flex-row justify-content-center">
                      <a id="comprarBtn" class="btn btn-success">Comprar ahora!</a>
                      <a id="vaciarCarroBtn" class="btn btn-danger">Vaciar Carro</a>
                    </div>`;
	
	containerList.appendChild(total);
	
	const comprarBtn = document.querySelector("#comprarBtn");
	comprarBtn.addEventListener('click', calcularCuotas);

  const vaciarCarroBtn = document.getElementById(`vaciarCarroBtn`);
  vaciarCarroBtn.addEventListener(`click`, vaciarCarro); 
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
  arrayCarro = [];

  guardarCarro();
  mostrarCarro();
}

// Funcion para calcular el monto de las cuotas
const calcularCuotas = () => {
	let costoTotal = costoTotalFuncion();
	let cantidadCuotas = Number(prompt(`¿En cuantas cuotas desea realizar la compra de $${costoTotal}? (3, 6 o 12 cuotas)`));
	if (!(cantidadCuotas == 3 || cantidadCuotas == 6 || cantidadCuotas == 12)) {
		alert(`Ingrese una cantidad de cuotas valida.`);
		calcularCuotas();
	} else {
		let costoCuota = costoTotal / cantidadCuotas;
		let total = document.getElementById(`total`);

		total.innerHTML = `<p>Total: $${costoTotal}</p>
                      <p>Tu compra sera en ${cantidadCuotas} cuotas de $${costoCuota.toFixed(2)}</p>`;
	}
}

// Funcion para calcular el costo total al usuario:
export const costoTotalFuncion = () => {
  let costoTotal = 0; 

  arrayCarro.forEach((producto) => {
    costoTotal += producto?.formatos.reduce((acumulador,formato) => acumulador + Number(formato.precio) * Number(formato.cantidad), 0)
  })
  return costoTotal;

}