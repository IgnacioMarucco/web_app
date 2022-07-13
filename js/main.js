//Segunda entrega de proyecto final: JSON + Storage + DOM + Eventos
import {arrayProductos} from './productos.js';
import { agregarCarro, mostrarCarro,existeCarro } from './carro.js';
import {arrayDatos, registro, login} from './login.js';

// Mostrar grid de productos en el HTML manipulando el DOM:
const mostrarProductos = () => {
	let gridProductos = document.getElementById(`grid-productos`);
  // reseteo el contenido, para limpiarlo cada vez que filtro los productos a mostrar.
	gridProductos.innerHTML = ``;

	// Le agrego un filtro de productos
	let arrayProductosFiltrados = filtrarProductos();

	// Ahora creo las cards de cada producto a partir del array de productos filtrados.
	for (const producto of arrayProductosFiltrados) {
		let containerCard = document.createElement(`div`);
		containerCard.className = `col`;


		containerCard.innerHTML = 
      `<div class="card align-items-center">
      <h4 class="card-title">${producto.nombre}</h4>
      <img class="card-img-top" src="../public/img_prod/${producto.id}.webp" alt="Imagen de ${producto.nombre}">
      <h6>$${producto.precio}</h6>
      <a id="${producto.id}" class="btn btn-primary btnAgregarCarro">Agregar al carro</a>
      <div>`;
		gridProductos.appendChild(containerCard);
	}

	if (arrayProductosFiltrados.length === 0) {
		gridProductos.innerHTML = `<h2>No hay coincidencias!</h2>`;
	}

	// Agrego el event listener a cada boton (que tienen id unico), para pushear el producto comprado al arrayCarro
	const cardBtn = document.querySelectorAll(".btnAgregarCarro");
	cardBtn.forEach((boton) => boton.addEventListener("click", agregarCarro));
}

// Funcion para filtrar los productos a mostrar:
const filtrarProductos = () => {
	// Defino el campo de busqueda y le agrego el evento para mostrar los productos buscados.
	const buscador = document.getElementById(`buscador`);
	const buscadorBtn = document.getElementById(`buscadorBtn`);
	buscadorBtn.addEventListener(`click`, mostrarProductos);
	let arrayProductosFiltrados = arrayProductos.filter(elemento => elemento.nombre.toLowerCase().includes(`${buscador.value.toLowerCase()}`));
	return arrayProductosFiltrados;
}

window.onload = mostrarProductos();

window.onload = existeCarro();