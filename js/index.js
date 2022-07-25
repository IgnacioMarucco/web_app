import { obtenerProductos } from "./main.js";
import { existeCarro } from "../js/carro.js";
import { mostrarUsuario } from "../js/login.js";

let ruta = "js/data_productos.json";

document.addEventListener('DOMContentLoaded', () => {
  obtenerProductos(ruta);
  existeCarro();
  mostrarUsuario();
});