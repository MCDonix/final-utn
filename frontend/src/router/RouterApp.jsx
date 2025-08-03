import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { Home } from "../views/Home"
import { Dashboard } from "../views/Dashboard"
import { Login } from "../views/Login"
import { Register } from "../views/Register"
import { useAuth } from "../context/AuthContext"

// Componente para rutas protegidas
const ProtectedRoute = ({ children }) => {
  const { user, isInitialized } = useAuth();

  // Mientras se está verificando el token, mostramos un indicador de carga
  if (!isInitialized) {
    return <div>Cargando...</div>;
  }

  // Si el usuario no está autenticado, redirigimos al login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Si el usuario está autenticado, mostramos el contenido de la ruta
  return children;
};

const RouterApp = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

// Componente separado para usar hooks dentro del BrowserRouter
const AppRoutes = () => {
  const { isInitialized } = useAuth();

  // No renderizamos las rutas hasta que se haya verificado si hay un token válido
  if (!isInitialized) {
    return <div>Cargando aplicación...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export { RouterApp }