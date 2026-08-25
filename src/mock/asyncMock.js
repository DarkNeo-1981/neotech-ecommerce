
import products from "../data/products";

export const getProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products);
    }, 2000);
  });
};

export const getProductById = (productId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const product = products.find((product) => product.id === productId);

      if (product) {
        resolve(product);
      } else {
        reject(new Error("Producto no encontrado"));
      }
    }, 2000);
  });
};