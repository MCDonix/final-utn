// Variables de entorno en Vite se acceden a través de import.meta.env
// Las variables deben comenzar con VITE_ para ser accesibles en el cliente
const BASE_API = import.meta.env.VITE_API_URL

const getProducts = async () => {
  const response = await fetch(BASE_API + "/products")
  return response
}

const createProduct = async ({ name, price, category }) => {
  const response = await fetch(BASE_API + "/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, price, category })
  })
  return response
}

const deleteProduct = async (id) => {
  const response = await fetch(`${BASE_API}/products/${id}`, {
    method: "DELETE"
  })
  return response
}

const searchProducts = async (searchTerm) => {
  const response = await fetch(`${BASE_API}/products/search?query=${encodeURIComponent(searchTerm)}`)
  return response
}

export { getProducts, createProduct, deleteProduct, searchProducts }