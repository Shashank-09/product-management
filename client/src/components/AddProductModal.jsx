import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const AddProductModal = ({ onProductAdded }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
  });
  
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', formData.name);
    data.append('price', formData.price);
    data.append('description', formData.description);
    if (imageFile) {
      data.append('image', imageFile);
    }

    try {
      const response = await fetch('http://localhost:3000/api/products', {
        method: 'POST',
        body: data, 
      });

      if (response.ok) {
        const newProduct = await response.json();
        onProductAdded(newProduct.product); 
        setFormData({ name: '', price: '', description: '' });
        setImageFile(null); 
        setIsOpen(false); 
        toast.success('Product added successfully!');
      } else {
        toast.error('Failed to add product!');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
    }
  };

  return (
    <>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        onClick={() => setIsOpen(true)}
      >
        Add Product
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Add Product</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border px-4 py-2 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Price</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full border px-4 py-2 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full border px-4 py-2 rounded"
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full border px-4 py-2 rounded"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
     <ToastContainer />
    </>
  );
};

export default AddProductModal;
