import { mostrarProductos } from "./main.js";

document.addEventListener('DOMContentLoaded', () => {
  fetch("../js/data.json")
    .then((response) => response.json())
    .then((data) => {
      mostrarProductos(data);
  })
})

