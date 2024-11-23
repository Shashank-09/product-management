import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';

import { addToCart } from '../redux/slices/cartSlice';

const ProductCard = ({ product, onEdit, onDelete }) => {
const dispatch = useDispatch();

  return (
    <Link to={`/products/${product._id}`} className="block bg-white rounded-lg shadow-md overflow-hidden border hover:shadow-lg transition">
      <div>
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-96 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 truncate">{product.name}</h3>
          <p className="text-gray-500 text-sm mt-2 truncate">{product.color || product.description}</p>
          <p className="text-lg font-bold text-gray-900 mt-2">₹{product.price}</p>
        </div>
      </div>
      <div className="p-4 flex justify-end gap-2 items-center">
      <button
         onClick={(e) => {
          e.preventDefault(); 
          dispatch(addToCart(product));
        }}
          className="px-4 py-2 text-sm text-white bg-blue-400 rounded-lg shadow hover:bg-blue-600 transition"
        >
          Add to cart
        </button>
        <button
          onClick={(e) => {
            e.preventDefault(); 
            onEdit(product);
          }}
          className="px-4 py-2 text-sm text-white bg-yellow-500 rounded-lg shadow hover:bg-yellow-600 transition"
        >
          Edit
        </button>
        <button
          onClick={(e) => {
            e.preventDefault(); 
            onDelete(product.id);
          }}
          className="px-4 py-2 text-sm text-white bg-red-500 rounded-lg shadow hover:bg-red-600 transition"
        >
          Delete
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
