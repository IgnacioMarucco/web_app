//Segunda entrega de proyecto final: JSON + Storage + DOM + Eventos
import {arrayProductos} from './productos.js';
import { agregarCarro } from './carro.js';
import { mostrarCarro } from './carro.js';
import {arrayDatos, registro, login} from './usuario.js';


// // Funcion para obtener los formatos de cada producto
// const mostrarFormatos2 = (id) => {
// 	const formatoTexto = document.createElement(`div`);
// 	formatoTexto.innerHTML = `Formatos: <br>`;
// 	const producto = arrayProductos.find((producto) => producto.id == id);
// 	console.log(`producto ${id}`,producto);

// 	// console.log(producto);
// 	const productoFormatos = producto.formatos;
// 	// console.log(productoFormatos);
// 	productoFormatos.forEach((formato) => {
// 		// console.log(formato[0]);
// 		// console.log(formato[1]);
// 		formatoTexto.innerHTML += `<span><label for="${formato[1]}">${formato[0]} gr Precio: $${formato[1]}</label><input type="radio" name="precioProducto${producto.id}" value="${formato[1]}"><span>`;
// 	});
// 	// console.log(formatoTexto)
// 	return formatoTexto;
// }

// Mostrar grid de productos en el HTML manipulando el DOM:
const mostrarProductos = () => {
	let gridProductos = document.getElementById(`grid-productos`);
	gridProductos.innerHTML = ``;

	// Le agrego un filtro de productos
	let arrayProductosFiltrados = filtrarProductos();

	// Ahora creo las cards de cada producto a partir del array de productos filtrados.
	for (const producto of arrayProductosFiltrados) {
		let containerCard = document.createElement(`div`);
		containerCard.className = `col`;

		// let formatos = mostrarFormatos2(producto.id);
		// console.log(`prueba`, formatos)

		containerCard.innerHTML = `<div class="card align-items-center">
									<h4 class="card-title">${producto.nombre}</h4>
									<img class="card-img-top" src="../public/img_prod/${producto.id}.webp" alt="Imagen de ${producto.nombre}">
									<h6>$${producto.precio}</h6>
									<!--- {formatos.innerHTML} -->
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
	cardBtn.forEach((boton) => boton.addEventListener("click", mostrarCarro));
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





// Funcion para mostrar los formatos disponibles de cada producto en cada card:
// const mostrarFormatos = () => {
// 	// arrayProductos.forEach((producto)=> console.log(producto));
// 	arrayProductos.forEach((producto) => {
// 		producto.formatos.forEach((formato)=> {
// 			console.log(formato);
// 		})
// 	})
// }
// mostrarFormatos();