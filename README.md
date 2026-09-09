
# NEOTECH

## 📖 Descripción

NEOTECH es un e-commerce de productos tecnológicos desarrollado con React como proyecto del curso de React JS.

El proyecto se encuentra en desarrollo y continuará incorporando funcionalidades a lo largo del curso.

Actualmente incluye:

- Catálogo dinámico con datos locales y carga asíncrona simulada.
- Navegación por categorías y detalle individual de productos.
- Selección de cantidades con control de stock.
- Carrito global mediante Context API.
- Actualización del stock restante en el catálogo y el detalle.
- Contador de unidades en el Navbar.
- Gestión de cantidades, eliminación de productos y totales.
- Interfaz en Español, Inglés y Alemán.
- Manejo de rutas y categorías inexistentes.

La carga del catálogo se encuentra separada en el Custom Hook `useProducts`. El estado del carrito se administra en `CartProvider` y se consume mediante el Custom Hook `useCart`.

---

## 🚀 Tecnologías utilizadas

- React.
- Vite.
- JavaScript ES6+.
- HTML5 y CSS3.
- React Hooks: `useState`, `useEffect` y `useContext`.
- Context API.
- Custom Hooks: `useProducts` y `useCart`.
- React Router.
- i18next y react-i18next.
- react-icons.
- flag-icons.
- LocalStorage para conservar el idioma.
- ESLint.
- Git y GitHub.

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
│   │   ├── LoaderComponent/
│   │   │   ├── LoaderComponent.css
│   │   │   └── LoaderComponent.jsx
│   │   │
│   │   ├── Navbar/
│   │   │   ├── Navbar.css
│   │   │   └── Navbar.jsx
│   │   │
│   │   └── NotFound/
│   │       └── NotFound.jsx
│   │
│   ├── context/
│   │   ├── CartContext.jsx
│   │   └── CartProvider.jsx
│   │
│   ├── data/
│   │   └── products.js
│   │
│   ├── hooks/
│   │   ├── useCart.js
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

`ProductDetailLoader` es un componente definido dentro de `ItemDetailContainer.jsx`; no tiene un archivo separado.

Las carpetas `node_modules/` y `dist/` no forman parte del código fuente versionado. La primera se genera al instalar dependencias y la segunda al compilar el proyecto.

---

## 🧩 Componentes principales

### Navbar

Contiene:

- Nombre de la tienda con enlace al inicio.
- Enlaces a las categorías.
- Selector de idioma.
- Componente `CartWidget`.

Utiliza `NavLink` para identificar la categoría activa. El idioma seleccionado se conserva mediante `localStorage`.

### CartWidget

Muestra el acceso al carrito y la suma de todas las unidades agregadas:

```jsx
const { totalItems } = useCart();
```

Si el carrito está vacío, el enlace permanece visible y se oculta el número.

El contador se actualiza al agregar productos, modificar cantidades, eliminar productos o vaciar el carrito.

### ItemListContainer

Controla la presentación del catálogo:

- Obtiene productos, carga y error mediante `useProducts`.
- Lee `categoryId` con `useParams`.
- Filtra los productos por categoría.
- Muestra `LoaderComponent` durante la carga.
- Muestra un error si falla la consulta.
- Utiliza `CategoryNotFound` para categorías inexistentes.
- Envía los productos filtrados a `ItemList`.

### ItemList

Recibe un array de productos y utiliza `.map()` para generar una tarjeta por producto:

```jsx
<Item key={product.id} product={product} />
```

### Item

Representa cada producto del catálogo y muestra:

- Imagen.
- Nombre.
- Descripción corta.
- Precio.
- Stock restante para agregar.
- Botón de favorito.
- Enlace al detalle.

Cada tarjeta administra su propio estado de favorito mediante `useState`. Este estado es local y no se guarda de forma persistente.

También consume `useCart` para descontar del stock original las unidades que ya están en el carrito.

### ItemCount

Es un componente controlado que recibe:

```jsx
function ItemCount({ stock, cantidad, setCantidad }) {
  // ...
}
```

No tiene un estado propio: `ItemDetail` administra la cantidad y le pasa el valor y su función de actualización.

Sus controles:

- Incrementan sin superar el stock recibido, mediante `Math.min`.
- Decrementan sin bajar de cero, mediante `Math.max`.
- Deshabilitan `−` cuando `cantidad <= 0`.
- Deshabilitan `+` cuando `cantidad >= stock`.

El stock recibido corresponde a las unidades que todavía pueden agregarse al carrito.

### ItemDetailContainer y ProductDetailLoader

`ItemDetailContainer` obtiene el ID de la URL y renderiza:

```jsx
<ProductDetailLoader key={id} id={id} />
```

Cuando cambia el ID, la `key` hace que React cree una nueva instancia de `ProductDetailLoader`, con sus estados iniciales.

`ProductDetailLoader`, definido en el mismo archivo:

- Administra los estados `producto` y `error`.
- Solicita el producto mediante `getProductById(Number(id))`.
- Muestra `LoaderComponent` mientras espera el resultado.
- Muestra un mensaje si la consulta falla.
- Envía el producto obtenido a `ItemDetail`.

El efecto utiliza una variable `activo` y una función de limpieza para ignorar respuestas cuando esa instancia ya no debe actualizarse. Esto no cancela la solicitud; evita utilizar su resultado.

### ItemDetail

Muestra:

- Imagen.
- Nombre.
- Categoría.
- Descripción ampliada.
- Precio.
- Stock restante.
- Selector de cantidad.
- Botón `Agregar al carrito`.

Administra la cantidad seleccionada:

```jsx
const [cantidad, setCantidad] = useState(0);
```

Consume `useCart` para consultar las unidades existentes y agregar productos.

Antes de agregar, valida:

```jsx
cantidad > 0 && cantidad <= stockDisponible
```

Después de agregar, reinicia el selector en cero.

El botón queda deshabilitado cuando la cantidad es cero, negativa o superior al stock restante.

### Cart

Representa la vista del carrito.

Si está vacío, muestra un mensaje y un enlace al catálogo.

Si contiene productos, muestra por cada uno:

- Imagen y nombre.
- Precio unitario.
- Stock original del producto como límite de cantidad.
- Cantidad agregada.
- Controles para aumentar o disminuir unidades.
- Subtotal.
- Botón para eliminar el producto.

En esta vista, la etiqueta de stock muestra el valor original `item.stock`. En el catálogo y el detalle se muestra el stock restante para agregar.

El resumen incluye:

- Total de unidades.
- Precio total.
- Botón `Vaciar carrito`.
- Botón `Finalizar compra`.

`Finalizar compra` es un placeholder: todavía no genera una orden ni procesa pagos.

### LoaderComponent

Componente reutilizable que muestra un indicador de carga y un texto recibido mediante la prop `text`.

Se utiliza durante la carga del catálogo y del detalle.

### CategoryNotFound

Muestra un mensaje cuando el identificador de categoría no corresponde a ninguna categoría disponible.

Ejemplo:

```text
/category/123456
```

### NotFound

Muestra un mensaje para rutas que no coinciden con las configuradas:

```jsx
<Route path="*" element={<NotFound />} />
```

### Footer

Incluye la identificación de la tienda y enlaces a LinkedIn, GitHub y el sitio personal del autor.

Permanece visible durante la navegación porque se encuentra fuera de `Routes`.

---

## 🛒 Context API y gestión del carrito

La implementación se organiza en tres archivos.

### CartContext.jsx

Ubicado en `src/context/CartContext.jsx`.

Crea y exporta el contexto:

```jsx
import { createContext } from "react";

export const CartContext = createContext();
```

### CartProvider.jsx

Ubicado en `src/context/CartProvider.jsx`.

Administra el estado del carrito:

```jsx
const [cart, setCart] = useState([]);
```

También contiene las operaciones del carrito y los cálculos de totales.

El Provider envuelve a `App` desde `main.jsx`, permitiendo conservar el carrito al navegar entre rutas.

### useCart.js

Ubicado en `src/hooks/useCart.js`.

Permite consumir el contexto:

```jsx
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export function useCart() {
  return useContext(CartContext);
}
```

Los componentes lo utilizan de esta forma:

```jsx
const { cart, addItem } = useCart();
```

Separar contexto, Provider y hook mantiene sus responsabilidades identificadas y evita mezclar exportaciones de componentes con otras exportaciones en el archivo del Provider.

### Operaciones y valores disponibles

| Nombre | Responsabilidad |
| --- | --- |
| `cart` | Array de productos agregados y sus cantidades |
| `addItem(item, quantity)` | Agrega un producto o suma unidades al existente |
| `increaseItem(itemId)` | Incrementa una unidad sin superar el stock original |
| `decreaseItem(itemId)` | Disminuye una unidad sin bajar de uno |
| `removeItem(itemId)` | Elimina un producto por su ID |
| `clear()` | Vacía el carrito |
| `isInCart(id)` | Indica si el producto está en el carrito |
| `totalItems` | Suma todas las unidades |
| `totalPrice` | Calcula el precio total |

### Productos sin duplicados

`addItem` busca el producto por su ID.

Si ya existe, actualiza su cantidad mediante `.map()`. Si no existe, crea una nueva entrada utilizando spread.

La cantidad acumulada se limita al stock original mediante `Math.min`.

### Actualizaciones inmutables

Las operaciones crean nuevos arrays y objetos:

- Spread para agregar productos y copiar objetos.
- `.map()` para actualizar cantidades.
- `.filter()` para eliminar productos.
- Un array vacío para limpiar el carrito.

El estado anterior no se modifica directamente.

### Totales

La cantidad total representa unidades, no solamente productos distintos:

```jsx
const totalItems = cart.reduce(
  (total, cartItem) => total + cartItem.quantity,
  0
);
```

El precio total suma el precio unitario multiplicado por la cantidad:

```jsx
const totalPrice = cart.reduce(
  (total, cartItem) =>
    total + cartItem.price * cartItem.quantity,
  0
);
```

---

## 📦 Control de stock

`Item` e `ItemDetail` consultan el carrito para calcular cuántas unidades todavía pueden agregarse.

El cálculo sigue esta lógica:

```jsx
const productoEnCarrito = cart.find(
  (item) => item.id === product.id
);

const cantidadEnCarrito = productoEnCarrito
  ? productoEnCarrito.quantity
  : 0;

const stockDisponible = Math.max(
  0,
  product.stock - cantidadEnCarrito
);
```

En `ItemDetail`, la prop del producto se llama `producto`, pero se aplica el mismo cálculo.

Ejemplo con un monitor cuyo stock original es 5:

| Acción | Unidades en carrito | Disponibles para agregar |
| --- | ---: | ---: |
| Estado inicial | 0 | 5 |
| Agregar 4 unidades | 4 | 1 |
| Agregar la última unidad | 5 | 0 |
| Quitar una unidad desde el carrito | 4 | 1 |
| Eliminar el producto | 0 | 5 |

El catálogo y el detalle se actualizan cuando cambia el carrito.

El stock de `products.js` no se modifica. Este cálculo representa la disponibilidad para el carrito actual; todavía no existe reserva de inventario ni descuento de stock en una base de datos.

---

## 🔄 Flujo del carrito

```text
Catálogo
   ↓
Item
   ↓
Ver producto
   ↓
ItemDetail
   ↓
ItemCount selecciona la cantidad
   ↓
Agregar al carrito
   ↓
addItem() en CartProvider
   ↓
Actualización del estado cart
   ↓
CartContext comparte los nuevos valores
   ↓
Componentes que consumen useCart()
   ├── Item: stock restante
   ├── ItemDetail: stock restante y límite del selector
   ├── CartWidget: total de unidades
   └── Cart: productos, cantidades, subtotales y total
```

Las acciones realizadas desde `Cart` actualizan el mismo estado global, manteniendo sincronizadas las vistas.

En `public/images/carrito/` se incluyen imágenes de referencia del carrito y un diagrama conceptual del proyecto.

---

## 🪝 Custom Hook: useProducts

Ubicado en:

```text
src/hooks/useProducts.js
```

Centraliza la carga del catálogo mediante `getProducts`.

Administra:

- `products`: listado de productos.
- `loading`: estado de carga.
- `error`: posible error.

Se consume desde `ItemListContainer`:

```jsx
const { products, loading, error } = useProducts();
```

La consulta individual del detalle se realiza por separado desde `ProductDetailLoader`.

---

## 🧭 Navegación con React Router

La configuración de rutas se encuentra en `App.jsx`.

La aplicación utiliza:

- `BrowserRouter`.
- `Routes` y `Route`.
- `Link` y `NavLink`.
- `useParams`.

### Rutas configuradas

| Ruta | Función |
| --- | --- |
| `/` | Catálogo completo |
| `/category/:categoryId` | Productos filtrados por categoría |
| `/item/:id` | Detalle individual |
| `/cart` | Carrito |
| `*` | Mensaje para rutas inexistentes |

### Categorías

| ID | Categoría |
| --- | --- |
| `1` | Notebooks |
| `2` | Periféricos |
| `3` | Monitores |
| `4` | Componentes |

### Navegación interna

Los enlaces internos utilizan `Link` y `NavLink` para navegar sin recargar toda la página.

`NavLink` permite aplicar un estilo a la categoría activa mediante `isActive`.

Los enlaces externos del Footer utilizan etiquetas `<a>`.

---

## 🧱 Organización de la aplicación

La jerarquía principal es:

```text
StrictMode
└── CartProvider
    └── App
        └── BrowserRouter
            └── Contenedor de la aplicación
                ├── Navbar
                │   └── CartWidget
                ├── main
                │   ├── Título de la tienda
                │   └── Routes
                └── Footer
```

`CartProvider` se monta desde `main.jsx`.

`BrowserRouter` se encuentra dentro de `App.jsx`.

El Navbar y el Footer permanecen visibles mientras cambia el contenido de las rutas. El Provider conserva el estado del carrito durante esa navegación.

---

## 📦 Datos de productos

Los productos están definidos en:

```text
src/data/products.js
```

El catálogo actual contiene:

- Notebook Gamer.
- Mouse Gamer.
- Teclado Mecánico.
- Monitor 24 pulgadas.
- Auriculares Gamer.
- Procesador AMD Ryzen 7.

Cada producto incluye:

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
  img: "/images/products/NotebookGamer.png",
  stock: 10,
  description:
    "Notebook gamer de alto rendimiento para juegos y aplicaciones exigentes."
}
```

Los nombres traducidos y las descripciones ampliadas se encuentran en los archivos de `src/locals/`.

---

## ⏳ Carga asíncrona

La simulación de consultas se encuentra en:

```text
src/mock/asyncMock.js
```

Utiliza `Promise` y `setTimeout` para simular un tiempo de respuesta.

### getProducts

Devuelve el catálogo completo.

```text
ItemListContainer
   ↓
useProducts()
   ↓
getProducts()
   ↓
Promise y setTimeout
   ↓
Listado de productos
   ↓
Filtrado por categoría
   ↓
ItemList
   ↓
Item
```

### getProductById

Busca un producto por ID y rechaza la promesa si no lo encuentra.

```text
/item/:id
   ↓
ItemDetailContainer
   ↓
useParams()
   ↓
ProductDetailLoader con key={id}
   ↓
getProductById(Number(id))
   ↓
Carga, producto o error
   ↓
ItemDetail
```

Durante la carga del detalle, `producto` comienza en `null`. Si la consulta falla, se muestra el error; si devuelve un producto, se renderiza su detalle.

---

## 🌎 Internacionalización

La configuración se encuentra en:

```text
src/i18n.js
```

La aplicación utiliza i18next y react-i18next con estos archivos:

```text
src/locals/es.json
src/locals/en.json
src/locals/de.json
```

Idiomas disponibles:

- Español.
- Inglés.
- Alemán.

Se traducen los textos principales del catálogo, detalle, navegación y carrito, incluidos nombres de productos, descripciones, categorías, controles y estados de carga.

Algunos mensajes de error y de rutas o categorías inexistentes todavía están escritos directamente en español.

El idioma se cambia desde el Navbar y se conserva mediante `localStorage`.

---

## 🧠 Gestión de estado

### Catálogo

`useProducts` administra:

```jsx
const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
```

### Favoritos

Cada instancia de `Item` administra su favorito:

```jsx
const [esFavorito, setEsFavorito] = useState(false);
```

Este estado no se comparte ni se conserva después de desmontar el componente.

### Cantidad seleccionada

`ItemDetail` administra:

```jsx
const [cantidad, setCantidad] = useState(0);
```

Pasa `cantidad`, `setCantidad` y el stock restante a `ItemCount`.

### Producto individual

`ProductDetailLoader` administra:

```jsx
const [producto, setProducto] = useState(null);
const [error, setError] = useState(null);
```

Cambiar el ID reinicia la instancia mediante `key={id}`.

### Carrito global

`CartProvider` administra:

```jsx
const [cart, setCart] = useState([]);
```

Los componentes acceden a este estado mediante `useCart`.

### Persistencia actual

- El carrito se conserva al navegar entre rutas.
- El carrito se reinicia al recargar la página.
- El idioma se conserva mediante `localStorage`.
- Los favoritos son locales a cada tarjeta.

La persistencia de compras y la integración con una base de datos se incorporarán en futuras etapas.

---

## ✅ Funcionalidades actuales

- Listado de productos con carga asíncrona simulada.
- Filtrado por categorías.
- Detalle individual con carga y manejo de error.
- Selección de cantidad entre cero y el stock restante.
- Validación de cantidad antes de agregar.
- Carrito compartido mediante Context API.
- Acumulación de cantidades sin duplicar productos.
- Control del máximo de unidades por producto.
- Stock restante sincronizado en catálogo y detalle.
- Incremento y reducción de cantidades desde el carrito.
- Eliminación individual de productos.
- Vaciado completo del carrito.
- Cálculo de subtotales y total de compra.
- Contador de unidades en el Navbar.
- Vista de carrito vacío con regreso al catálogo.
- Selector de idioma.
- Mensajes para rutas y categorías inexistentes.

El botón `Finalizar compra` está presente como placeholder. El flujo real de checkout, los datos del comprador y la generación de órdenes quedan pendientes.

---

## ⚙️ Instalación y ejecución

Se necesita Node.js y npm compatibles con las dependencias del proyecto.

Clonar el repositorio:

```bash
git clone https://github.com/DarkNeo-1981/neotech-ecommerce.git
```

Ingresar a la carpeta:

```bash
cd neotech-ecommerce
```

Instalar las dependencias:

```bash
npm install
```

Iniciar el servidor de desarrollo:

```bash
npm run dev
```

Abrir la dirección que indique Vite en la terminal.

### Revisión del código

Ejecutar ESLint:

```bash
npm run lint
```

Este comando revisa el código según la configuración de `eslint.config.js`.

### Compilación de producción

```bash
npm run build
```

Genera los archivos de producción en `dist/`. No publica el sitio ni impide continuar desarrollando.

### Vista previa de la compilación

Después de generar el build:

```bash
npm run preview
```

Permite revisar localmente la versión compilada.

---

## 🧪 Comprobación manual del carrito

Para verificar el flujo principal:

1. Abrir el detalle del monitor, cuyo stock original es 5.
2. Seleccionar 4 unidades y agregarlas.
3. Comprobar que el detalle muestre 1 unidad disponible.
4. Volver al catálogo y comprobar el mismo stock restante.
5. Volver al detalle y agregar la última unidad.
6. Comprobar que no se puedan agregar más unidades.
7. Abrir el carrito y verificar una sola entrada con 5 unidades.
8. Comprobar el subtotal y total de $1.600.000.
9. Reducir a 4 unidades y comprobar el total de $1.280.000.
10. Volver al detalle y comprobar que haya 1 unidad disponible.
11. Agregar otro producto y verificar la suma de unidades y precios.
12. Eliminar un producto y comprobar la actualización del carrito.
13. Vaciar el carrito y comprobar el mensaje y el enlace al catálogo.

Recargar la página vacía el carrito en esta etapa del proyecto.

---

## 🎯 Objetivo del proyecto

Desarrollar progresivamente un e-commerce completo, aplicando:

- Arquitectura basada en componentes.
- Gestión de estado local y global.
- Context API y Custom Hooks.
- Carga asíncrona.
- Navegación con React Router.
- Internacionalización.
- Control de cantidades y stock.
- Persistencia de datos.
- Checkout y generación de órdenes.

---

## 📌 Próximos pasos

- Integrar Firebase como fuente de datos.
- Incorporar los datos del comprador.
- Desarrollar el flujo completo de checkout.
- Generar y almacenar órdenes de compra.
- Implementar el descuento de stock en la base de datos.
- Definir la persistencia del carrito.
- Completar las traducciones de mensajes pendientes.
- Mejorar la interfaz y su adaptación a diferentes dispositivos.
- Optimizar los recursos visuales.
- Desplegar la aplicación.

---

## 👨‍💻 Autor

**Nicolás Fasanella**

Proyecto desarrollado durante el curso de React JS.

Repositorio: [neotech-ecommerce](https://github.com/DarkNeo-1981/neotech-ecommerce)

