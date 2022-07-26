export const obtenerProductos = async () => {
  try {
    const response = await fetch("../src/data/data_productos.json")
    const data_productos = await response.json();
    return data_productos;
  }
  catch(error) {
    console.log('Error.')
  }
};