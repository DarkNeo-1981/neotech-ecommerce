
# NEOTECH

## 📖 Descripción

NEOTECH es un e-commerce desarrollado con React como proyecto final del curso de React JS.

El objetivo del proyecto es construir una aplicación moderna para la venta de productos tecnológicos, aplicando buenas prácticas de desarrollo, una arquitectura basada en componentes, gestión de estado y una interfaz intuitiva.

El proyecto se encuentra en desarrollo y continuará incorporando nuevas funcionalidades a lo largo del curso.

Actualmente la aplicación cuenta con un catálogo dinámico de productos utilizando una fuente de datos local y una simulación de carga asíncrona mediante `Promise` y `setTimeout`.

También se incorporó internacionalización mediante `react-i18next`, permitiendo cambiar dinámicamente el idioma de la aplicación entre Español, Inglés y Alemán.

La lógica de carga de productos se encuentra separada en un Custom Hook llamado `useProducts`, manteniendo los componentes enfocados en la presentación y la interacción con el usuario.

Además, se incorporó una vista de detalle individual para cada producto, con información ampliada, selección de cantidad y un botón preparado para la futura integración con el carrito de compras.

El proyecto también incorpora navegación mediante React Router, permitiendo desplazarse entre las diferentes secciones del e-commerce, filtrar productos por categoría y acceder a detalles individuales sin realizar recargas completas de la página.

Se incorporó además una página `NotFound` para manejar rutas inexistentes y un componente `CategoryNotFound` para informar cuando se solicita una categoría que no existe.

---

## 🚀 Tecnologías utilizadas

* React
* Vite
* JavaScript (ES6+)
* HTML5
* CSS3
* React Hooks (`useState` y `useEffect`)
* Custom Hooks (`useProducts`)
* React Router
* react-i18next
* react-icons
* flag-icons
* LocalStorage

---

## 📂 Estructura del proyecto

```text
NEOTECH/

│
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
│           ├── Ryzen7.png
│           └── TecladoMecanico.png
│
├── src/
│   ├── components/
│   │   ├── CartWidget/
│   │   │   ├── CartWidget.css
│   │   │   └── CartWidget.jsx
│   │   ├── CategoryNotFound/
│   │   │   └── CategoryNotFound.jsx
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
│   │   ├── Navbar/
│   │   │   ├── Navbar.css
│   │   │   └── Navbar.jsx
│   │   └── NotFound/
│   │       └── NotFound.jsx
│   │
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
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js
```

> La carpeta `dist/` es generada automáticamente durante el proceso de build y no forma parte de la estructura principal del código fuente.

---

## 🧩 Componentes principales

### Navbar

Barra de navegación principal de NEOTECH.

Contiene:

* Nombre de la tienda
* Categorías de productos
* Selector de idioma
* Componente `CartWidget`

El nombre de NEOTECH funciona también como enlace al inicio de la aplicación.

El selector permite cambiar dinámicamente entre:

* Español 🇪🇸
* English 🇬🇧
* Deutsch 🇩🇪

El idioma seleccionado se almacena utilizando `localStorage`.

La navegación interna utiliza los componentes `Link` y `NavLink` de React Router, evitando recargas completas de la aplicación.

Los `NavLink` utilizan la propiedad `isActive` para aplicar un estilo visual diferente a la categoría actualmente seleccionada.

---

### CartWidget

Componente encargado de mostrar visualmente el carrito de compras y la cantidad de productos seleccionados.

Actualmente funciona como representación visual del carrito.

La integración completa con el estado del carrito será incorporada progresivamente durante el desarrollo.

---

### ItemListContainer

Es el componente contenedor principal del catálogo.

Su responsabilidad es controlar:

* Carga de productos
* Estado de error
* Filtrado por categoría
* Renderizado del listado

Utiliza el Custom Hook `useProducts`:

```jsx
const { products, loading, error } = useProducts();
```

También utiliza `useParams` de React Router para obtener el parámetro dinámico de categoría:

```jsx
const { categoryId } = useParams();
```

Cuando no existe un `categoryId`, se muestran todos los productos.

Cuando existe un `categoryId`, el listado se filtra de acuerdo con la categoría correspondiente.

Las categorías disponibles actualmente son:

```text
1 → Notebooks
2 → Periféricos
3 → Monitores
4 → Componentes
```

Si se solicita un identificador de categoría inexistente, se muestra el componente `CategoryNotFound`.

Una vez obtenidos y filtrados los productos, se envían a `ItemList` mediante props.

---

### ItemList

Componente encargado de recibir el array de productos mediante props y recorrerlo utilizando `.map()`.

Por cada producto genera un componente `Item`.

Cada elemento utiliza el identificador único del producto como `key`:

```jsx
<Item key={product.id} product={product} />
```

De esta manera se mantiene una identificación estable para cada elemento renderizado.

---

### Item

Representa individualmente cada producto dentro del catálogo.

Muestra:

* Imagen
* Nombre
* Descripción corta
* Precio
* Stock disponible
* Botón para marcar el producto como favorito
* Botón para acceder al detalle del producto

El componente utiliza `useState` para administrar el estado del favorito:

```jsx
const [esFavorito, setEsFavorito] = useState(false);
```

Cada instancia de `Item` mantiene su propio estado, por lo que marcar un producto como favorito no modifica los demás productos.

El acceso al detalle utiliza navegación mediante React Router.

La selección de cantidad fue trasladada a la vista de detalle para mantener las tarjetas del catálogo más simples y enfocadas en la presentación del producto.

---

### ItemCount

Componente reutilizable encargado de controlar la cantidad de unidades de un producto.

Utiliza `useState` para administrar la cantidad seleccionada:

```jsx
const [cantidad, setCantidad] = useState(0);
```

El contador incorpora validaciones para evitar:

* Valores menores a cero.
* Superar el stock disponible.

Los botones se deshabilitan automáticamente cuando se alcanza el mínimo o máximo permitido.

Actualmente se utiliza dentro de `ItemDetail`.

---

### ItemDetailContainer

Componente encargado de obtener un producto específico mediante su identificador.

Utiliza `useParams` para obtener el ID desde la URL:

```jsx
const { id } = useParams();
```

Utiliza `useEffect` para solicitar el producto mediante:

```jsx
getProductById(id)
```

Administra los estados de:

* Producto seleccionado
* Carga
* Error

Una vez obtenido el producto, lo envía a `ItemDetail`.

La vista de detalle utiliza la ruta dinámica:

```text
/item/:id
```

Por ejemplo:

```text
/item/1
/item/2
/item/6
```

Cada URL permite acceder al detalle del producto correspondiente.

---

### ItemDetail

Componente encargado de mostrar la información detallada de un producto.

Actualmente muestra:

* Imagen
* Nombre
* Categoría
* Descripción detallada
* Precio
* Stock disponible
* Contador de unidades
* Botón `Agregar al carrito`

La vista utiliza una descripción ampliada diferente de la utilizada en las tarjetas del catálogo.

El botón `Agregar al carrito` se encuentra preparado visualmente para una futura integración con la lógica del carrito.

El botón para volver permite regresar al catálogo mediante navegación interna.

---

### CategoryNotFound

Componente encargado de informar al usuario cuando se solicita una categoría inexistente.

Se utiliza cuando la ruta posee un formato válido:

```text
/category/:categoryId
```

pero el identificador recibido no corresponde a ninguna categoría disponible.

Por ejemplo:

```text
/category/123456
```

En este caso se muestra el mensaje:

```text
Categoría no encontrada
```

Este componente permite mantener separada la responsabilidad de presentación del mensaje respecto de la lógica de filtrado del catálogo.

---

### NotFound

Componente encargado de manejar las rutas inexistentes de la aplicación.

Se utiliza mediante una ruta comodín:

```jsx
<Route path="*" element={<NotFound />} />
```

De esta manera, cualquier URL que no coincida con las rutas definidas muestra una página de error 404.

Por ejemplo:

```text
/esto-no-existe
```

---

### Footer

Pie de página de la aplicación.

Incluye:

* Identificación de NEOTECH
* Información de copyright
* Enlaces a redes sociales
* Traducción dinámica según el idioma seleccionado

El Footer se encuentra fuera de `Routes`, por lo que permanece visible en las diferentes rutas de la aplicación.

---

## 🪝 Custom Hook: useProducts

El proyecto utiliza el Custom Hook `useProducts`, ubicado en:

```text
src/hooks/useProducts.js
```

Su responsabilidad es centralizar la lógica de carga de productos.

El hook administra:

* El listado de productos.
* El estado de carga.
* El posible estado de error.
* La llamada a `getProducts`.

Retorna:

```jsx
{
  products,
  loading,
  error
}
```

Esto permite separar la lógica de obtención de datos de la interfaz y mantener `ItemListContainer` más limpio y reutilizable.

---

## 🧭 Navegación con React Router

El proyecto utiliza `react-router-dom` para implementar una navegación real mediante React Router.

La configuración principal se encuentra en `App.jsx`.

La aplicación utiliza:

* `BrowserRouter`
* `Routes`
* `Route`
* `Link`
* `NavLink`
* `useParams`

Esto permite navegar entre las diferentes vistas sin realizar una recarga completa de la aplicación.

### Rutas configuradas

| Ruta                    | Función                                      |
| ----------------------- | -------------------------------------------- |
| `/`                     | Página principal con el listado de productos |
| `/category/:categoryId` | Filtrado de productos por categoría          |
| `/item/:id`             | Detalle individual de un producto            |
| `*`                     | Página 404 para rutas inexistentes           |

### Rutas de categorías

Las categorías utilizan parámetros dinámicos:

```text
/category/1
/category/2
/category/3
/category/4
```

Cada identificador representa una categoría diferente:

* `1` → Notebooks
* `2` → Periféricos
* `3` → Monitores
* `4` → Componentes

El catálogo se actualiza de acuerdo con la categoría seleccionada.

Si se ingresa un identificador que no corresponde a ninguna categoría, se muestra `CategoryNotFound`.

### Ruta de detalle

Cada producto posee una ruta dinámica utilizando su identificador:

```text
/item/:id
```

Por ejemplo:

```text
/item/1
```

permite acceder al detalle de la Notebook Gamer.

```text
/item/6
```

permite acceder al detalle del procesador AMD Ryzen 7.

El identificador se obtiene mediante `useParams` y se utiliza para buscar el producto correspondiente mediante `getProductById`.

### Navegación interna

Los enlaces internos utilizan `Link` y `NavLink` en lugar de etiquetas HTML `<a>`.

Esto permite que React Router gestione la navegación sin recargar completamente la aplicación.

Además, `NavLink` permite identificar visualmente la sección activa mediante la propiedad `isActive`.

---

## 🧱 Layout compartido

La aplicación utiliza un layout general que mantiene los elementos principales de navegación presentes en todas las rutas.

La estructura principal se encuentra en `App.jsx`:

```text
BrowserRouter
    ↓
    App
    ↓
  Navbar
    ↓
   Main
    ↓
  Routes
    ↓
 Footer
```

El `Navbar`, el `CartWidget` y el `Footer` se encuentran fuera del componente `Routes`, por lo que permanecen disponibles mientras el usuario navega entre:

```text
/
/category/:categoryId
/item/:id
```

Esto permite mantener una experiencia de navegación consistente en toda la aplicación.

---

## 📦 Datos de productos

Los productos utilizados por el catálogo se encuentran definidos en:

```text
src/data/products.js
```

Actualmente se cuenta con seis productos:

* Notebook Gamer
* Mouse Gamer
* Teclado Mecánico
* Monitor 24 pulgadas
* Auriculares Gamer
* Procesador AMD Ryzen 7

Cada producto posee información como:

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

El producto correspondiente a la categoría Componentes es el procesador AMD Ryzen 7.

La información utilizada para las traducciones y las descripciones ampliadas se encuentra en los archivos de idioma dentro de:

```text
src/locals/
```

---

## 🔄 Carga dinámica y flujo asíncrono

La aplicación utiliza un flujo dinámico que simula la obtención de información desde una API.

La simulación se encuentra en:

```text
src/mock/asyncMock.js
```

La función `getProducts` devuelve una `Promise` y utiliza `setTimeout` para simular un tiempo de respuesta.

También se utiliza `getProductById` para obtener un producto específico.

### Flujo del catálogo

```text
ItemListContainer
        ↓
   useProducts()
        ↓
   getProducts()
        ↓
     Promise
        ↓
   setTimeout
        ↓
{ products, loading, error }
        ↓
    Filtrado
        ↓
    ItemList
        ↓
      .map()
        ↓
      Item
```

### Flujo del detalle

```text
Item
  ↓
Ver producto
  ↓
React Router
  ↓
/item/:id
  ↓
ItemDetailContainer
  ↓
useParams()
  ↓
getProductById(id)
  ↓
Promise
  ↓
ItemDetail
```

---

## 🌎 Internacionalización

La aplicación incorpora soporte multiidioma mediante la librería `react-i18next`.

Idiomas disponibles:

* Español 🇪🇸
* English 🇬🇧
* Deutsch 🇩🇪

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

* Navbar
* Título principal
* Nombres de productos
* Descripciones
* Categorías
* Stock disponible
* Botones
* Estados de carga
* Vista de detalle
* Footer

Cada nuevo producto incorporado al catálogo también cuenta con sus correspondientes traducciones.

---

## 🧠 Gestión de estado

La gestión de estado se implementa utilizando Hooks de React.

El Custom Hook `useProducts` administra el estado relacionado con la obtención del catálogo:

```jsx
const [products, setProducts] = useState([]);

const [loading, setLoading] = useState(true);

const [error, setError] = useState(null);
```

Dentro de `Item`, cada producto administra su estado independiente de favorito:

```jsx
const [esFavorito, setEsFavorito] = useState(false);
```

`ItemCount` administra la cantidad seleccionada de manera independiente:

```jsx
const [cantidad, setCantidad] = useState(0);
```

El contador incorpora validaciones para evitar valores negativos o superar el stock disponible.

La navegación y el producto seleccionado ya no se manejan mediante un estado local para cambiar de pantalla, sino mediante las rutas dinámicas proporcionadas por React Router.

A futuro, cuando sea necesario sincronizar las cantidades seleccionadas con componentes como `CartWidget`, el estado podrá elevarse mediante el patrón conocido como **lifting state up** o mediante Context API, que será incorporado en una etapa posterior.

---

## 🛒 Estado actual del carrito

El proyecto cuenta actualmente con:

* `CartWidget`
* Iconografía del carrito
* Botón `Agregar al carrito` en el detalle
* Contador de unidades

La funcionalidad completa de agregado, eliminación, actualización de cantidades y persistencia del carrito será implementada en una etapa posterior.

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

Ejecutar el proyecto en modo desarrollo:

```bash
npm run dev
```

Para generar una versión de producción:

```bash
npm run build
```

---

## 🎯 Objetivo

Desarrollar progresivamente un e-commerce completo utilizando React e incorporando:

* Componentes reutilizables
* Gestión de estado
* Custom Hooks
* Carga dinámica de productos
* Internacionalización
* Navegación mediante React Router
* Catálogo de productos
* Filtrado por categorías
* Detalle individual de productos
* Manejo de rutas inexistentes
* Carrito de compras
* Persistencia de datos
* Checkout
* Integración con Firebase

---

## 📌 Próximos pasos

Entre las próximas etapas del proyecto se encuentran:

* Completar la funcionalidad del carrito.
* Compartir el estado del carrito entre componentes.
* Implementar Context API.
* Implementar persistencia del carrito.
* Desarrollar el checkout.
* Integrar Firebase.
* Continuar mejorando la interfaz y la experiencia de usuario.
* Incorporar nuevas funcionalidades al catálogo.

---

## 👨‍💻 Autor

**Nicolás Fasanella**

Proyecto realizado como entrega del curso de React JS.

