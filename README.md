
# NEOTECH

## 📖 Descripción

NEOTECH es un e-commerce desarrollado con React como proyecto final del curso de React JS.

El objetivo del proyecto es construir una aplicación moderna para la venta de productos tecnológicos, aplicando buenas prácticas de desarrollo, una arquitectura basada en componentes y una interfaz intuitiva.

Actualmente el proyecto se encuentra en desarrollo y continuará evolucionando a lo largo del curso.

En este checkpoint se implementó un catálogo dinámico de productos utilizando una fuente de datos local y una simulación de carga asíncrona mediante `Promise`, `setTimeout`, `useEffect` y `async/await`.

---

## 🚀 Tecnologías utilizadas

* React
* Vite
* JavaScript (ES6+)
* HTML5
* CSS3
* React Hooks (`useState` y `useEffect`)

---

## 📂 Estructura del proyecto

```text
NEOTECH/
├── public/
│   └── images/
│       ├── carrito/
│       │   ├── Carrito lleno.png
│       │   └── Carrito vacio.png
│       ├── logo/
│       │   └── neotech-32x32.png
│       └── products/
│           ├── AuricularesGamer.png
│           ├── Monitor24.png
│           ├── MouseGamer.png
│           ├── NotebookGamer.png
│           └── TecladoMecanico.png
│
├── src/
│   ├── components/
│   │   ├── CartWidget.css
│   │   ├── CartWidget.jsx
│   │   ├── Footer.css
│   │   ├── Footer.jsx
│   │   ├── Item.css
│   │   ├── Item.jsx
│   │   ├── ItemList.jsx
│   │   ├── ItemListContainer.css
│   │   ├── ItemListContainer.jsx
│   │   ├── Navbar.css
│   │   └── Navbar.jsx
│   │
│   ├── data/
│   │   └── products.js
│   │
│   ├── mock/
│   │   └── asyncMock.js
│   │
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js
```

---

## 🧩 Componentes principales

### Navbar

Barra de navegación principal de NEOTECH. Contiene el nombre de la tienda, las categorías de productos y el componente `CartWidget`.

### CartWidget

Componente encargado de mostrar el ícono del carrito y la cantidad de productos seleccionados.

Actualmente funciona como representación visual del carrito. La integración con el estado global de los productos será incorporada progresivamente a medida que avance el desarrollo del e-commerce.

### ItemListContainer

Es el componente contenedor principal del catálogo.

Su responsabilidad es gestionar la obtención de los productos y almacenarlos en el estado `items`.

Utiliza `useState` para mantener el listado de productos y `useEffect` para ejecutar la carga de datos una única vez cuando el componente se monta.

La obtención de los productos se realiza mediante la función `getProducts`, que devuelve una `Promise` con una demora simulada de 2 segundos.

Una vez obtenidos los productos, se actualiza el estado mediante `setItems` y se pasan los datos al componente `ItemList` mediante props.

El componente no realiza el `.map()` de los productos, ya que esa responsabilidad corresponde a `ItemList`.

### ItemList

Componente encargado de recibir el array de productos mediante props y recorrerlo utilizando el método `.map()`.

Por cada producto genera un componente `Item`.

Cada elemento utiliza el identificador único del producto como `key`:

```jsx
<Item key={product.id} product={product} />
```

De esta manera se evita utilizar el índice del array como clave y se mantiene una identificación estable para cada elemento renderizado.

### Item

Representa individualmente cada producto del catálogo.

Muestra:

* Imagen
* Nombre
* Precio
* Stock disponible
* Selector de cantidad
* Botón para marcar el producto como favorito
* Botón para ver el producto

El componente utiliza `useState` para administrar dos estados independientes:

* `cantidad`: almacena la cantidad seleccionada del producto. Comienza en `0` y puede incrementarse o disminuirse mediante los botones correspondientes.
* `esFavorito`: determina si el producto fue marcado como favorito. Comienza en `false` y alterna entre `true` y `false` mediante el botón de favorito.

Las actualizaciones del estado utilizan la forma funcional del setter, por ejemplo:

```jsx
setCantidad(prev => prev + 1);
setEsFavorito(prev => !prev);
```

De esta manera se trabaja sobre el valor anterior del estado sin realizar mutaciones directas.

Cada instancia del componente `Item` mantiene su propio estado, por lo que las interacciones realizadas sobre un producto no modifican los demás productos del catálogo.

### Footer

Pie de página de la aplicación con la identificación de la tienda.

---

## 📦 Datos de productos

Los productos utilizados por el catálogo se encuentran definidos en:

```text
src/data/products.js
```

Actualmente se cuenta con cinco productos:

* Notebook Gamer
* Mouse Gamer
* Teclado Mecánico
* Monitor 24 pulgadas
* Auriculares Gamer

Cada producto posee las siguientes propiedades:

```text
id
name
price
category
img
stock
description
```

Ejemplo:

```js
{
  id: 1,
  name: "Notebook Gamer",
  price: 1500000,
  category: "Notebooks",
  img: "images/products/NotebookGamer.png",
  stock: 10,
  description: "Notebook gamer de alto rendimiento para juegos y aplicaciones exigentes."
}
```

---

## 🔄 Carga dinámica y flujo asíncrono

En este checkpoint se reemplazó el listado estático de productos por un flujo dinámico que simula la obtención de información desde una API.

La simulación se encuentra en:

```text
src/mock/asyncMock.js
```

La función `getProducts` devuelve una `Promise` y utiliza `setTimeout` para simular un tiempo de respuesta de una API.

La respuesta se obtiene después de 2 segundos:

```js
export const getProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products);
    }, 2000);
  });
};
```

El flujo de datos funciona de la siguiente manera:

```text
ItemListContainer
        ↓
    getProducts()
        ↓
     Promise
        ↓
   2 segundos
        ↓
   setItems(products)
        ↓
     ItemList
        ↓
       .map()
        ↓
      Item
```

### useEffect

La carga de productos se ejecuta dentro de `useEffect` con un array de dependencias vacío:

```jsx
useEffect(() => {
  const fetchProducts = async () => {
    const products = await getProducts();
    setItems(products);
  };

  fetchProducts();
}, []);
```

El array vacío `[]` indica que el efecto se ejecuta únicamente cuando el componente se monta.

La función `fetchProducts` utiliza `async/await` para esperar la resolución de la `Promise`.

Una vez obtenidos los productos, se utiliza `setItems` para actualizar el estado.

---

## 🧠 Gestión de estado

La gestión de estado se implementa actualmente utilizando los hooks `useState` y `useEffect` de React.

### Estado de productos

Dentro de `ItemListContainer` se utiliza:

```jsx
const [items, setItems] = useState([]);
```

El estado comienza como un array vacío porque los productos todavía no fueron obtenidos.

Una vez que la `Promise` se resuelve, los productos se almacenan mediante:

```jsx
setItems(products);
```

### Estado de interacción

Dentro de `Item` se utilizan dos estados independientes:

```jsx
const [cantidad, setCantidad] = useState(0);
const [esFavorito, setEsFavorito] = useState(false);
```

`cantidad` utiliza un valor numérico porque permite realizar operaciones de incremento y decremento.

`esFavorito` utiliza un valor booleano porque representa una condición de activado/desactivado.

Para actualizar ambos estados se utiliza la forma funcional del setter:

```jsx
setCantidad(prev => prev + 1);
setEsFavorito(prev => !prev);
```

El contador también incorpora validaciones para evitar que la cantidad sea menor que `0` o supere el stock disponible.

Esta implementación permite que cada producto administre de manera independiente su cantidad seleccionada y su estado de favorito.

A futuro, cuando sea necesario sincronizar las cantidades seleccionadas con otros componentes como `CartWidget`, el estado podrá elevarse a un componente común mediante el patrón conocido como **lifting state up**.

---

## ⚙️ Instalación

Clonar el repositorio:

```bash
git clone https://github.com/DarkNeo-1981/neotech-ecommerce.git
```

Ingresar al proyecto:

```bash
cd neotech-ecommerce
```

Instalar las dependencias:

```bash
npm install
```

Ejecutar el proyecto:

```bash
npm run dev
```

---

## 🎯 Objetivo

Desarrollar un e-commerce completo utilizando React, incorporando progresivamente funcionalidades como:

* Componentes reutilizables
* Gestión de estado
* Carga dinámica de productos
* Flujo asíncrono
* Navegación
* Catálogo de productos
* Carrito de compras
* Checkout
* Integración con Firebase

---

## 📌 Próximos pasos

En las próximas etapas del proyecto se incorporarán nuevas funcionalidades, entre ellas:

* Custom Hooks
* React Router
* Navegación entre vistas
* Detalle individual de productos
* Filtrado por categorías
* Carrito de compras
* Integración con Firebase

---

## 👨‍💻 Autor

**Nicolás Fasanella**

Proyecto realizado como entrega del curso de React JS.
