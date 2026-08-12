
# NEOTECH

## 📖 Descripción

NEOTECH es un e-commerce desarrollado con React como proyecto final del curso de React JS.

El objetivo del proyecto es construir una aplicación moderna para la venta de productos tecnológicos, aplicando buenas prácticas de desarrollo, una arquitectura basada en componentes y una interfaz intuitiva.

Actualmente el proyecto se encuentra en desarrollo y continuará evolucionando a lo largo del curso.

---

## 🚀 Tecnologías utilizadas

- React
- Vite
- JavaScript (ES6+)
- HTML5
- CSS3

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

Componente encargado de mostrar el ícono del carrito y la cantidad de productos agregados. Actualmente la cantidad está representada mediante un valor estático.

### ItemListContainer

Contenedor principal del catálogo. Recibe mediante props el mensaje de bienvenida (`greeting`) y la lista de productos.

### Item

Representa individualmente cada producto del catálogo, mostrando su imagen, nombre, precio y botón de acceso al producto.

### Footer

Pie de página de la aplicación con la identificación de la tienda.

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

- Componentes reutilizables
- Navegación
- Catálogo de productos
- Carrito de compras
- Checkout
- Integración con Firebase

---

## 👨‍💻 Autor

**Nicolás Fasanella**

Proyecto realizado como entrega del curso de React JS.