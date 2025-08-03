
# 🛍️ App UTN - Gestión de Productos Artesanales

Aplicación web con frontend en React y backend en Node.js + Express, que permite administrar una lista de productos artesanales. Implementa funcionalidades de autenticación, búsqueda, creación, edición y eliminación de productos usando MongoDB como base de datos.

---

## 🚀 Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/app-utn.git
cd app-utn
```

2. **Instalar dependencias del frontend y backend**
```bash
# En la carpeta raíz, instalar backend
cd backend
npm install

# Instalar dotenv
npm install dotenv

# Volver a la raíz y entrar al frontend
cd ../frontend
npm install
```

---

## ⚙️ Configuración de variables de entorno

### 🗂️ Backend (`backend/.env`)
Crea un archivo `.env` en la carpeta `backend` con el siguiente contenido:

```env
PORT=1234
MONGO_URI=mongodb://localhost:27017/mi_basededatos
JWT_SECRET=una_clave_secreta_segura
```

### 🗂️ Frontend (`frontend/.env`)
Crea un archivo `.env` en la carpeta `frontend` con:

```env
VITE_API_URL=http://localhost:1234/api
```

Luego, reiniciá Vite si ya estaba corriendo:

```bash
npm run dev
```

---

## 🧪 Funcionalidades principales

### 🔍 Buscar productos
- Campo de búsqueda en tiempo real por nombre del producto.
- Se comunica con la API `/products/search?query=...`

### ➕ Agregar producto
- Formulario con campos: `name`, `price`, `category`.
- Se envía a través de `POST /products`.

### ✏️ Editar producto
- Cada producto tiene un botón "Editar".
- Permite modificar los datos actuales y guardarlos con `PUT /products/:id`.

### 🗑️ Eliminar producto
- Botón "Borrar" que ejecuta un `DELETE /products/:id` con confirmación previa.

---

## 🧰 Stack tecnológico

- ⚛️ React
- 🟩 Node.js + Express
- 🌿 MongoDB + Mongoose
- 🔐 Autenticación con JWT
- 📦 dotenv para variables de entorno

---

## 💬 Scripts útiles

### Backend
```bash
npm run dev       # Ejecutar backend con nodemon
```

### Frontend
```bash
npm run dev       # Ejecutar frontend con Vite
```

---

## 📌 Notas

- Asegurate de que MongoDB esté corriendo localmente o en Atlas.
- La aplicación no usa Docker por defecto, pero puede adaptarse fácilmente.

---

## 🤝 Autor

Proyecto basado en el modelo UTN. Modificado y extendido por MFGT.
