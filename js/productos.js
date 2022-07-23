import { mostrarProductos } from "../js/main.js";
import { existeCarro } from "../js/carro.js";

document.addEventListener('DOMContentLoaded', () => {
  fetch("../js/data.json")
    .then((response) => response.json())
    .then((data) => {
      mostrarProductos(data);
      existeCarro();
  })
})

