
# NEOTECH

## 📖 Descripción

NEOTECH es un e-commerce de productos tecnológicos desarrollado con React como proyecto del curso de React JS.

El proyecto se encuentra en desarrollo y actualmente incorpora un catálogo persistente mediante Firebase Cloud Firestore, navegación por categorías, detalle de productos, carrito de compras global e internacionalización.

Actualmente incluye:

- Catálogo de productos almacenado en Cloud Firestore.
- Consultas asíncronas a Firebase.
- Filtrado de productos por categoría desde Firestore.
- Detalle individual de productos mediante su ID de Firebase.
- Carrito global mediante Context API.
- Control de cantidades y stock disponible.
- Navegación con React Router.
- Interfaz en Español, Inglés y Alemán.
- Estados de carga y manejo de errores.
- Configuración de Firebase mediante variables de entorno.

La autenticación de usuarios, el checkout protegido y la generación de órdenes se incorporarán en la siguiente etapa del desarrollo.

---

## 🚀 Tecnologías utilizadas

- React
- Vite
- JavaScript ES6+
- HTML5
- CSS3
- Firebase
- Cloud Firestore
- React Router
- Context API
- React Hooks
- Custom Hooks
- i18next
- react-i18next
- react-icons
- flag-icons
- LocalStorage
- ESLint
- Git
- GitHub

---

## 🔥 Integración con Firebase

Firebase se utiliza actualmente como fuente de datos del catálogo.

La configuración se encuentra centralizada en:

```text
src/firebase/config.js
```

El archivo inicializa Firebase y exporta las instancias necesarias para trabajar con:

```js
db
auth
```

`db` corresponde a Cloud Firestore.

`auth` queda preparado para la incorporación de Firebase Authentication.

---

## 🔐 Variables de entorno

La configuración de Firebase utiliza variables de entorno mediante Vite.

El proyecto requiere un archivo `.env` en la raíz con las siguientes variables:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

Los valores reales no se incluyen en el repositorio.

El archivo `.env` se encuentra incluido en `.gitignore`.

---

## 📦 Cloud Firestore

### Colección `products`

El catálogo se almacena en la colección:

```text
products
```

Cada producto utiliza un ID generado automáticamente por Firestore.

Ejemplo de documento:

```js
{
  name: "Notebook Gamer",
  price: 1500000,
  category: "Notebooks",
  img: "/images/products/NotebookGamer.png",
  stock: 10,
  description:
    "Notebook gamer de alto rendimiento para juegos y aplicaciones exigentes.",
  translationKey: "notebookGamer"
}
```

Campos utilizados:

| Campo | Tipo | Descripción |
|---|---|---|
| `name` | string | Nombre base del producto |
| `price` | number | Precio |
| `category` | string | Categoría |
| `img` | string | Ruta de la imagen |
| `stock` | number | Stock disponible |
| `description` | string | Descripción base |
| `translationKey` | string | Clave utilizada por i18next |

Actualmente el catálogo contiene:

- Notebook Gamer
- Mouse Gamer
- Teclado Mecánico
- Monitor 24 pulgadas
- Auriculares Gamer
- Procesador AMD Ryzen 7

Los antiguos archivos locales `products.js` y `asyncMock.js` fueron eliminados una vez completada la migración a Firestore.

---

## 🔎 Consulta del catálogo

La carga del catálogo se centraliza en:

```text
src/hooks/useProducts.js
```

El hook consulta la colección `products` mediante:

```js
collection()
getDocs()
```

Cuando se accede a una categoría específica se utilizan:

```js
query()
where()
```

De esta manera el filtrado se realiza directamente en Firestore y no después de descargar el catálogo completo.

El flujo general es:

```text
ItemListContainer
       ↓
useProducts(categoryId)
       ↓
Cloud Firestore
       ↓
collection / query / where
       ↓
getDocs()
       ↓
ItemList
       ↓
Item
```

---

## 🔍 Detalle de producto

La ruta:

```text
/item/:id
```

utiliza el ID automático generado por Firestore.

`ItemDetailContainer` obtiene un único documento mediante:

```js
doc()
getDoc()
```

Flujo:

```text
/item/:id
    ↓
ItemDetailContainer
    ↓
doc(db, "products", id)
    ↓
getDoc()
    ↓
ItemDetail
```

Si el producto no existe o la consulta falla, se muestra un mensaje de error.

Durante la consulta se utiliza `LoaderComponent`.

---

## 🌎 Internacionalización

NEOTECH utiliza:

- `i18next`
- `react-i18next`

Idiomas disponibles:

- Español
- Inglés
- Alemán

Los archivos se encuentran en:

```text
src/locals/es.json
src/locals/en.json
src/locals/de.json
```

Cada producto almacenado en Firebase incluye una propiedad:

```js
translationKey
```

Por ejemplo:

```js
translationKey: "notebookGamer"
```

Esa clave permite obtener el nombre y las descripciones correspondientes en cada idioma sin depender del ID automático generado por Firestore.

Ejemplo:

```js
t(`product.names.${product.translationKey}`)
```

El idioma seleccionado se conserva mediante `localStorage`.

---

## 🛒 Carrito de compras

El carrito utiliza Context API.

La implementación se encuentra principalmente en:

```text
src/context/CartContext.jsx
src/context/CartProvider.jsx
src/hooks/useCart.js
```

El carrito permite:

- Agregar productos.
- Acumular cantidades.
- Incrementar unidades.
- Disminuir unidades.
- Eliminar productos.
- Vaciar el carrito.
- Calcular cantidad total.
- Calcular precio total.
- Controlar el stock disponible.

El contador del Navbar muestra la cantidad total de unidades agregadas.

---

## 📦 Control de stock

El catálogo y el detalle calculan las unidades disponibles teniendo en cuenta las cantidades que ya se encuentran en el carrito.

Ejemplo:

```js
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

Por el momento este control corresponde al carrito actual y no modifica el stock almacenado en Firestore.

---

## 🧭 Navegación

La aplicación utiliza React Router.

Rutas actuales:

| Ruta | Función |
|---|---|
| `/` | Catálogo completo |
| `/category/:categoryId` | Productos por categoría |
| `/item/:id` | Detalle individual |
| `/cart` | Carrito de compras |
| `*` | Ruta inexistente |

Categorías:

| ID | Categoría |
|---|---|
| `1` | Notebooks |
| `2` | Periféricos |
| `3` | Monitores |
| `4` | Componentes |

---

## 📂 Estructura principal

```text
NEOTECH/
│
├── public/
│   └── images/
│       ├── carrito/
│       ├── logo/
│       └── products/
│
├── src/
│   ├── components/
│   │   ├── Cart/
│   │   ├── CartWidget/
│   │   ├── CategoryNotFound/
│   │   ├── Footer/
│   │   ├── Item/
│   │   ├── ItemCount/
│   │   ├── ItemDetail/
│   │   ├── ItemDetailContainer/
│   │   ├── ItemList/
│   │   ├── ItemListContainer/
│   │   ├── LoaderComponent/
│   │   ├── Navbar/
│   │   └── NotFound/
│   │
│   ├── context/
│   │   ├── CartContext.jsx
│   │   └── CartProvider.jsx
│   │
│   ├── firebase/
│   │   └── config.js
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
│   ├── App.css
│   ├── App.jsx
│   ├── i18n.js
│   ├── index.css
│   └── main.jsx
│
├── .env
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── README.md
└── vite.config.js
```

> `.env`, `node_modules/` y `dist/` no forman parte del código fuente versionado.

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

Crear el archivo `.env` con las variables de Firebase indicadas anteriormente.

Iniciar el servidor de desarrollo:

```bash
npm run dev
```

Vite mostrará en la terminal la dirección local de la aplicación.

---

## 🧪 Scripts disponibles

Servidor de desarrollo:

```bash
npm run dev
```

Revisión con ESLint:

```bash
npm run lint
```

Build de producción:

```bash
npm run build
```

Vista previa del build:

```bash
npm run preview
```

---

## 🧾 Colección de órdenes

La siguiente etapa incorporará una colección:

```text
orders
```

La estructura prevista para una orden será similar a:

```js
{
  userId: "uid-del-usuario",
  buyer: {
    name: "Nombre Apellido",
    phone: "123456789",
    address: "Dirección",
    city: "Ciudad"
  },
  items: [
    {
      id: "id-firestore-producto",
      name: "Notebook Gamer",
      price: 1500000,
      quantity: 1
    }
  ],
  total: 1500000,
  createdAt: serverTimestamp()
}
```

Esta colección todavía no forma parte del flujo funcional actual.

---

## ✅ Estado actual

Actualmente se encuentra implementado:

- Catálogo almacenado en Cloud Firestore.
- Consulta asíncrona de productos.
- Filtrado desde Firestore mediante `query` y `where`.
- Detalle mediante `doc` y `getDoc`.
- IDs automáticos de Firestore.
- Manejo de loading y errores.
- Internacionalización en tres idiomas.
- Carrito global con Context API.
- Control de cantidades.
- Control de stock disponible.
- Navegación mediante React Router.
- Variables de entorno para Firebase.

---

## 📌 Próximos pasos

- Incorporar Firebase Authentication.
- Crear `AuthContext`.
- Registro de usuarios.
- Inicio de sesión.
- Cierre de sesión.
- Persistencia de sesión con `onAuthStateChanged`.
- Proteger el checkout.
- Crear formulario de datos del comprador.
- Generar órdenes en Firestore.
- Mostrar el ID de la orden.
- Configurar las reglas definitivas de seguridad de Firestore.
- Desplegar el proyecto en Vercel.

---

## 👨‍💻 Autor

Nicolás Fasanella

Proyecto desarrollado durante el curso de React JS.

Repositorio:

```text
https://github.com/DarkNeo-1981/neotech-ecommerce
```

