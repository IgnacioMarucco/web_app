import { obtenerProductos } from "../src/App.js";
import { existeCarro } from "../src/components/carro.js";
import { mostrarUsuario } from "../src/components/login.js";

let ruta = "../js/data_productos.json";

document.addEventListener('DOMContentLoaded', () => {
  obtenerProductos(ruta);
  existeCarro();
  mostrarUsuario();
});