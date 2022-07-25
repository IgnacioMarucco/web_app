// import {arrayProductos} from './productos.js';
import { agregarAlCarro, mostrarCarro, existeCarro } from './carro.js';
import {arrayDatos, registro, login} from './login.js';

// Funcion para obtener los formatos de cada producto
const obtenerFormatos = (data_productos, id) => {
  const producto = data_productos.find((producto) => producto.id == id);

  const formatosTexto = document.createElement(`div`);
	formatosTexto.innerHTML = `Formatos: <br>`;
	
  const productoFormatos = producto.formatos;
  
  productoFormatos.forEach((formato) => {
		formatosTexto.innerHTML += `<label for="${formato.peso}">${formato.peso} gr Precio: $${formato.precio}</label><input type="radio" name="precioProducto${producto.id}" value="${formato.id}" checked="checked"><br>`;
  })

	return formatosTexto;
}

// Mostrar grid de productos en el HTML manipulando el DOM:
export const mostrarProductos = (data_productos) => {
	let gridProductos = document.getElementById(`grid-productos`) || document.getElementById(`grid-destacados`);
  // reseteo el contenido, para limpiarlo cada vez que filtro los productos a mostrar.
	gridProductos.innerHTML = ``;

	// Elijo que productos motrar
	let {arrayProductosFiltrados, rutaImagen} = filtrarProductos(data_productos);

	// Ahora creo las cards de cada producto a partir del array de productos filtrados.
	for (const producto of arrayProductosFiltrados) {
		let containerCard = document.createElement(`div`);
		containerCard.className = `col`;

    // Obtengo los formatos de cada producto, con el respectivo precio y caracteristicas.
		let formatos = obtenerFormatos(data_productos, producto.id);

    // Defino el contenido de cada card.
		containerCard.innerHTML = 
      `<div class="card align-items-center text-center">
        <h4 class="card-title">${producto.nombre}</h4>
        <img class="card-img-top" src="${rutaImagen}${producto.id}.webp" alt="Imagen de ${producto.nombre}">
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalDetalles${producto.id}">Ver Detalles</button>

        <div class="modal fade" id="modalDetalles${producto.id}" tabindex="-1" aria-labelledby="modalLabel${producto.id}" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="modalLabel${producto.id}">${producto.nombre}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <img src="${rutaImagen}${producto.id}.webp" alt="Imagen de ${producto.nombre}">
                <p>${producto.descripcion}</p>
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

  // En caso de no haber coincidencias con la busquda, muestro un mensaje.
	if (arrayProductosFiltrados.length === 0) {
		gridProductos.innerHTML = `<h2>No hay coincidencias!</h2>`;
	}

	// Agrego el event listener a cada boton (que tienen id unico), para pushear el producto comprado al arrayCarro
	const modalAgregarAlCarroBtn = document.querySelectorAll(".btnAgregarAlCarro");
	modalAgregarAlCarroBtn.forEach((boton) => boton.addEventListener("click", () => {
    agregarAlCarro(event, data_productos);
  }));
}

// Funcion para filtrar los productos a mostrar. Puede ser una busqueda del usuario, o los productos destacados en el index. Por eso se definen las rutas a las imagenes.
const filtrarProductos = (data_productos) => {
  let rutaImagen = ``;

  let arrayProductosFiltrados = [];
	// Defino el campo de busqueda y le agrego el evento para mostrar los productos buscados. 
	const buscador = document.getElementById(`buscador`);
	const buscadorBtn = document.getElementById(`buscadorBtn`);
	if(buscadorBtn && buscador) {
    buscadorBtn.addEventListener(`click`, mostrarProductos);
    arrayProductosFiltrados = data_productos.filter(producto => producto.nombre.toLowerCase().includes(`${buscador.value.toLowerCase()}`));
    rutaImagen = `../public/img_prod/`;
  } else {
    arrayProductosFiltrados = data_productos.filter((producto) => producto.destacado === true);
    rutaImagen = `./public/img_prod/`;
  }
	return {arrayProductosFiltrados, rutaImagen};
};

// Funcion para obtener los productos:
export const obtenerProductos = async (ruta) => {
  try {
    const response = await fetch(`${ruta}`)
    const data_productos = await response.json();
    mostrarProductos(data_productos);
  }
  catch(error) {
    console.log('Error.')
  }
}