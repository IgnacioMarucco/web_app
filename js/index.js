import { mostrarProductos } from "./main.js";
import { existeCarro } from "../js/carro.js";

const obtenerProductos = async () => {
  try {
    const response = await fetch("js/data_productos.json");
    const data_productos = await response.json();
    mostrarProductos(data_productos);
  }
  catch(error) {
    console.log('Error.')
  }
}

document.addEventListener('DOMContentLoaded', () => {
  obtenerProductos();
  existeCarro();
});