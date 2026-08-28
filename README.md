
# NEOTECH

## 📖 Descripción

NEOTECH es un e-commerce desarrollado con React como proyecto final del curso de React JS.

El objetivo del proyecto es construir una aplicación moderna para la venta de productos tecnológicos, aplicando buenas prácticas de desarrollo, una arquitectura basada en componentes, gestión de estado y una interfaz intuitiva.

El proyecto se encuentra en desarrollo y continuará incorporando nuevas funcionalidades a lo largo del curso.

Actualmente la aplicación cuenta con un catálogo dinámico de productos utilizando una fuente de datos local y una simulación de carga asíncrona mediante `Promise` y `setTimeout`.

También se incorporó internacionalización mediante `react-i18next`, permitiendo cambiar dinámicamente el idioma de la aplicación entre Español, Inglés y Alemán.

La lógica de carga de productos se encuentra separada en un Custom Hook llamado `useProducts`, manteniendo los componentes enfocados en la presentación y la interacción con el usuario.

Además, se incorporó una vista de detalle individual para cada producto, con información ampliada, selección de cantidad y un botón preparado para la futura integración con el carrito de compras.

El proyecto también incorpora navegación mediante React Router, permitiendo desplazarse entre el inicio, el catálogo, las categorías y los detalles individuales de los productos sin realizar recargas completas de la página.

---

## 🚀 Tecnologías utilizadas

- React
- Vite
- JavaScript (ES6+)
- HTML5
- CSS3
- React Hooks (`useState` y `useEffect`)
- Custom Hooks (`useProducts`)
- React Router
- react-i18next
- react-icons
- flag-icons
- LocalStorage

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
│           ├── TecladoMecanico.png
│           └── Ryzen7.png
│
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
│   │   ├── ItemCount/
│   │   │   ├── ItemCount.css
│   │   │   └── ItemCount.jsx
│   │   ├── ItemDetail/
│   │   │   ├── ItemDetail.css
│   │   │   └── ItemDetail.jsx
│   │   ├── ItemDetailContainer/
│   │   │   └── ItemDetailContainer.jsx
│   │   ├── ItemList/
│   │   │   └── ItemList.jsx
│   │   ├── ItemListContainer/
│   │   │   ├── ItemListContainer.css
│   │   │   └── ItemListContainer.jsx
│   │   └── Navbar/
│   │       ├── Navbar.css
│   │       └── Navbar.jsx
│   │
│   ├── data/
│   │   └── products.js
│   ├── hooks/
│   │   └── useProducts.js
│   ├── locales/
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
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js

La carpeta dist/ es generada automáticamente durante el proceso de build y no forma parte de la estructura principal del código fuente.

🧩 Componentes principales
Navbar

Barra de navegación principal de NEOTECH.

Contiene:

Nombre de la tienda
Categorías de productos
Selector de idioma
Componente CartWidget

El selector permite cambiar dinámicamente entre:

Español 🇪🇸
English 🇬🇧
Deutsch 🇩🇪

El idioma seleccionado se almacena utilizando localStorage.

La navegación interna utiliza componentes Link y NavLink de React Router, evitando recargas completas de la aplicación.

Los NavLink utilizan la propiedad isActive para aplicar un estilo visual diferente a la categoría actualmente seleccionada.

CartWidget

Componente encargado de mostrar visualmente el carrito de compras y la cantidad de productos seleccionados.

Actualmente funciona como representación visual del carrito.

La integración completa con el estado del carrito será incorporada progresivamente durante el desarrollo.

ItemListContainer

Es el componente contenedor principal del catálogo.

Su responsabilidad es controlar los estados de:

Carga
Error
Productos obtenidos
Producto seleccionado

Utiliza el Custom Hook useProducts:

const { products, loading, error } = useProducts();

Una vez obtenidos los productos, los envía a ItemList mediante props.

ItemList

Componente encargado de recibir el array de productos mediante props y recorrerlo utilizando .map().

Por cada producto genera un componente Item.

Cada elemento utiliza el identificador único del producto como key:

<Item key={product.id} product={product} />

De esta manera se mantiene una identificación estable para cada elemento renderizado.

Item

Representa individualmente cada producto dentro del catálogo.

Muestra:

Imagen
Nombre
Descripción corta
Precio
Stock disponible
Botón para marcar el producto como favorito
Botón para acceder al detalle del producto

El componente utiliza useState para administrar el estado del favorito:

const [esFavorito, setEsFavorito] = useState(false);

Cada instancia de Item mantiene su propio estado, por lo que marcar un producto como favorito no modifica los demás productos.

La selección de cantidad fue trasladada a la vista de detalle para mantener las tarjetas del catálogo más simples y enfocadas en la presentación del producto.

ItemCount

Componente reutilizable encargado de controlar la cantidad de unidades de un producto.

Utiliza useState para administrar la cantidad seleccionada:

const [cantidad, setCantidad] = useState(0);

El contador incorpora validaciones para evitar:

Valores menores a cero.
Superar el stock disponible.

Los botones se deshabilitan automáticamente cuando se alcanza el mínimo o máximo permitido.

Actualmente se utiliza dentro de ItemDetail.

ItemDetailContainer

Componente encargado de obtener un producto específico mediante su identificador.

Utiliza useEffect para solicitar el producto mediante:

getProductById(productId)

Administra los estados de:

Producto seleccionado
Carga
Error

Una vez obtenido el producto, lo envía a ItemDetail.

El identificador del producto se obtiene mediante los parámetros dinámicos proporcionados por React Router.

ItemDetail

Componente encargado de mostrar la información detallada de un producto.

Actualmente muestra:

Imagen
Nombre
Categoría
Descripción detallada
Precio
Stock disponible
Contador de unidades
Botón Agregar al carrito

La vista utiliza una descripción ampliada diferente de la utilizada en las tarjetas del catálogo.

El botón Agregar al carrito se encuentra preparado visualmente para una futura integración con la lógica del carrito.

Footer

Pie de página de la aplicación.

Incluye:

Identificación de NEOTECH
Información de copyright
Enlaces a redes sociales
Traducción dinámica según el idioma seleccionado
🪝 Custom Hook: useProducts

El proyecto utiliza el Custom Hook useProducts, ubicado en:

src/hooks/useProducts.js

Su responsabilidad es centralizar la lógica de carga de productos.

El hook administra:

El listado de productos.
El estado de carga.
El posible estado de error.
La llamada a getProducts.

Retorna:

{
  products,
  loading,
  error
}

Esto permite separar la lógica de obtención de datos de la interfaz y mantener ItemListContainer más limpio y reutilizable.

🧭 Navegación y rutas

El proyecto utiliza React Router para implementar una arquitectura de navegación SPA (Single Page Application), permitiendo cambiar de vista sin realizar recargas completas del navegador.

La configuración principal de las rutas se encuentra en App.jsx, utilizando BrowserRouter, Routes y Route.

Rutas configuradas
Ruta	Función
/	Página principal con el listado de productos
/productos	Catálogo de productos
/category/:categoryId	Filtrado de productos por categoría
/product/:productId	Detalle individual de un producto
/detalle	Espacio reservado para el detalle solicitado en la consigna
*	Página 404 para rutas inexistentes

Las rutas dinámicas permiten acceder a diferentes productos y categorías utilizando sus identificadores.

Por ejemplo:

/product/1
/product/2
/product/6

corresponden al detalle de productos diferentes.

Las categorías utilizan una estructura similar:

/category/1
/category/2
/category/3
/category/4

La navegación interna se realiza mediante los componentes Link y NavLink de React Router.

Los NavLink permiten identificar la sección activa mediante la propiedad isActive, aplicando un estilo visual diferente al enlace seleccionado.

De esta manera, el usuario puede navegar entre las distintas secciones de NEOTECH sin que la aplicación se recargue completamente.

También se configuró una ruta comodín:

<Route path="*" element={<p>Página no encontrada</p>} />

para manejar URLs inexistentes mediante una vista 404.

📦 Datos de productos

Los productos utilizados por el catálogo se encuentran definidos en:

src/data/products.js

Actualmente se cuenta con seis productos:

Notebook Gamer
Mouse Gamer
Teclado Mecánico
Monitor 24 pulgadas
Auriculares Gamer
Procesador AMD Ryzen 7

Cada producto posee información como:

id
name
price
category
img
stock
description

Ejemplo:

{
  id: 1,
  name: "Notebook Gamer",
  price: 1500000,
  category: "Notebooks",
  img: "images/products/NotebookGamer.png",
  stock: 10,
  description: "Notebook gamer de alto rendimiento para juegos y aplicaciones exigentes."
}

La información utilizada para las traducciones y las descripciones ampliadas se encuentra en los archivos de idioma dentro de:

src/locales/
🔄 Carga dinámica y flujo asíncrono

La aplicación utiliza un flujo dinámico que simula la obtención de información desde una API.

La simulación se encuentra en:

src/mock/asyncMock.js

La función getProducts devuelve una Promise y utiliza setTimeout para simular un tiempo de respuesta.

También se utiliza getProductById para obtener un producto específico.

Flujo del catálogo
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
Flujo del detalle
Item
  ↓
Ver producto
  ↓
React Router
  ↓
/product/:productId
  ↓
ItemDetailContainer
  ↓
getProductById(productId)
  ↓
Promise
  ↓
ItemDetail
🌎 Internacionalización

La aplicación incorpora soporte multiidioma mediante la librería react-i18next.

Idiomas disponibles:

Español 🇪🇸
English 🇬🇧
Deutsch 🇩🇪

La configuración se encuentra en:

src/i18n.js

Los archivos de traducción se encuentran en:

src/locales/

Archivos disponibles:

es.json
en.json
de.json

El cambio de idioma se realiza desde el selector ubicado en el Navbar.

Actualmente se traducen:

Navbar
Título principal
Nombres de productos
Descripciones
Categorías
Stock disponible
Botones
Estados de carga
Vista de detalle
Footer
🧠 Gestión de estado

La gestión de estado se implementa utilizando Hooks de React.

El Custom Hook useProducts administra el estado relacionado con la obtención del catálogo:

const [products, setProducts] = useState([]);

const [loading, setLoading] = useState(true);

const [error, setError] = useState(null);

Dentro de Item, cada producto administra su estado independiente de favorito:

const [esFavorito, setEsFavorito] = useState(false);

ItemCount administra la cantidad seleccionada de manera independiente:

const [cantidad, setCantidad] = useState(0);

El contador incorpora validaciones para evitar valores negativos o superar el stock disponible.

A futuro, cuando sea necesario sincronizar las cantidades seleccionadas con componentes como CartWidget, el estado podrá elevarse mediante el patrón conocido como lifting state up.

🛒 Estado actual del carrito

El proyecto cuenta actualmente con:

CartWidget
Iconografía del carrito
Botón Agregar al carrito en el detalle
Contador de unidades

La funcionalidad completa de agregado, eliminación, actualización de cantidades y persistencia del carrito será implementada en una etapa posterior.

⚙️ Instalación

Clonar el repositorio:

git clone https://github.com/DarkNeo-1981/neotech-ecommerce.git

Ingresar al proyecto:

cd neotech-ecommerce

Instalar las dependencias:

npm install

Ejecutar el proyecto en modo desarrollo:

npm run dev

Para generar una versión de producción:

npm run build
🎯 Objetivo

Desarrollar progresivamente un e-commerce completo utilizando React e incorporando:

Componentes reutilizables
Gestión de estado
Custom Hooks
Carga dinámica de productos
Internacionalización
Navegación
Catálogo de productos
Detalle individual de productos
Carrito de compras
Persistencia de datos
Checkout
Integración con Firebase
📌 Próximos pasos

Entre las próximas etapas del proyecto se encuentran:

Mejorar la navegación entre categorías.
Completar la funcionalidad del carrito.
Compartir el estado del carrito entre componentes.
Implementar persistencia del carrito.
Desarrollar el checkout.
Integrar Firebase.
Continuar mejorando la interfaz y la experiencia de usuario.
👨‍💻 Autor

Nicolás Fasanella

Proyecto realizado como entrega del curso de React JS.