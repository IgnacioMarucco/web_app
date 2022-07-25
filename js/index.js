import { mostrarProductos } from "./main.js";
import { existeCarro } from "../js/carro.js";

document.addEventListener('DOMContentLoaded', () => {
  fetch("js/data_productos.json")
    .then((response) => response.json())
    .then((data_productos) => {
      mostrarProductos(data_productos);
      existeCarro();
  })
})

