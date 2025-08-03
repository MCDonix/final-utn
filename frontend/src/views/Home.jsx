import { useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { getProducts, deleteProduct, searchProducts, updateProduct } from "../services/products";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({ name: "", price: "", category: "" });

  const { user } = useAuth();

  const fetchProducts = async () => {
    const response = await getProducts();
    const responseToJson = await response.json();
    if (response.ok) {
      setProducts(responseToJson.data);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("¿Seguro que querés borrar el producto?")) {
      const response = await deleteProduct(id);
      if (response.ok) {
        alert("Producto borrado.");
        fetchProducts();
      } else {
        alert("Error al borrar.");
      }
    }
  };

  const handleSearch = async (term) => {
    const value = term ?? searchTerm;
    if (value.trim() === "") return fetchProducts();

    setIsSearching(true);
    try {
      const response = await searchProducts(value);
      const data = await response.json();
      if (response.ok) setProducts(data.data);
    } finally {
      setIsSearching(false);
    }
  };

  const handleEditClick = (product) => {
    setEditingProduct(product._id);
    setFormData({
      name: product.name,
      price: product.price,
      category: product.category
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const res = await updateProduct(editingProduct, formData);
    if (res.ok) {
      alert("Producto actualizado.");
      setEditingProduct(null);
      fetchProducts();
    } else {
      alert("Error al actualizar.");
    }
  };

  useEffect(() => { fetchProducts(); }, []);
  useEffect(() => {
    const delay = setTimeout(() => handleSearch(searchTerm), 500);
    return () => clearTimeout(delay);
  }, [searchTerm]);

  return (
    <Layout>
      <h1>Bienvenido a nuestra tienda de productos artesanales</h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {isSearching && <span>Buscando...</span>}
        {searchTerm && <button onClick={() => setSearchTerm("")}>✕</button>}
      </div>

      <section>
        {products.length === 0 ? (
          <p>No se encontraron productos.</p>
        ) : (
          products.map(product => (
            <div key={product._id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
              {editingProduct === product._id ? (
                <form onSubmit={handleEditSubmit}>
                  <input type="text" name="name" value={formData.name} onChange={handleEditChange} />
                  <input type="text" name="price" value={formData.price} onChange={handleEditChange} />
                  <input type="text" name="category" value={formData.category} onChange={handleEditChange} />
                  <button type="submit">Guardar</button>
                  <button type="button" onClick={() => setEditingProduct(null)}>Cancelar</button>
                </form>
              ) : (
                <>
                  <p><b>Nombre:</b> {product.name}</p>
                  <p><b>Precio:</b> {product.price}</p>
                  <p><b>Categoría:</b> {product.category}</p>
                  {user && (
                    <div className="button-group">
                      <button onClick={() => handleDelete(product._id)}>Borrar</button>
                      <button onClick={() => handleEditClick(product)}>Editar</button>
                    </div>
                  )}
                </>
              )}
            </div>
          ))
        )}
      </section>
    </Layout>
  );
};

export { Home };
