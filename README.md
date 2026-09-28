
# NEOTECH

## 📖 Descripción

NEOTECH es un e-commerce de productos tecnológicos desarrollado con React como proyecto del curso de React JS.

La aplicación incorpora persistencia de datos mediante Firebase Cloud Firestore, autenticación de usuarios mediante Firebase Authentication, navegación por categorías, detalle de productos, carrito de compras global con persistencia local, checkout protegido, generación de órdenes de compra e internacionalización.

**Aplicación publicada:** [NEOTECH en Vercel](https://neotech-ecommerce.vercel.app/)

Actualmente incluye:

- Catálogo de productos almacenado en Cloud Firestore.
- Consultas asíncronas a Firebase.
- Filtrado de productos por categoría desde Firestore.
- Protección frente a respuestas desactualizadas al cambiar de categoría.
- Mensajes para categorías vacías y catálogo sin productos.
- Detalle individual de productos mediante su ID de Firebase.
- Registro de usuarios con Firebase Authentication.
- Inicio y cierre de sesión.
- Persistencia del usuario autenticado mediante `onAuthStateChanged`.
- Estado global de autenticación mediante `AuthContext`.
- Carrito global mediante Context API.
- Persistencia del carrito mediante `localStorage`.
- Control de cantidades y stock disponible en el carrito.
- Confirmaciones para eliminar productos y vaciar el carrito.
- Checkout protegido para usuarios autenticados.
- Mensaje de autenticación requerida al ingresar desde el checkout.
- Formulario de datos del comprador.
- Generación de órdenes en Cloud Firestore.
- Asociación de órdenes con el usuario autenticado.
- Confirmación de compra mediante ID de orden.
- Navegación mediante React Router.
- Interfaz en Español, Inglés y Alemán.
- Estados de carga y manejo de errores.
- Pantallas de producto, categoría y página inexistentes con estilos y traducciones.
- Configuración de Firebase mediante variables de entorno.
- Plantilla de configuración en `.env.example`.
- Reglas de seguridad versionadas en `firestore.rules`.
- Mapa de categorías centralizado en un módulo compartido.
- Diseño adaptable a escritorio y dispositivos móviles.

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
- SweetAlert2
- canvas-confetti
- LocalStorage
- ESLint
- Git
- GitHub
- Vercel

---

## 🔥 Integración con Firebase

Firebase se utiliza como backend para la persistencia de datos y la autenticación de usuarios.

La configuración se encuentra centralizada en:

```text
src/firebase/config.js
```

El archivo inicializa Firebase y exporta las instancias:

- `db`: instancia de Cloud Firestore.
- `auth`: instancia de Firebase Authentication.

---

## 🔐 Variables de entorno

La configuración de Firebase utiliza variables de entorno mediante Vite.

El repositorio incluye el archivo `.env.example` en la raíz del proyecto como plantilla de configuración:

```env
VITE_FIREBASE_API_KEY=TU_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=TU_PROYECTO.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=TU_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET=TU_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID=TU_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID=TU_APP_ID
```

Estos valores son ejemplos y deben reemplazarse con la configuración del proyecto de Firebase.

Para configurar el entorno local:

1. Copiar `.env.example` y nombrar la copia `.env`.
2. Reemplazar los valores de ejemplo por los correspondientes al proyecto de Firebase.
3. Guardar el archivo antes de iniciar la aplicación.

Si ya existe un `.env` configurado, se debe conservar.

El archivo `.env` se encuentra incluido en `.gitignore`. El archivo `.env.example` sí forma parte del repositorio.

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

El mapa de categorías se importa desde `src/constants/categories.js`, compartido con `ItemListContainer`.

El hook ignora las respuestas de consultas anteriores cuando cambia la categoría o se desmonta el componente. Esto evita que una consulta anterior sobrescriba los productos, el error o el estado de carga de la consulta actual.

Esta protección descarta resultados desactualizados; no cancela las peticiones enviadas a Firestore.

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

### Estados del listado

El listado distingue entre:

- Consulta en curso: muestra un indicador de carga.
- Error de consulta: informa el problema.
- Categoría inexistente: muestra la pantalla correspondiente.
- Categoría válida sin productos: muestra un mensaje y un enlace para volver al catálogo.
- Catálogo completo vacío: informa que no hay productos disponibles.
- Consulta con resultados: muestra las tarjetas de productos.

Los mensajes de catálogo y categoría vacíos están disponibles en los tres idiomas.

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

Durante la consulta se utiliza `LoaderComponent`.

Si el producto no existe o la consulta falla, se muestra una tarjeta con un mensaje traducido y un enlace para volver al catálogo.

El enlace apunta directamente a `/`, por lo que funciona también cuando el usuario ingresó desde una dirección externa o escribió la URL manualmente.

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

El estado de autenticación se sincroniza mediante:

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

Cuando el usuario llega al login desde el checkout, se muestra un mensaje que explica que debe iniciar sesión para completar la compra.

Después de iniciar sesión, se utiliza la ruta de origen para regresar al checkout.

---

## 🛡️ Checkout protegido

La ruta:

```text
/checkout
```

se encuentra protegida mediante un componente `ProtectedRoute`.

El contenido depende del estado de autenticación:

- Mientras se valida la sesión, se muestra un indicador de carga.
- Si no existe un usuario autenticado, se redirige al login.
- Si el usuario está autenticado, se muestra el checkout.

El usuario puede iniciar sesión y continuar con la compra sin perder los productos del carrito.

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
- Los campos obligatorios contengan texto después de quitar los espacios iniciales y finales.

Durante la creación de la orden, el botón muestra el estado de procesamiento y queda deshabilitado.

Si la operación falla:

- Se muestra un mensaje de error.
- Se conservan los productos del carrito.
- El botón vuelve a habilitarse.
- No se muestra una confirmación de compra.

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
4. El carrito se vacía y se actualiza su almacenamiento local.
5. Se muestra una animación de confirmación con confeti.

El carrito únicamente se vacía después de que `addDoc()` finaliza correctamente.

Si ocurre un error durante el guardado, los productos permanecen en el carrito.

---

## 🔒 Reglas de seguridad

Las reglas de seguridad de Cloud Firestore controlan el acceso a los datos independientemente de las validaciones realizadas desde React.

Las reglas se encuentran versionadas en el archivo:

```text
firestore.rules
```

Su contenido es:

```text
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {

    match /products/{productId} {
      allow read: if true;
      allow write: if false;
    }

    match /orders/{orderId} {
      allow create: if request.auth != null;
      allow read, update, delete: if false;
    }
  }
}
```

Estas reglas establecen que:

- La colección `products` permite lectura pública.
- La escritura de productos desde el cliente está bloqueada.
- La creación de órdenes requiere un usuario autenticado.
- La lectura, modificación y eliminación de órdenes desde el cliente están bloqueadas.

De esta forma, un usuario no autenticado no puede crear órdenes directamente en Firestore.

El archivo permite revisar y mantener las reglas junto con el código fuente. Guardarlo en GitHub no actualiza automáticamente las reglas publicadas en Firebase.

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

También se encuentran traducidos:

- Formularios y mensajes de autenticación.
- Carrito y checkout.
- Confirmaciones para eliminar productos y vaciar el carrito.
- Mensajes de catálogo y categoría vacíos.
- Pantallas de producto, categoría y página inexistentes.
- Mensaje de error de carga del detalle.

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
- Controlar el stock disponible en el carrito.
- Conservar los productos al recargar la página.

El contador del Navbar muestra la cantidad total de unidades agregadas.

### Persistencia local

El carrito se guarda en `localStorage` bajo la clave:

```text
neotech-cart
```

Al iniciar la aplicación, se recupera el contenido guardado y se valida su estructura básica.

Cada modificación del carrito actualiza el almacenamiento local, incluyendo:

- Cambios de cantidades.
- Eliminación de productos.
- Vaciado manual.
- Vaciado después de una compra exitosa.

Si los datos guardados no se pueden interpretar, la aplicación inicia con un carrito vacío. Si el navegador no permite guardar los cambios, el carrito continúa funcionando en memoria.

La persistencia corresponde al mismo navegador y origen. El entorno local y la aplicación publicada en Vercel mantienen carritos independientes.

El carrito no está asociado a una cuenta ni se sincroniza entre dispositivos.

### Confirmaciones de eliminación

Se utiliza SweetAlert2 para confirmar dos acciones:

- Eliminar todas las unidades de un producto mediante el botón del tachito.
- Vaciar completamente el carrito.

Si el usuario cancela, el carrito conserva su contenido.

Si confirma, se realiza la acción, se actualizan cantidades y totales, y se muestra un aviso de éxito.

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

Los controles de cantidad limitan las unidades según el stock disponible en los datos utilizados por la aplicación.

Si todas las unidades disponibles ya están en el carrito, no se permite agregar más desde el detalle. Al quitar una unidad, vuelve a estar disponible para seleccionarla.

Por el momento, este control corresponde al carrito actual y no modifica el stock almacenado en Firestore.

Los precios y el stock recuperados del carrito persistido no se actualizan automáticamente cuando cambian en Firebase.

---

## 🧭 Navegación

La aplicación utiliza React Router.

Rutas actuales:

| Ruta | Función |
|---|---|
| `/` | Catálogo completo |
| `/category/:categoryId` | Productos por categoría |
| `/item/:id` | Detalle individual |
| `/favorites` | Productos favoritos |
| `/cart` | Carrito de compras |
| `/login` | Inicio de sesión |
| `/register` | Registro de usuario |
| `/checkout` | Checkout protegido |
| `*` | Ruta inexistente |

### Categorías

El mapa de categorías está centralizado en:

```text
src/constants/categories.js
```

```js
export const categories = {
  1: "Notebooks",
  2: "Periféricos",
  3: "Monitores",
  4: "Componentes",
};
```

Este módulo es utilizado por:

- `useProducts.js`, para validar la categoría y construir la consulta a Firestore.
- `ItemListContainer.jsx`, para validar la categoría de la ruta y mostrar la vista correspondiente.

Así se evita mantener el mismo objeto duplicado en ambos archivos.

| ID | Categoría |
|---|---|
| `1` | Notebooks |
| `2` | Periféricos |
| `3` | Monitores |
| `4` | Componentes |

### Rutas y recursos inexistentes

La aplicación diferencia entre:

- Categoría inexistente.
- Producto inexistente.
- Página inexistente.

Estas situaciones muestran mensajes traducidos y un enlace directo para volver al catálogo.

Las pantallas utilizan tarjetas centradas, botones con el estilo de NEOTECH y ajustes para pantallas pequeñas.

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
│   │   │   └── CategoryNotFound.jsx
│   │   │
│   │   ├── Checkout/
│   │   │   ├── Checkout.jsx
│   │   │   └── Checkout.css
│   │   │
│   │   ├── Favorites/
│   │   ├── Footer/
│   │   ├── Item/
│   │   ├── ItemCount/
│   │   ├── ItemDetail/
│   │   ├── ItemDetailContainer/
│   │   │   ├── ItemDetailContainer.jsx
│   │   │   └── ItemDetailContainer.css
│   │   │
│   │   ├── ItemList/
│   │   ├── ItemListContainer/
│   │   ├── LoaderComponent/
│   │   ├── Login/
│   │   ├── Navbar/
│   │   ├── NotFound/
│   │   │   ├── NotFound.jsx
│   │   │   └── NotFound.css
│   │   │
│   │   ├── ProtectedRoute/
│   │   └── Register/
│   │
│   ├── constants/
│   │   └── categories.js
│   │
│   ├── context/
│   │   ├── AuthContext.js
│   │   ├── AuthContext.jsx
│   │   ├── CartContext.jsx
│   │   ├── CartProvider.jsx
│   │   ├── FavoritesContext.js
│   │   └── FavoritesProvider.jsx
│   │
│   ├── firebase/
│   │   └── config.js
│   │
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── useCart.js
│   │   ├── useFavorites.js
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
├── .env.example
├── .gitignore
├── eslint.config.js
├── firestore.rules
├── index.html
├── package.json
├── package-lock.json
├── README.md
├── vercel.json
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

Copiar el archivo `.env.example` como `.env` en la raíz del proyecto.

Reemplazar los valores de ejemplo con la configuración del proyecto de Firebase, según la sección de variables de entorno.

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

## 🌐 Despliegue

La aplicación está publicada en Vercel:

[https://neotech-ecommerce.vercel.app/](https://neotech-ecommerce.vercel.app/)

El proyecto está conectado al repositorio de GitHub y los cambios enviados a la rama `main` generan nuevos despliegues.

Las variables de entorno de Firebase se configuran en Vercel. El archivo `.env` local no se sube al repositorio.

El proyecto incluye `vercel.json` para permitir el acceso directo a las rutas de React Router en producción.

---

## ✅ Verificaciones realizadas

Durante la preparación de la entrega final se realizaron comprobaciones manuales en desarrollo y en la aplicación publicada.

### Catálogo y navegación

- Carga del catálogo desde Firestore.
- Filtrado de las cuatro categorías.
- Consulta del detalle de producto.
- Cambios rápidos entre categorías.
- Mensaje de categoría válida sin productos y sus traducciones.
- Regreso al catálogo desde la categoría vacía.
- Mensajes de categoría, producto y página inexistentes.
- Traducciones y enlaces de regreso de las pantallas de recursos inexistentes.

### Carrito

- Agregado de productos.
- Incremento y disminución de cantidades.
- Cálculo de subtotales, cantidad total y precio total.
- Límite de cantidades según el stock.
- Disponibilidad de una unidad después de reducir la cantidad en el carrito.
- Cancelación y confirmación de la eliminación de productos.
- Vaciado del carrito.
- Persistencia del carrito al recargar.
- Persistencia de la eliminación y del vaciado después de recargar.

### Autenticación y checkout

- Registro e inicio de sesión.
- Persistencia de la sesión al recargar.
- Cierre de sesión.
- Redirección al login al intentar acceder al checkout sin sesión.
- Mensaje de autenticación requerida.
- Regreso al checkout después del login con el carrito conservado.
- Generación de una orden y visualización de su ID de confirmación.
- Vaciado del carrito después de una compra exitosa.

### Manejo de errores

Se realizó una simulación temporal y local de un error antes de guardar una orden para comprobar que:

- Se muestra el mensaje de error.
- El carrito conserva sus productos.
- El botón vuelve a habilitarse.
- No se muestra una confirmación de compra.

La simulación se retiró después de la prueba. Esta comprobación valida la respuesta de la interfaz ante una excepción, no todos los posibles errores de red o de Firebase.

### Producción y presentación

- Despliegues completados en Vercel.
- Acceso y recarga de rutas internas.
- Uso de la aplicación desde un teléfono.
- Revisión de la consola sin errores observados durante el recorrido normal probado.
- Ejecución de ESLint sin errores.
- Compilación de producción completada correctamente.

Estas verificaciones corresponden a pruebas manuales de los recorridos descritos.

---

## 📌 Alcance y próximas mejoras

La aplicación integra las funcionalidades desarrolladas durante el curso y se encuentra publicada en Vercel.

Como posibles mejoras posteriores se consideran:

- Optimizar el tamaño de los archivos generados en el build. La compilación actual finaliza correctamente, pero muestra una advertencia por el tamaño del JavaScript generado.
- Actualizar precios y stock de los productos recuperados del carrito persistido.
- Incorporar una validación de precios y stock del lado del servidor antes de registrar una compra.
- Ampliar las validaciones de las órdenes en las reglas de Firestore.
- Incorporar pruebas automatizadas de los flujos principales.

El proyecto registra órdenes de compra; no integra una pasarela de pagos.

---

## 👨‍💻 Autor

Nicolás Fasanella

Proyecto desarrollado durante el curso de React JS.

**Aplicación:** [NEOTECH en Vercel](https://neotech-ecommerce.vercel.app/)

**Repositorio:** [neotech-ecommerce](https://github.com/DarkNeo-1981/neotech-ecommerce)