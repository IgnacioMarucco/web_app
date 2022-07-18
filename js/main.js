//Segunda entrega de proyecto final: JSON + Storage + DOM + Eventos
import {arrayProductos} from './productos.js';
import { agregarAlCarro, mostrarCarro, existeCarro } from './carro.js';
import {arrayDatos, registro, login} from './login.js';


// Funcion para obtener los formatos de cada producto
const mostrarFormatos = (id) => {
  const producto = arrayProductos.find((producto) => producto.id == id);

  const formatosTexto = document.createElement(`div`);
	formatosTexto.innerHTML = `Formatos: <br>`;
	
  const productoFormatos = producto.formatos;
  
  productoFormatos.forEach((formato) => {
		formatosTexto.innerHTML += `<label for="${formato.peso}">${formato.peso} gr Precio: $${formato.precio}</label><input type="radio" name="precioProducto${producto.id}" value="${formato.id}" checked="checked"><br>`;
  })

	return formatosTexto;
}

// Mostrar grid de productos en el HTML manipulando el DOM:
const mostrarProductos = () => {
	let gridProductos = document.getElementById(`grid-productos`) || document.getElementById(`grid-destacados`);
  // reseteo el contenido, para limpiarlo cada vez que filtro los productos a mostrar.
	gridProductos.innerHTML = ``;

	// Elijo que productos motrar
	let arrayProductosFiltrados = filtrarProductos();

	// Ahora creo las cards de cada producto a partir del array de productos filtrados.
	for (const producto of arrayProductosFiltrados) {
		let containerCard = document.createElement(`div`);
		containerCard.className = `col`;


		let formatos = mostrarFormatos(producto.id);

		containerCard.innerHTML = 
      `<div class="card align-items-center">
      <h4 class="card-title">${producto.nombre}</h4>
      <img class="card-img-top" src="../public/img_prod/${producto.id}.webp" alt="Imagen de ${producto.nombre}">
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalDetalles${producto.id}">Ver Detalles</button>

      <div class="modal fade" id="modalDetalles${producto.id}" tabindex="-1" aria-labelledby="modalLabel${producto.id}" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="modalLabel${producto.id}">${producto.nombre}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <img src="../public/img_prod/${producto.id}.webp" alt="Imagen de ${producto.nombre}">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus sapiente, eos labore, ullam illo similique beatae ab necessitatibus reiciendis ipsum nemo libero consequuntur. Cumque assumenda ab iusto temporibus nam ipsa.</p>
              ${formatos.innerHTML}
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
              <button type="button"  id="${producto.id}" class="btn btn-primary btnAgregarAlCarro">Agregar al Carro</button>
            </div>
          </div>
        </div>
      </div>


      <div>`;
		gridProductos.appendChild(containerCard);
	}

	if (arrayProductosFiltrados.length === 0) {
		gridProductos.innerHTML = `<h2>No hay coincidencias!</h2>`;
	}

	// Agrego el event listener a cada boton (que tienen id unico), para pushear el producto comprado al arrayCarro
	const modalAgregarAlCarroBtn = document.querySelectorAll(".btnAgregarAlCarro");
	modalAgregarAlCarroBtn.forEach((boton) => boton.addEventListener("click", agregarAlCarro));
}

// Funcion para filtrar los productos a mostrar:
const filtrarProductos = () => {
  let arrayProductosFiltrados = [];
	// Defino el campo de busqueda y le agrego el evento para mostrar los productos buscados. 
	const buscador = document.getElementById(`buscador`);
	const buscadorBtn = document.getElementById(`buscadorBtn`);
	if(buscadorBtn && buscador) {
    buscadorBtn.addEventListener(`click`, mostrarProductos);
    arrayProductosFiltrados = arrayProductos.filter(producto => producto.nombre.toLowerCase().includes(`${buscador.value.toLowerCase()}`));
  } else {
    arrayProductosFiltrados = arrayProductos.filter((producto) => producto.destacado === true);
  }
	return arrayProductosFiltrados;
}

window.onload = mostrarProductos();

window.onload = existeCarro();