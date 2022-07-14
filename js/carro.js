import {arrayProductos} from './productos.js';

// Array de productos del carro
let arrayCarro = [];

// Funcion para verificar si existe ya un carrito de compras, si es asi, tomar sus valores.
export const existeCarro = () => {
	let arrayCarroLS = JSON.parse(localStorage.getItem(`arrayCarro`));
	if(arrayCarroLS) {
		arrayCarro = arrayCarroLS;
		mostrarCarro();
	}
}

const guardarCarro = () => {
	let arrayCarroJSON = JSON.stringify(arrayCarro);
	localStorage.setItem(`arrayCarro`, arrayCarroJSON);
}

// Funcion para agregar al array del carro los productos elegidos por el usuario
export const agregarCarro = (event) => {
	let identificador = Number(event.target.id);

  // Este es el producto que voy a modificar la cantidad en el array de arrays con formatos
  let producto = arrayProductos.find((element) => element.id == identificador);

  // obtengo el formato elegido del producto elegido por el usuario. Utilizo el valor elegido por el usuario, que es un index. Si utilizara como value el precio, podria tener dos formatos con el mismo precio.
  let formatoElegido = document.querySelector(`input[name="precioProducto${producto.id}"]:checked`).value;
  // console.log(formatoElegido);

  // este es el precio elegido
  // let peso = producto.formatos[formatoElegido][0];
  // let precio = producto.formatos[formatoElegido][1];
  let cantidad = producto.formatos[formatoElegido][2];
  console.log(peso, precio, cantidad)

  //Modifico la cantidad (el tercer elemento de cada array en el array de arrays con los formatos) Busco coincidencia entre el precio elegido por el usuario, con la segunda posicion en cada array. (los precios son unicos en cada producto)

  // console.log(arrayProductos)
  // producto.calcularCosto();

  // Modificar la cantidad, codigo viejo (creo)
	if (!(arrayCarro.some((element) => element.id == identificador))){
		// arrayCarro.push(arrayProductos.find((element) => element.id == identificador));

    arrayCarro.push(producto);
    arrayCarro[arrayCarro.length-1].formatos[formatoElegido][2] = 1;
    
    // console.log(arrayCarro[length-1]);
    
		// arrayCarro.find((element) => element.id == identificador).cantidad = 1;
    // arrayCarro.find((element) => element.id == identificador).precio = precio;
	} else {
		arrayCarro.find((element)=> element.id == identificador).formatos[formatoElegido][2] += 1;
	}

  // Modificar la cantidad, codigo viejo (creo)
	// if (!(arrayCarro.some((element) => element.id == identificador))){
	// 	arrayCarro.push(arrayProductos.find((element) => element.id == identificador));
	// 	arrayCarro.find((element) => element.id == identificador).cantidad = 1;
  //   arrayCarro.find((element) => element.id == identificador).precio = precio;
	// } else {
	// 	arrayCarro.find((element)=> element.id == identificador).cantidad += 1;
	// }
	
  console.log(arrayCarro)
	guardarCarro();
	mostrarCarro();
}

// Funcion para eliminar elementos del carro
export const eliminarCarro = (event) => {
	let identificador = Number(event.target.id.slice(7));
	arrayCarro = arrayCarro.filter((element) => element.id != identificador);

	guardarCarro();
	mostrarCarro();
}

// Funcion para mostrar en HTML el carro de compras 
export const mostrarCarro = () => {
	let costoTotal = costoTotalFuncion();
	let containerList = document.getElementById(`lista-carro`);
	containerList.innerHTML = ``;
  cantidadCarroFuncion();
	for (const producto of arrayCarro) {
		let itemCarro = document.createElement(`div`);

		itemCarro.className = `d-flex flex-row justify-content-between`;
		itemCarro.innerHTML = `<p>${producto.nombre}</p><p>$${producto.precio} c/u</p><p>Cantidad: ${producto.cantidad}</p>
                        <a  href="#">
                          <i class="bi bi-x-square-fill btnEliminarCarro" id="remove-${producto.id}" ></i>
                        </a><br>`;

		containerList.appendChild(itemCarro);

		const eliminarBtn = document.querySelectorAll(".btnEliminarCarro");
		eliminarBtn.forEach((boton) => boton.addEventListener("click", eliminarCarro));
	}
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
  let cantidadCarro = arrayCarro.length;
  cantidadCarroTexto.innerHTML = `(${cantidadCarro})`;
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
	let costoTotal = arrayCarro.reduce((acumulador, elemento) => acumulador + elemento.precio * elemento.cantidad, 0);
  return costoTotal;
}