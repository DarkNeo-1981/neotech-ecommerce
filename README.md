
# NEOTECH

## 📖 Descripción

NEOTECH es un e-commerce desarrollado con React como proyecto final del curso de React JS.

El objetivo del proyecto es construir una aplicación moderna para la venta de productos tecnológicos, aplicando buenas prácticas de desarrollo, una arquitectura basada en componentes, gestión de estado y una interfaz intuitiva.

El proyecto se encuentra en desarrollo y continuará incorporando nuevas funcionalidades a lo largo del curso.

Actualmente la aplicación cuenta con un catálogo dinámico de productos utilizando una fuente de datos local y una simulación de carga asíncrona mediante `Promise` y `setTimeout`.

También se incorporó internacionalización mediante `react-i18next`, permitiendo cambiar dinámicamente el idioma de la aplicación entre Español, Inglés y Alemán.

La lógica de carga de productos se encuentra separada en un Custom Hook llamado `useProducts`, manteniendo los componentes enfocados en la presentación y la interacción con el usuario.

La aplicación incorpora una vista de detalle individual para cada producto, con información ampliada, selección de cantidad y funcionalidad real para agregar productos al carrito.

El carrito de compras se encuentra administrado globalmente mediante Context API a través de `CartProvider` y `useCart`, permitiendo compartir su estado entre diferentes componentes de la aplicación.

Desde el carrito es posible aumentar o disminuir unidades, eliminar productos completos, vaciar el carrito y visualizar automáticamente la cantidad total de productos, subtotales y precio total.

El proyecto también incorpora navegación mediante React Router, permitiendo desplazarse entre las diferentes secciones del e-commerce, filtrar productos por categoría, acceder a detalles individuales y consultar el carrito sin realizar recargas completas de la página.

Se incorporó además una página `NotFound` para manejar rutas inexistentes y un componente `CategoryNotFound` para informar cuando se solicita una categoría que no existe.

---

## 🚀 Tecnologías utilizadas

- React
- Vite
- JavaScript (ES6+)
- HTML5
- CSS3
- React Hooks (`useState`, `useEffect`, `useContext`)
- Context API
- Custom Hooks (`useProducts`)
- React Router
- react-i18next
- react-icons
- flag-icons
- LocalStorage
- Git
- GitHub

---

## 📂 Estructura del proyecto

```text
NEOTECH/
│
├── public/
│   └── images/
│       ├── carrito/
│       │   ├── Carrito lleno.png
│       │   ├── Carrito vacio.png
│       │   └── diagrama de flujo.png
│       │
│       ├── logo/
│       │   └── neotech-32x32.png
│       │
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
│   │   ├── Cart/
│   │   │   ├── Cart.css
│   │   │   └── Cart.jsx
│   │   │
│   │   ├── CartWidget/
│   │   │   ├── CartWidget.css
│   │   │   └── CartWidget.jsx
│   │   │
│   │   ├── CategoryNotFound/
│   │   │   └── CategoryNotFound.jsx
│   │   │
│   │   ├── Footer/
│   │   │   ├── Footer.css
│   │   │   └── Footer.jsx
│   │   │
│   │   ├── Item/
│   │   │   ├── Item.css
│   │   │   └── Item.jsx
│   │   │
│   │   ├── ItemCount/
│   │   │   ├── ItemCount.css
│   │   │   └── ItemCount.jsx
│   │   │
│   │   ├── ItemDetail/
│   │   │   ├── ItemDetail.css
│   │   │   └── ItemDetail.jsx
│   │   │
│   │   ├── ItemDetailContainer/
│   │   │   └── ItemDetailContainer.jsx
│   │   │
│   │   ├── ItemList/
│   │   │   └── ItemList.jsx
│   │   │
│   │   ├── ItemListContainer/
│   │   │   ├── ItemListContainer.css
│   │   │   └── ItemListContainer.jsx
│   │   │
│   │   ├── Navbar/
│   │   │   ├── Navbar.css
│   │   │   └── Navbar.jsx
│   │   │
│   │   └── NotFound/
│   │       └── NotFound.jsx
│   │
│   ├── context/
│   │   └── CartContext.jsx
│   │
│   ├── data/
│   │   └── products.js
│   │
│   ├── hooks/
│   │   └── useProducts.js
│   │
│   ├── locals/
│   │   ├── de.json
│   │   ├── en.json
│   │   └── es.json
│   │
│   ├── mock/
│   │   └── asyncMock.js
│   │
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

- Nombre de la tienda
- Categorías de productos
- Selector de idioma
- Componente `CartWidget`

El nombre de NEOTECH funciona también como enlace al inicio de la aplicación.

El selector permite cambiar dinámicamente entre:

- Español 🇪🇸
- English 🇬🇧
- Deutsch 🇩🇪

El idioma seleccionado se almacena utilizando `localStorage`.

La navegación interna utiliza los componentes `Link` y `NavLink` de React Router, evitando recargas completas de la aplicación.

Los `NavLink` utilizan la propiedad `isActive` para aplicar un estilo visual diferente a la categoría actualmente seleccionada.

---

### CartWidget

Componente encargado de mostrar el acceso al carrito de compras desde el Navbar.

Obtiene la cantidad total de unidades mediante el Context del carrito:

```jsx
const { totalItems } = useCart();
```

Cuando existen productos agregados, muestra un indicador con la cantidad total de unidades presentes en el carrito.

Por ejemplo:

```text
🛒 3
```

El contador se actualiza automáticamente cuando se:

- Agrega un producto.
- Aumenta una cantidad.
- Disminuye una cantidad.
- Elimina un producto.
- Vacía completamente el carrito.

Al hacer clic sobre el componente se navega hacia:

```text
/cart
```

---

### Cart

Componente encargado de representar visualmente el carrito de compras.

Utiliza el Context del carrito mediante:

```jsx
const {
  cart,
  increaseItem,
  decreaseItem,
  removeItem,
  clear,
  totalItems,
  totalPrice,
} = useCart();
```

Cada producto agregado muestra:

- Imagen.
- Nombre.
- Precio unitario.
- Stock disponible.
- Cantidad seleccionada.
- Controles para aumentar o disminuir unidades.
- Subtotal.
- Botón para eliminar completamente el producto.

Los controles de cantidad utilizan:

```text
−   cantidad   +
```

El botón `−` disminuye una unidad mientras la cantidad sea mayor a `1`.

El botón `+` aumenta una unidad mientras no se supere el stock disponible.

El botón de eliminación permite retirar completamente un producto del carrito independientemente de la cantidad agregada.

También se incorpora un botón para vaciar completamente el carrito.

---

### Resumen de compra

La vista del carrito incluye un panel independiente de resumen.

Actualmente muestra:

- Cantidad total de productos.
- Precio total de la compra.
- Botón para vaciar el carrito.
- Botón para finalizar la compra.

El precio total se calcula dinámicamente utilizando el estado compartido del carrito.

El diseño utiliza una distribución de dos columnas en pantallas grandes:

```text
Productos del carrito        Resumen de compra
```

En pantallas más pequeñas el diseño se adapta automáticamente a una única columna mediante CSS responsive.

---

### Carrito vacío

Cuando no existen productos agregados se muestra un estado especial:

```text
Tu carrito está vacío
```

También se incorpora un enlace para regresar al catálogo.

Este estado evita renderizar innecesariamente el listado y el resumen cuando el carrito no contiene productos.

---

### ItemListContainer

Es el componente contenedor principal del catálogo.

Su responsabilidad es controlar:

- Carga de productos.
- Estado de error.
- Filtrado por categoría.
- Renderizado del listado.

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

- Imagen.
- Nombre.
- Descripción corta.
- Precio.
- Stock disponible.
- Botón para marcar el producto como favorito.
- Botón para acceder al detalle del producto.

El componente utiliza `useState` para administrar el estado del favorito:

```jsx
const [esFavorito, setEsFavorito] = useState(false);
```

Cada instancia de `Item` mantiene su propio estado, por lo que marcar un producto como favorito no modifica los demás productos.

El acceso al detalle utiliza navegación mediante React Router.

La selección de cantidad fue trasladada a la vista de detalle para mantener las tarjetas del catálogo más simples y enfocadas en la presentación del producto.

---

### ItemCount

Componente reutilizable encargado de controlar la cantidad de unidades de un producto antes de agregarlo al carrito.

Utiliza `useState` para administrar la cantidad seleccionada.

El contador incorpora validaciones para evitar:

- Valores inferiores al mínimo permitido.
- Superar el stock disponible.

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

- Producto seleccionado.
- Carga.
- Error.

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

- Imagen.
- Nombre.
- Categoría.
- Descripción detallada.
- Precio.
- Stock disponible.
- Contador de unidades.
- Botón `Agregar al carrito`.

La vista utiliza una descripción ampliada diferente de la utilizada en las tarjetas del catálogo.

El botón `Agregar al carrito` se encuentra integrado con `CartContext` y permite almacenar el producto seleccionado junto con la cantidad elegida.

Si el producto ya se encuentra dentro del carrito, la nueva cantidad se acumula sin crear un registro duplicado.

La cantidad total nunca puede superar el stock disponible.

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

En este caso se muestra un mensaje indicando que la categoría no fue encontrada.

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

- Identificación de NEOTECH.
- Información de copyright.
- Enlaces a redes sociales.
- Traducción dinámica según el idioma seleccionado.

El Footer se encuentra fuera de `Routes`, por lo que permanece visible en las diferentes rutas de la aplicación.

---

## 🛒 Context API y gestión del carrito

La aplicación utiliza Context API para compartir el estado del carrito entre diferentes componentes sin necesidad de pasar información manualmente mediante props a través de toda la jerarquía.

El Context se encuentra definido en:

```text
src/context/CartContext.jsx
```

El componente principal es:

```jsx
CartProvider
```

y los componentes pueden acceder al estado mediante el Custom Hook:

```jsx
useCart()
```

El estado principal del carrito se administra utilizando:

```jsx
const [cart, setCart] = useState([]);
```

---

### Funciones disponibles

El Context proporciona las siguientes operaciones:

```text
addItem
increaseItem
decreaseItem
removeItem
clear
isInCart
totalItems
totalPrice
```

---

### addItem

Permite agregar un producto junto con una cantidad seleccionada.

```jsx
addItem(item, quantity)
```

Si el producto todavía no existe en el carrito, se agrega al array.

Si ya existe, se actualiza su cantidad acumulando las nuevas unidades.

También se utiliza el stock como límite máximo para evitar agregar más unidades de las disponibles.

---

### increaseItem

Aumenta en una unidad la cantidad de un producto existente.

```jsx
increaseItem(itemId)
```

Solo permite incrementar la cantidad mientras sea menor al stock disponible.

---

### decreaseItem

Disminuye en una unidad la cantidad de un producto.

```jsx
decreaseItem(itemId)
```

La cantidad mínima dentro del carrito es `1`.

Para eliminar completamente un producto se utiliza `removeItem`.

---

### removeItem

Elimina completamente del carrito el producto correspondiente al ID recibido.

```jsx
removeItem(itemId)
```

---

### clear

Vacía completamente el carrito:

```jsx
clear()
```

---

### isInCart

Permite comprobar si un producto ya se encuentra presente en el carrito:

```jsx
isInCart(id)
```

---

### totalItems

Calcula automáticamente la cantidad total de unidades existentes en el carrito mediante `reduce`.

```jsx
const totalItems = cart.reduce(
  (total, cartItem) => total + cartItem.quantity,
  0
);
```

Este valor es utilizado por `CartWidget`.

---

### totalPrice

Calcula automáticamente el precio total de la compra:

```jsx
const totalPrice = cart.reduce(
  (total, cartItem) =>
    total + cartItem.price * cartItem.quantity,
  0
);
```

Este valor se muestra dentro del resumen de compra.

---

## 🔄 Flujo del carrito

El flujo principal de interacción es:

```text
Catálogo
   ↓
Item
   ↓
Ver producto
   ↓
ItemDetail
   ↓
ItemCount
   ↓
Agregar al carrito
   ↓
addItem()
   ↓
CartContext
   ↓
Estado global cart
   ↓
┌──────────────────────┐
│                      │
↓                      ↓
CartWidget            Cart
│                      │
Cantidad total       Productos
                      Subtotales
                      Cantidades
                      Total
```

Cuando se modifica una cantidad desde `Cart`, el estado global cambia y React vuelve a renderizar automáticamente los componentes que utilizan dicha información.

Por esta razón, el número mostrado en `CartWidget` y el total mostrado en `Cart` permanecen sincronizados.

---

## 📊 Diagrama de flujo

Dentro del proyecto se incluye un diagrama conceptual del flujo de datos y navegación del carrito:

```text
public/images/carrito/diagrama de flujo.png
```

El diagrama representa la relación entre:

- `App.jsx`
- `CartProvider`
- React Router
- `Navbar`
- `CartWidget`
- Catálogo
- `ItemDetail`
- Carrito
- Context API
- Navegación entre vistas
- Posible persistencia futura

Su objetivo es representar visualmente cómo circulan los datos del carrito y cómo los distintos componentes acceden al estado compartido.

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

El proyecto utiliza `react-router-dom` para implementar navegación mediante React Router.

La configuración principal se encuentra en `App.jsx`.

La aplicación utiliza:

- `BrowserRouter`
- `Routes`
- `Route`
- `Link`
- `NavLink`
- `useParams`

Esto permite navegar entre las diferentes vistas sin realizar una recarga completa de la aplicación.

---

### Rutas configuradas

| Ruta | Función |
| --- | --- |
| `/` | Página principal con el listado de productos |
| `/category/:categoryId` | Filtrado de productos por categoría |
| `/item/:id` | Detalle individual de un producto |
| `/cart` | Carrito de compras |
| `*` | Página 404 para rutas inexistentes |

---

### Rutas de categorías

Las categorías utilizan parámetros dinámicos:

```text
/category/1
/category/2
/category/3
/category/4
```

Cada identificador representa una categoría diferente:

- `1` → Notebooks
- `2` → Periféricos
- `3` → Monitores
- `4` → Componentes

El catálogo se actualiza de acuerdo con la categoría seleccionada.

Si se ingresa un identificador que no corresponde a ninguna categoría, se muestra `CategoryNotFound`.

---

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

---

### Ruta del carrito

El carrito utiliza la ruta:

```text
/cart
```

El acceso principal se realiza desde `CartWidget`, ubicado en el Navbar.

React Router renderiza el componente `Cart` sin realizar una recarga completa de la página.

---

### Navegación interna

Los enlaces internos utilizan `Link` y `NavLink` en lugar de etiquetas HTML `<a>`.

Esto permite que React Router gestione la navegación sin recargar completamente la aplicación.

Además, `NavLink` permite identificar visualmente la sección activa mediante la propiedad `isActive`.

---

## 🧱 Layout compartido

La aplicación utiliza un layout general que mantiene los elementos principales de navegación presentes en todas las rutas.

El flujo general puede representarse de la siguiente forma:

```text
BrowserRouter
      ↓
     App
      ↓
 CartProvider
      ↓
   Navbar
      ↓
    Main
      ↓
   Routes
      ↓
   Footer
```

El `CartProvider` permite compartir globalmente el estado del carrito.

El `Navbar`, `CartWidget` y `Footer` permanecen disponibles mientras el usuario navega entre:

```text
/
/category/:categoryId
/item/:id
/cart
```

Esto permite mantener una experiencia de navegación consistente en toda la aplicación.

---

## 📦 Datos de productos

Los productos utilizados por el catálogo se encuentran definidos en:

```text
src/data/products.js
```

Actualmente se cuenta con seis productos:

- Notebook Gamer.
- Mouse Gamer.
- Teclado Mecánico.
- Monitor 24 pulgadas.
- Auriculares Gamer.
- Procesador AMD Ryzen 7.

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
  description:
    "Notebook gamer de alto rendimiento para juegos y aplicaciones exigentes."
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

---

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

---

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
 ↓
ItemCount
 ↓
addItem()
 ↓
CartContext
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

- Navbar.
- Título principal.
- Nombres de productos.
- Descripciones.
- Categorías.
- Stock disponible.
- Botones.
- Estados de carga.
- Vista de detalle.
- Carrito de compras.
- Resumen de compra.
- Estado de carrito vacío.
- Acciones del carrito.
- Footer.

Cada nuevo producto incorporado al catálogo también cuenta con sus correspondientes traducciones.

El idioma seleccionado se conserva mediante `localStorage`.

---

## 🧠 Gestión de estado

La gestión de estado se implementa utilizando diferentes Hooks de React según la responsabilidad de cada componente.

### Estado del catálogo

El Custom Hook `useProducts` administra el estado relacionado con la obtención del catálogo:

```jsx
const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
```

---

### Estado de favoritos

Dentro de `Item`, cada producto administra su estado independiente de favorito:

```jsx
const [esFavorito, setEsFavorito] = useState(false);
```

---

### Estado de ItemCount

`ItemCount` administra localmente la cantidad seleccionada antes de agregar un producto al carrito.

El contador incorpora validaciones para evitar valores inferiores al mínimo permitido o superar el stock disponible.

---

### Estado global del carrito

El carrito utiliza Context API para compartir su estado entre componentes.

El estado se encuentra centralizado en `CartProvider`:

```jsx
const [cart, setCart] = useState([]);
```

Gracias a este enfoque, componentes como:

```text
ItemDetail
CartWidget
Cart
```

pueden interactuar con la misma información sin necesidad de utilizar Prop Drilling.

---

## 🛒 Estado actual del carrito

El carrito de compras se encuentra actualmente funcional.

Permite:

- Agregar productos desde `ItemDetail`.
- Seleccionar la cantidad antes de agregar.
- Acumular cantidades de un mismo producto.
- Evitar superar el stock disponible.
- Consultar los productos agregados.
- Aumentar unidades desde el carrito.
- Disminuir unidades desde el carrito.
- Eliminar completamente un producto.
- Vaciar el carrito.
- Calcular subtotales.
- Calcular automáticamente el total de unidades.
- Calcular automáticamente el precio total.
- Sincronizar el contador del `CartWidget`.
- Mostrar un estado especial cuando el carrito está vacío.
- Traducir toda la interfaz del carrito entre Español, Inglés y Alemán.
- Adaptar el diseño a dispositivos móviles.

La vista utiliza una distribución inspirada en los patrones habituales de los e-commerce modernos, separando el listado de productos del resumen de compra.

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

- Componentes reutilizables.
- Gestión de estado.
- Context API.
- Custom Hooks.
- Carga dinámica de productos.
- Internacionalización.
- Navegación mediante React Router.
- Catálogo de productos.
- Filtrado por categorías.
- Detalle individual de productos.
- Manejo de rutas inexistentes.
- Carrito de compras.
- Control de cantidades y stock.
- Persistencia de datos.
- Checkout.
- Integración con Firebase.

---

## 📌 Próximos pasos

Entre las próximas etapas del proyecto se encuentran:

- Implementar persistencia del carrito.
- Desarrollar el flujo completo de checkout.
- Incorporar los datos del comprador.
- Generar la orden de compra.
- Integrar Firebase como fuente de datos.
- Almacenar las órdenes generadas.
- Continuar mejorando la interfaz y la experiencia de usuario.
- Incorporar nuevas funcionalidades al catálogo.
- Continuar adaptando la aplicación a diferentes dispositivos.

---

## 👨‍💻 Autor

**Nicolás Fasanella**

Proyecto realizado como entrega del curso de React JS.

