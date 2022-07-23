import { mostrarProductos } from "../js/main.js";

document.addEventListener('DOMContentLoaded', () => {
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      mostrarProductos(data);
  })
})

