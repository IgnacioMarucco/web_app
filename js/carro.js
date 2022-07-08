import {arrayProductos} from './productos.js';

// Array de productos del carro
let arrayCarro = [];

// Funcion para calcular el monto de las cuotas
const calcularCuotas = () => {
	let cantidadCuotas = Number(prompt(`¿En cuantas cuotas desea realizar la compra de $${costoTotalFuncion()}? (3, 6 o 12 cuotas)`));
	if (!(cantidadCuotas == 3 || cantidadCuotas == 6 || cantidadCuotas == 12)) {
		alert(`Ingrese una cantidad de cuotas valida.`);
		calcularCuotas();
	} else {
		let costoCuota = costoTotalFuncion() / cantidadCuotas;
		let total = document.getElementById(`total`);

		total.innerHTML = `<p>Total: $${costoTotalFuncion()}</p>
                      <p>Tu compra sera en ${cantidadCuotas} cuotas de $${costoCuota.toFixed(2)}</p>`;
	}
}

// Funcion para calcular el costo total al usuario:
export const costoTotalFuncion = () => {
	let costoTotal = arrayCarro.reduce((acumulador, elemento) => acumulador + elemento.precio * elemento.cantidad, 0);
  return costoTotal;
}

// Funcion para agregar al array del carro los productos elegidos por el usuario
export const agregarCarro = (event) => {
	let identificador = Number(event.target.id);
	if (!(arrayCarro.some((element) => element.id == identificador))){
		arrayCarro.push(arrayProductos.find((element) => element.id == identificador));
		arrayCarro.find((element) => element.id == identificador).cantidad = 1;
	} else {
		arrayCarro.find((element)=> element.id == identificador).cantidad += 1;
	}
  cantidadCarroFuncion();
}

// Funcion para eliminar elementos del carro
export const eliminarCarro = (event) => {
	let identificador = Number(event.target.id.slice(7));

	arrayCarro = arrayCarro.filter((element) => element.id != identificador);
	
	mostrarCarro();
  cantidadCarroFuncion();
}

// Funcion para mostrar en HTML el carro de compras 
export const mostrarCarro = () => {
	costoTotalFuncion();
	let containerList = document.getElementById(`lista-carro`);
	containerList.innerHTML = ``;
	for (const producto of arrayCarro) {
		let itemCarro = document.createElement(`div`);

		itemCarro.className = `d-flex flex-row justify-content-between`;
		itemCarro.innerHTML = `<p>${producto.nombre}</p><p>$${producto.precio} c/u</p><p>Cantidad: ${producto.cantidad}</p><a  href="#"><i class="bi bi-x-square-fill btnEliminarCarro" id="remove-${producto.id}" ></i></a><br>`;

		containerList.appendChild(itemCarro);

		const eliminarBtn = document.querySelectorAll(".btnEliminarCarro");
		eliminarBtn.forEach((boton) => boton.addEventListener("click", eliminarCarro));
	}
	let total = document.createElement(`div`);
	total.setAttribute("id", `total`);
	total.className = `d-flex flex-column`
	total.innerHTML = `<p>Total: $${costoTotalFuncion()}</p>
						<a id="comprarBtn" class="btn btn-success">Comprar ahora!</a>`;
	
	containerList.appendChild(total);

	
	const comprarBtn = document.querySelector("#comprarBtn");
	comprarBtn.addEventListener('click', calcularCuotas);
}


