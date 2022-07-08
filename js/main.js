//Segunda entrega de proyecto final: JSON + Storage + DOM + Eventos

import {arrayProductos} from './productos.js';
import { agregarCarro } from './carro.js';
import { mostrarCarro } from './carro.js';

import {arrayDatos, registro, login} from './usuario.js';

// Mostrar grilla de productos en el HTML:
const mostrarProductos = () => {
	let gridProductos = document.getElementById(`grid-productos`);
	gridProductos.innerHTML = ``;
	// Tomo como padre ese div, ahora genero a partir del arrayProductos una grid completa de productos.

	// Le agrego un filtro de productos
	filtrarProductos();
	let arrayProductosFiltrados = filtrarProductos();
	for (const producto of arrayProductosFiltrados) {
		let containerCard = document.createElement(`div`);

		containerCard.className = `col`;
		containerCard.innerHTML = `<div class="card align-items-center">
									<h4 class="card-title">${producto.nombre}</h4>
									<img class="card-img-top" src="../public/img_prod/${producto.id}.webp" alt="Imagen de ${producto.nombre}">
									<h6>$${producto.precio}</h6>
									<a id="${producto.id}" class="btn btn-primary btnAgregarCarro">Agregar al carro</a>
									<div>`;
		gridProductos.appendChild(containerCard);
	}

	if (arrayProductosFiltrados.length === 0) {
		gridProductos.innerHTML = `<h2>No hay coincidencias!</h2>`;
		console.log(`Sin coincidencias`);
	}

	// Agrego el event listener a cada boton (que tienen id unico), para pushear el producto comprado al arrayCarro
	const cardBtn = document.querySelectorAll(".btnAgregarCarro");
	cardBtn.forEach((boton) => boton.addEventListener("click", agregarCarro));
	cardBtn.forEach((boton) => boton.addEventListener("click", mostrarCarro));
}

// Funcion para filtrar los productos a mostrar:
const filtrarProductos = () => {
	let arrayProductosFiltrados = arrayProductos.filter(elemento => elemento.nombre.toLowerCase().includes(`${buscador.value.toLowerCase()}`));
	return arrayProductosFiltrados;
}
// Defino el campo de busqueda y le agrego el evento para mostrar los productos buscados.
const buscador = document.getElementById(`buscador`);
buscador.addEventListener(`input`, mostrarProductos);


window.onload = mostrarProductos();