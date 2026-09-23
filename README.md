
# NEOTECH

## 📖 Descripción

NEOTECH es un e-commerce de productos tecnológicos desarrollado con React como proyecto del curso de React JS.

La aplicación incorpora persistencia de datos mediante Firebase Cloud Firestore, autenticación de usuarios mediante Firebase Authentication, navegación por categorías, detalle de productos, carrito de compras global, checkout protegido, generación de órdenes de compra e internacionalización.

Actualmente incluye:

- Catálogo de productos almacenado en Cloud Firestore.
- Consultas asíncronas a Firebase.
- Filtrado de productos por categoría desde Firestore.
- Detalle individual de productos mediante su ID de Firebase.
- Registro de usuarios con Firebase Authentication.
- Inicio y cierre de sesión.
- Persistencia del usuario autenticado mediante `onAuthStateChanged`.
- Estado global de autenticación mediante `AuthContext`.
- Carrito global mediante Context API.
- Control de cantidades y stock disponible.
- Checkout protegido para usuarios autenticados.
- Formulario de datos del comprador.
- Generación de órdenes en Cloud Firestore.
- Asociación de órdenes con el usuario autenticado.
- Confirmación de compra mediante ID de orden.
- Navegación mediante React Router.
- Interfaz en Español, Inglés y Alemán.
- Estados de carga y manejo de errores.
- Configuración de Firebase mediante variables de entorno.

---

## 🚀 Tecnologías utilizadas

- React
- Vite
- JavaScript ES6+
- HTML5
- CSS3
- Firebase
- Cloud Firestore
- Firebase Authentication
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

Firebase se utiliza como backend para la persistencia de datos y la autenticación de usuarios.

La configuración se encuentra centralizada en:

```text
src/firebase/config.js
```

El archivo inicializa Firebase y exporta las instancias:

```js
db
auth
```

`db` corresponde a Cloud Firestore.

`auth` corresponde a Firebase Authentication.

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

La aplicación utiliza principalmente dos colecciones:

```text
products
orders
```

---

## 🛍️ Colección `products`

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

### Campos utilizados

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

Flujo general:

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

## 🔐 Firebase Authentication

NEOTECH utiliza Firebase Authentication mediante correo electrónico y contraseña.

La aplicación permite:

- Registrar nuevos usuarios.
- Iniciar sesión con una cuenta existente.
- Cerrar sesión.
- Mantener la sesión activa al recargar la aplicación.
- Mostrar el email del usuario autenticado en la barra de navegación.
- Mostrar mensajes de error durante el registro o inicio de sesión.

El contexto de autenticación se encuentra dividido entre:

```text
src/context/AuthContext.js
src/context/AuthContext.jsx
```

`AuthContext.js` crea y exporta el contexto.

`AuthContext.jsx` contiene el `AuthProvider` y administra el estado global de autenticación.

El contexto expone:

```js
user
register
login
logout
loadingAuth
```

La persistencia de sesión se gestiona mediante:

```js
onAuthStateChanged()
```

También se utiliza el custom hook:

```text
src/hooks/useAuth.js
```

para acceder al contexto desde los componentes.

---

## 👤 Registro e inicio de sesión

La aplicación incorpora las rutas:

```text
/login
/register
```

En el registro se solicita:

- Email.
- Contraseña.
- Confirmación de contraseña.

La contraseña debe tener como mínimo 6 caracteres.

Durante el registro y el inicio de sesión se contemplan errores como:

- Credenciales incorrectas.
- Email inválido.
- Email ya registrado.
- Contraseña débil.
- Contraseñas que no coinciden.

Los mensajes se encuentran internacionalizados mediante i18next.

---

## 🛡️ Checkout protegido

La ruta:

```text
/checkout
```

se encuentra protegida mediante un componente `ProtectedRoute`.

Únicamente los usuarios autenticados pueden acceder al proceso de compra.

Si un usuario intenta ingresar al checkout sin haber iniciado sesión, la aplicación lo redirige a:

```text
/login
```

Después de autenticarse puede continuar con el proceso de compra.

El checkout también verifica que el carrito contenga productos.

Si el carrito está vacío, no se permite generar una orden y el usuario es redirigido al carrito.

---

## 📝 Formulario de checkout

El checkout solicita los siguientes datos:

- Nombre y apellido.
- Teléfono.
- Dirección.
- Ciudad.

Todos los campos son obligatorios.

Antes de generar una orden se verifica nuevamente que:

- Exista un usuario autenticado.
- El carrito tenga productos.
- Los campos del formulario estén completos.

Durante la creación de la orden se muestra feedback de carga y, si ocurre un error, se informa al usuario sin vaciar el carrito.

---

## 🧾 Colección `orders`

Cuando el usuario confirma la compra se crea un documento dentro de:

```text
orders
```

La creación se realiza mediante:

```js
addDoc()
```

La fecha de creación se genera mediante:

```js
serverTimestamp()
```

Ejemplo de una orden:

```js
{
  userId: "uid-del-usuario",
  userEmail: "usuario@email.com",

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

### Campos principales

| Campo | Descripción |
|---|---|
| `userId` | UID del usuario autenticado |
| `userEmail` | Email del usuario que realizó la compra |
| `buyer` | Datos de entrega del comprador |
| `items` | Productos incluidos en la compra |
| `total` | Importe total de la orden |
| `createdAt` | Fecha generada por Firestore |

Después de crear correctamente la orden:

1. Firebase devuelve el ID del documento generado.
2. La aplicación muestra el ID de la orden al usuario.
3. Se informa que la compra fue registrada.
4. El carrito se vacía.

El carrito únicamente se vacía después de que `addDoc()` finaliza correctamente.

Si ocurre un error, los productos permanecen en el carrito.

---

## 🔒 Reglas de seguridad

Las reglas de seguridad de Cloud Firestore controlan el acceso a los datos independientemente de las validaciones realizadas desde React.

La colección `products` puede ser consultada por la aplicación.

La creación de documentos dentro de `orders` requiere que exista un usuario autenticado mediante Firebase Authentication.

De esta forma, un usuario no autenticado no puede crear órdenes directamente en Firestore.

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

Los textos correspondientes a autenticación, carrito y checkout también se encuentran traducidos.

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
| `/login` | Inicio de sesión |
| `/register` | Registro de usuario |
| `/checkout` | Checkout protegido |
| `*` | Ruta inexistente |

### Categorías

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
│   │   │   ├── Cart.jsx
│   │   │   └── Cart.css
│   │   │
│   │   ├── CartWidget/
│   │   ├── CategoryNotFound/
│   │   │
│   │   ├── Checkout/
│   │   │   ├── Checkout.jsx
│   │   │   └── Checkout.css
│   │   │
│   │   ├── Footer/
│   │   ├── Item/
│   │   ├── ItemCount/
│   │   ├── ItemDetail/
│   │   ├── ItemDetailContainer/
│   │   ├── ItemList/
│   │   ├── ItemListContainer/
│   │   ├── LoaderComponent/
│   │   ├── Login/
│   │   ├── Navbar/
│   │   ├── NotFound/
│   │   ├── ProtectedRoute/
│   │   └── Register/
│   │
│   ├── context/
│   │   ├── AuthContext.js
│   │   ├── AuthContext.jsx
│   │   ├── CartContext.jsx
│   │   └── CartProvider.jsx
│   │
│   ├── firebase/
│   │   └── config.js
│   │
│   ├── hooks/
│   │   ├── useAuth.js
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

Crear un archivo:

```text
.env
```

en la raíz del proyecto y completar las variables de Firebase indicadas anteriormente.

Iniciar el servidor de desarrollo:

```bash
npm run dev
```

Vite mostrará en la terminal la dirección local de la aplicación.

---

## 🧪 Scripts disponibles

### Servidor de desarrollo

```bash
npm run dev
```

### Revisión con ESLint

```bash
npm run lint
```

### Build de producción

```bash
npm run build
```

### Vista previa del build

```bash
npm run preview
```

---

## ✅ Estado actual

Actualmente se encuentra implementado:

- Catálogo almacenado en Cloud Firestore.
- Consulta asíncrona de productos.
- Filtrado desde Firestore mediante `query` y `where`.
- Detalle mediante `doc` y `getDoc`.
- IDs automáticos de Firestore.
- Manejo de loading y errores.
- Firebase Authentication.
- Registro de usuarios.
- Inicio de sesión.
- Cierre de sesión.
- Persistencia mediante `onAuthStateChanged`.
- `AuthContext` global.
- Email del usuario autenticado en el Navbar.
- Internacionalización en tres idiomas.
- Carrito global con Context API.
- Control de cantidades.
- Control de stock disponible.
- Navegación mediante React Router.
- Checkout protegido.
- Validación de carrito vacío.
- Formulario de datos del comprador.
- Generación de órdenes mediante `addDoc`.
- Asociación de órdenes al usuario autenticado.
- Fecha de órdenes mediante `serverTimestamp`.
- Confirmación mediante ID de orden.
- Vaciado del carrito únicamente después de una compra exitosa.
- Reglas de seguridad para impedir órdenes de usuarios no autenticados.
- Variables de entorno para Firebase.

---

## 📌 Próximos pasos

La lógica principal requerida para esta pre-entrega se encuentra implementada.

Las próximas mejoras corresponden a la etapa de consolidación y despliegue final:

- Realizar el build de producción.
- Revisar casos de borde y experiencia de usuario.
- Optimizar detalles visuales.
- Desplegar el proyecto en Vercel.
- Configurar las variables de entorno en Vercel.
- Agregar el dominio de producción a Firebase Authentication.
- Realizar pruebas finales sobre la versión publicada.

---

## 👨‍💻 Autor

Nicolás Fasanella

Proyecto desarrollado durante el curso de React JS.

Repositorio:

```text
https://github.com/DarkNeo-1981/neotech-ecommerce
```

