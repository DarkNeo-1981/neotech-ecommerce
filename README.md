
# NEOTECH

## 📖 Descripción

NEOTECH es un e-commerce desarrollado con React como proyecto final del curso de React JS.

El objetivo del proyecto es construir una aplicación moderna para la venta de productos tecnológicos, aplicando buenas prácticas de desarrollo, una arquitectura basada en componentes y una interfaz intuitiva.

Actualmente el proyecto se encuentra en desarrollo y continuará evolucionando a lo largo del curso.

En esta etapa se implementó un catálogo dinámico de productos utilizando una fuente de datos local y una simulación de carga asíncrona mediante `Promise`, `setTimeout` y `async/await`.

Además, se incorporó internacionalización utilizando `react-i18next`, permitiendo cambiar dinámicamente el idioma de toda la aplicación entre Español, Inglés y Alemán.

La lógica de carga de productos se encuentra separada en un Custom Hook llamado `useProducts`, manteniendo los componentes enfocados en la interfaz.

---

## 🚀 Tecnologías utilizadas

- React
- Vite
- JavaScript (ES6+)
- HTML5
- CSS3
- React Hooks (`useState` y `useEffect`)
- Custom Hooks (`useProducts`)
- react-i18next (Internacionalización)
- react-icons (Iconografía)
- flag-icons (Banderas de idiomas)

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
├── src/
│   ├── components/
│   │   ├── CartWidget/
│   │   │   ├── CartWidget.css
│   │   │   └── CartWidget.jsx
│   │   ├── Footer/
│   │   │   ├── Footer.css
│   │   │   └── Footer.jsx
│   │   ├── Item/
│   │   │   ├── Item.css
│   │   │   └── Item.jsx
│   │   ├── ItemList/
│   │   │   └── ItemList.jsx
│   │   ├── ItemListContainer/
│   │   │   ├── ItemListContainer.css
│   │   │   └── ItemListContainer.jsx
│   │   └── Navbar/
│   │       ├── Navbar.css
│   │       └── Navbar.jsx
│   ├── data/
│   │   └── products.js
│   ├── hooks/
│   │   └── useProducts.js
│   ├── locals/
│   │   ├── de.json
│   │   ├── en.json
│   │   └── es.json
│   ├── mock/
│   │   └── asyncMock.js
│   ├── App.css
│   ├── App.jsx
│   ├── i18n.js
│   ├── index.css
│   └── main.jsx
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

Barra de navegación principal de NEOTECH.

Contiene:

- Nombre de la tienda
- Categorías de productos
- Selector de idioma
- Componente `CartWidget`

El selector permite cambiar dinámicamente entre:

- Español 🇪🇸
- English 🇬🇧
- Deutsch 🇩🇪

El idioma seleccionado se almacena utilizando `localStorage`.

---

### CartWidget

Componente encargado de mostrar el ícono del carrito y la cantidad de productos seleccionados.

Actualmente funciona como representación visual del carrito.

La integración con el estado global de los productos será incorporada progresivamente a medida que avance el desarrollo del e-commerce.

---

### ItemListContainer

Es el componente contenedor principal del catálogo.

Su responsabilidad es mostrar el estado de carga, un posible error o el listado de productos.

Recibe los datos mediante el Custom Hook `useProducts`:

```jsx
const { products, loading, error } = useProducts();
```

De esta forma, `ItemListContainer` no conoce cómo se obtienen los productos: solo utiliza los datos que recibe del hook y los envía a `ItemList` mediante props.

El componente no realiza el `.map()` de los productos, ya que esa responsabilidad corresponde a `ItemList`.

---

### ItemList

Componente encargado de recibir el array de productos mediante props y recorrerlo utilizando el método `.map()`.

Por cada producto genera un componente `Item`.

Cada elemento utiliza el identificador único del producto como `key`:

```jsx
<Item key={product.id} product={product} />
```

De esta manera se evita utilizar el índice del array como clave y se mantiene una identificación estable para cada elemento renderizado.

---

### Item

Representa individualmente cada producto del catálogo.

Muestra:

- Imagen
- Nombre
- Precio
- Stock disponible
- Selector de cantidad
- Botón para marcar el producto como favorito
- Botón para ver el producto

El componente utiliza `useState` para administrar dos estados independientes:

- `cantidad`: almacena la cantidad seleccionada del producto.
- `esFavorito`: determina si el producto fue marcado como favorito.

Las actualizaciones del estado utilizan la forma funcional del setter:

```jsx
setCantidad((prev) => prev + 1);
setEsFavorito((prev) => !prev);
```

Cada instancia del componente `Item` mantiene su propio estado, por lo que las interacciones realizadas sobre un producto no modifican los demás productos del catálogo.

Los nombres de los productos utilizan internacionalización, permitiendo mostrar el catálogo en diferentes idiomas sin modificar la fuente de datos original.

---

### Footer

Pie de página de la aplicación con la identificación de la tienda y enlaces a redes sociales.

También incorpora traducción dinámica según el idioma seleccionado.

---

## 🪝 Custom Hook: useProducts

El proyecto utiliza el Custom Hook `useProducts`, ubicado en:

```text
src/hooks/useProducts.js
```

Su responsabilidad es centralizar la lógica de carga de productos.

El hook administra:

- El listado de productos.
- El estado de carga.
- El posible estado de error.
- La llamada a `getProducts`.

Retorna un objeto con los datos necesarios para que los componentes puedan utilizarlo:

```jsx
{
  products,
  loading,
  error
}
```

Esto permite separar la lógica de la interfaz y mantener `ItemListContainer` más limpio y fácil de reutilizar.

---

## 📦 Datos de productos

Los productos utilizados por el catálogo se encuentran definidos en:

```text
src/data/products.js
```

Actualmente se cuenta con cinco productos:

- Notebook Gamer
- Mouse Gamer
- Teclado Mecánico
- Monitor 24 pulgadas
- Auriculares Gamer

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

La aplicación utiliza un flujo dinámico que simula la obtención de información desde una API.

La simulación se encuentra en:

```text
src/mock/asyncMock.js
```

La función `getProducts` devuelve una `Promise` y utiliza `setTimeout` para simular un tiempo de respuesta.

El flujo de datos funciona de la siguiente manera:

```text
ItemListContainer
        ↓
  useProducts()
        ↓
  getProducts()
        ↓
     Promise
        ↓
   2 segundos
        ↓
{ products, loading, error }
        ↓
     ItemList
        ↓
       .map()
        ↓
      Item
```

---

## 🌎 Internacionalización

La aplicación incorpora soporte multiidioma mediante la librería `react-i18next`.

Idiomas disponibles:

- Español 🇪🇸
- English 🇬🇧
- Deutsch 🇩🇪

La configuración se encuentra en:

```text
src/i18n.js
```

Los archivos de traducción se encuentran en:

```text
src/locals/
```

Archivos disponibles:

```text
es.json
en.json
de.json
```

El cambio de idioma se realiza desde el selector ubicado en el Navbar.

Actualmente se traducen:

- Navbar
- Título principal
- Nombre de productos
- Stock disponible
- Botones
- Footer

---

## 🧠 Gestión de estado

La gestión de estado se implementa utilizando Hooks de React.

El hook `useProducts` administra el estado relacionado con la obtención del catálogo:

```jsx
const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
```

Dentro de `Item`, cada producto administra su estado independiente:

```jsx
const [cantidad, setCantidad] = useState(0);
const [esFavorito, setEsFavorito] = useState(false);
```

El contador incorpora validaciones para evitar valores negativos o superar el stock disponible.

A futuro, cuando sea necesario sincronizar las cantidades seleccionadas con componentes como `CartWidget`, el estado podrá elevarse mediante el patrón conocido como **lifting state up**.

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

Instalar dependencias:

```bash
npm install
```

Ejecutar el proyecto:

```bash
npm run dev
```

---

## 🎯 Objetivo

Desarrollar un e-commerce completo utilizando React incorporando progresivamente:

- Componentes reutilizables
- Gestión de estado
- Custom Hooks
- Carga dinámica de productos
- Internacionalización
- Navegación
- Catálogo de productos
- Carrito de compras
- Checkout
- Integración con Firebase

---

## 📌 Próximos pasos

En las próximas etapas del proyecto se incorporarán nuevas funcionalidades:

- React Router
- Navegación entre vistas
- Detalle individual de productos
- Filtrado por categorías
- Carrito de compras
- Persistencia de datos
- Integración con Firebase

---

## 👨‍💻 Autor

**Nicolás Fasanella**

Proyecto realizado como entrega del curso de React JS.