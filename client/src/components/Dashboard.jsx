import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import AddProduct from './AddProductModal';
import EditProductModal from './EditProductModal'; 
import Cart from './Cart';


const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null); 
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); 


  useEffect(() => {
    fetch('http://localhost:3000/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:3000/api/products/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setProducts(products.filter((product) => product._id !== id)); 
    } else {
      console.error('Error deleting product');
      alert('Error deleting product');
    }
  };

  const handleProductAdded = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  const handleProductUpdated = (updatedProduct) => {
    setProducts(
      products.map((product) =>
        product._id === updatedProduct._id ? updatedProduct : product
      )
    );
  };

  const handleEditClick = (product) => {
    setEditProduct(product);
    setIsEditModalOpen(true); 
  };

  
  return (
    <>
    <div className="container mx-auto p-4">
      <h1 className="text-2xl  font-bold mb-4">Product Dashboard</h1>
      <div className="mb-4 flex gap-2">
        <AddProduct onProductAdded={handleProductAdded} />
        <Cart />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onDelete={() => handleDelete(product._id)}
            onEdit={() => handleEditClick(product)} 
          />
        ))}
      </div>

      {isEditModalOpen && (
        <EditProductModal
          product={editProduct}
          onClose={() => setIsEditModalOpen(false)}
          onProductUpdated={handleProductUpdated}
        />
      )}
    </div>
    </>
  );
  
};

export default Dashboard;
