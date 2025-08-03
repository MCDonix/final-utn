import { useEffect, useState } from "react"
import { Layout } from "../components/Layout"
import { getProducts, deleteProduct, searchProducts } from "../services/products"
import { useAuth } from "../context/AuthContext"

const Home = () => {
  const [products, setProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isSearching, setIsSearching] = useState(false)

  const { user } = useAuth()

  const fetchProducts = async () => {
    const response = await getProducts()
    const responseToJson = await response.json()

    if (response.ok) {
      setProducts(responseToJson.data)
    }
  }

  const handleClick = async (id) => {
    if (confirm("Esta seguro que quieres borrar el producto?")) {
      const response = await deleteProduct(id)
      if (!response.ok) {
        alert("Error al borrar producto.")
      } else {
        alert("Producto borrado con éxito.")
        fetchProducts()
      }
    }
  }

  const handleSearch = async (term) => {
    const searchValue = term !== undefined ? term : searchTerm;

    if (searchValue.trim() === "") {
      fetchProducts();
      return;
    }

    setIsSearching(true);
    try {
      const response = await searchProducts(searchValue);
      const responseToJson = await response.json();

      if (response.ok) {
        setProducts(responseToJson.data);
      }
    } catch (error) {
      console.error("Error searching products:", error);
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    fetchProducts()
  }, [])

  // Efecto para la búsqueda en tiempo real
  useEffect(() => {
    const delaySearch = setTimeout(() => {
      handleSearch(searchTerm);
    }, 500); // Espera 500ms después de que el usuario deje de escribir

    return () => clearTimeout(delaySearch);
  }, [searchTerm]);

  return (
    <Layout>
      <h1>Bienvenido a nuestra tienda de productos artesanales</h1>
      <p>Descubrí nuestra selección exclusiva de productos únicos hechos a mano. Calidad y diseño en cada detalle.</p>

      <div className="search-container" style={{ marginBottom: "20px", position: "relative" }}>
        <input
          type="text"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "8px",
            width: "300px",
            paddingRight: searchTerm ? "40px" : "8px"
          }}
        />
        {isSearching && (
          <span style={{
            position: "absolute",
            right: searchTerm ? "40px" : "10px",
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: "12px",
            color: "#666"
          }}>
            Buscando...
          </span>
        )}
        {searchTerm && (
          <button
            onClick={() => {
              setSearchTerm("");
            }}
            style={{
              position: "absolute",
              right: "5px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "5px",
              fontSize: "16px"
            }}
          >
            ✕
          </button>
        )}
      </div>

      <section>
        {products.length === 0 ? (
          <p>No se encontraron productos.</p>
        ) : (
          products.map(product => (
            <div key={product._id}>
              <p><b>Nombre:</b> {product.name}</p>
              <p><b>Precio:</b> {product.price}</p>
              <p><b>Categoria:</b> {product.category}</p>
              {
                user && <div className="cont-button-product">
                  <button onClick={() => handleClick(product._id)}>Borrar</button>
                </div>
              }
            </div>
          ))
        )}
      </section>
    </Layout>
  )
}

export { Home }