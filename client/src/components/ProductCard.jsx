const ProductCard = ({ product, onEdit, onDelete, onView }) => (
  <div className="border p-4 rounded-lg shadow-lg h-[520px] flex flex-col bg-white">
    <div className="h-80  w-full bg-gray-100 rounded-lg overflow-hidden shadow-sm">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
      />
    </div>

    <div className="flex-1 flex flex-col justify-between mt-4">
      <div>
        <h2 className="font-bold text-xl text-gray-800">{product.name}</h2>
        <p className="text-gray-700 font-semibold text-lg mt-1">${product.price}</p>
        <p className="text-gray-600 text-sm mt-2 line-clamp-2">{product.description}</p>
      </div>
      <div className="flex items-center justify-between mt-4">
        <button className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition">
          Add to Cart
        </button>
        <div className="flex gap-2">
          <button
            onClick={() => onView(product)}
            className=" text-black border px-4 py-2 rounded-lg shadow  transition"
          >
            View
          </button>
          <button
            onClick={() => onEdit(product)}
            className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow hover:bg-yellow-600 transition"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(product.id)}
            className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default ProductCard;






