import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';

const ProductDetails = () => {
   
  const dispatch = useDispatch();

  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/api/products/${id}`, {
      method: 'GET',
      credentials: 'include', 
    })
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
      <div className="flex flex-col sm:flex-row gap-4">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full sm:w-1/3 object-cover rounded-xl"
        />
        <div className="flex-1">
          <p className="mb-2">
            <strong>Price:</strong>₹{product.price}
          </p>
          <p className="mb-4">
            <strong>Description:</strong> {product.description}
          </p>
          <button
         onClick={(e) => {
          e.preventDefault(); 
          dispatch(addToCart(product));
        }}
          className="px-4 py-2 text-sm text-white bg-blue-400 rounded-lg shadow hover:bg-blue-600 transition"
        >
          Add to cart
        </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
