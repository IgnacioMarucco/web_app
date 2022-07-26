import { existeCarro } from "../src/components/carro.js";
import { mostrarUsuario } from "../src/components/login.js";
import { mostrarProductos } from "../src/App.js";

document.addEventListener('DOMContentLoaded', () => {
  mostrarProductos();
  existeCarro();
  mostrarUsuario();
});