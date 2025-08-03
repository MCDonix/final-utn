// Variables de entorno en Vite se acceden a través de import.meta.env
// Las variables deben comenzar con VITE_ para ser accesibles en el cliente
const BASE_API = import.meta.env.VITE_API_URL

const register = async ({ username, email, password }) => {
  const response = await fetch(BASE_API + "/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password })
  })

  return response
}

const login = async ({ email, password }) => {
  const response = await fetch(BASE_API + "/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  })

  return response
}

export { register, login }