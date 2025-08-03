import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  const [isInitialized, setIsInitialized] = useState(false)

  // Efecto para cargar el token desde localStorage al iniciar/refrescar la aplicación
  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    if (storedToken) {
      try {
        // Verificar si el token ha expirado
        const decodedToken = jwtDecode(storedToken)
        const currentTime = Date.now() / 1000

        if (decodedToken.exp > currentTime) {
          setToken(storedToken)
          setUser(decodedToken)
        } else {
          // Si el token ha expirado, lo eliminamos
          localStorage.removeItem("token")
        }
      } catch (error) {
        // Si hay un error al decodificar el token, lo eliminamos
        console.error("Error al decodificar el token:", error)
        localStorage.removeItem("token")
      }
    }
    setIsInitialized(true)
  }, [])

  const handleToken = (token) => {
    if (token !== undefined) {
      localStorage.setItem("token", token)
    }
    setToken(token)
    setUser(jwtDecode(token))
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, handleToken, handleLogout, isInitialized }}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => useContext(AuthContext)

export { AuthProvider, useAuth }