import { obtenerProductos } from "/js/main.js";
import { existeCarro } from "/js/carro.js";

let ruta = "js/data_productos.json";

document.addEventListener('DOMContentLoaded', () => {
  obtenerProductos(ruta);
  existeCarro();
});