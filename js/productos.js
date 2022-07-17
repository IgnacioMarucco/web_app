// Clase constructora para productos:
class Producto {
	constructor(id, nombre, formatos) {
		this.id = id;
		this.nombre = nombre;
    this.formatos = formatos;
	}
}

// Productos disponibles:
const eucalipto = new Producto(1, `Miel de Eucalipto`, [{id: 0, peso: 1000, precio: 800, cantidad: 0},{id: 1, peso: 500, precio: 450, cantidad: 0}]);
const algarrobo = new Producto(2, `Miel de Algarrobo`, [{id: 0, peso: 1000, precio: 800, cantidad: 0},{id: 1, peso: 500, precio: 450, cantidad: 0}]);
const citrus = new Producto(3, `Miel de Citrus`, [{id: 0, peso: 1000, precio: 800, cantidad: 0},{id: 1, peso: 500, precio: 450, cantidad: 0}]);
const girasol = new Producto(4, `Miel de Girasol`, [{id: 0, peso: 1000, precio: 800, cantidad: 0},{id: 1, peso: 500, precio: 450, cantidad: 0}]);
const polen = new Producto(5, `Polen de Abeja`, [{id: 0, peso: 500, precio: 500, cantidad: 0}]);
const propoleo = new Producto(6,`Propoleo`, [{id: 0, peso: 200, precio: 500, cantidad: 0}]);

// Agregar productos al Array de Productos DISPONIBLES
export const arrayProductos = [];
arrayProductos.push(eucalipto);
arrayProductos.push(algarrobo);
arrayProductos.push(citrus);
arrayProductos.push(girasol);
arrayProductos.push(polen);
arrayProductos.push(propoleo);