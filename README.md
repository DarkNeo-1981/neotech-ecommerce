
# NEOTECH

## 📖 Descripción

NEOTECH es un e-commerce desarrollado con React como proyecto final del curso de React JS.

El objetivo del proyecto es construir una aplicación moderna para la venta de productos tecnológicos, aplicando buenas prácticas de desarrollo, una arquitectura basada en componentes y una interfaz intuitiva.

Actualmente el proyecto se encuentra en desarrollo y continuará evolucionando a lo largo del curso.

---

## 🚀 Tecnologías utilizadas

* React
* Vite
* JavaScript (ES6+)
* HTML5
* CSS3

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

Actualmente funciona como representación visual del carrito. La integración con el estado de los productos será incorporada progresivamente a medida que avance el desarrollo del e-commerce.

### ItemListContainer

Contenedor principal del catálogo. Recibe mediante props el mensaje de bienvenida (`greeting`) y la lista de productos.

Se encarga de recorrer la información de los productos y renderizar un componente `Item` para cada uno.

### Item

Representa individualmente cada producto del catálogo, mostrando su imagen, nombre, precio y controles de interacción.

El componente utiliza `useState` para administrar dos estados independientes:

* `cantidad`: almacena la cantidad seleccionada del producto. Comienza en `0` y puede incrementarse o disminuirse mediante los botones correspondientes.
* `esFavorito`: determina si el producto fue marcado como favorito. Comienza en `false` y alterna entre `true` y `false` mediante el botón de favorito.

Las actualizaciones del estado utilizan la forma funcional del setter, por ejemplo `setCantidad(prev => prev + 1)` y `setEsFavorito(prev => !prev)`. De esta manera se trabaja sobre el valor anterior del estado sin realizar mutaciones directas.

Cada instancia del componente `Item` mantiene su propio estado, por lo que las interacciones realizadas sobre un producto no modifican los demás productos del catálogo.

### Footer

Pie de página de la aplicación con la identificación de la tienda.

---

## 🧠 Gestión de estado

La gestión de estado se implementa actualmente dentro del componente `Item` utilizando el hook `useState` de React.

Se eligieron dos estados independientes debido a que representan información de diferente naturaleza:

* `cantidad` utiliza un valor numérico porque debe permitir operaciones de incremento y decremento.
* `esFavorito` utiliza un valor booleano porque representa una condición de activado/desactivado.

Para actualizar ambos estados se utiliza la forma funcional del setter, tomando como referencia el valor anterior:

```jsx
setCantidad(prev => prev + 1);
setEsFavorito(prev => !prev);
```

El contador también incorpora una validación para evitar que la cantidad tome valores menores a `0`.

Esta implementación permite que cada producto administre de manera independiente su cantidad seleccionada y su estado de favorito, actualizando la interfaz automáticamente sin necesidad de recargar la página.

A futuro, cuando sea necesario sincronizar las cantidades seleccionadas con otros componentes como `CartWidget`, el estado podrá elevarse a un componente común mediante el patrón conocido como **lifting state up**.

---

## ⚙️ Instalación

Clonar el repositorio:

```bash
git clone https://github.com/DarkNeo-1981/neotech.git
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
* Navegación
* Catálogo de productos
* Carrito de compras
* Checkout
* Integración con Firebase

---

## 👨‍💻 Autor

**Nicolás Fasanella**

Proyecto realizado como entrega del curso de React JS.