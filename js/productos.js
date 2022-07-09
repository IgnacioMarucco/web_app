// Clase constructora para productos:
class Producto {
	constructor(id, nombre, precio, cantidad, formatos) {
		this.id = id;
		this.nombre = nombre;
		this.precio = precio;
		this.cantidad = cantidad;
    this.formatos = formatos;
	}
}

// Productos disponibles:
const eucalipto = new Producto(1, `Miel de Eucalipto`, 100, 0, [[1000,800],[500,450]]);
const algarrobo = new Producto(2, `Miel de Algarrobo`, 150, 0, [[1000,850],[500,450]]);
const citrus = new Producto(3, `Miel de Citrus`, 200, 0, [[1000,750],[500,450]]);
const girasol = new Producto(4, `Miel de Girasol`, 250, 0,[[1000,800],[500,450]]);
const polen = new Producto(5, `Polen de Abeja`, 200, 0,[[500,500]]);
const propoleo = new Producto(6,`Propoleo`, 300, 0,[[250,500]]);


// Agregar productos al Array de Productos DISPONIBLES
export const arrayProductos = [];
arrayProductos.push(eucalipto);
arrayProductos.push(algarrobo);
arrayProductos.push(citrus);
arrayProductos.push(girasol);
arrayProductos.push(polen);
arrayProductos.push(propoleo);

