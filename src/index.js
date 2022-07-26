import { existeCarro } from "./components/carro.js";
import { mostrarUsuario } from "./components/login.js";
import { mostrarProductos } from "./App.js";

document.addEventListener('DOMContentLoaded', () => {
  mostrarProductos();
  existeCarro();
  mostrarUsuario();
});