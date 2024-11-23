import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../redux/slices/cartSlice";

const Cart = () => {
  const [isCartVisible, setIsCartVisible] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const total = useSelector((state) => state.cart.total);
  const dispatch = useDispatch();
  console.log("Items", cartItems);
  // console.log("Quanity", quantity);

  useEffect(() => {
    if (cartItems.length > 0) {
      setIsCartVisible(true);
    }
  }, [cartItems]);

  const handleCloseCart = () => {
    setIsCartVisible(false);
  };

  const handleShowCart = () => {
    setIsCartVisible(true);
  };

  return (
    <div>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded-lg"
        onClick={handleShowCart}
      >
        Show cart
      </button>
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-lg transform ${
          isCartVisible ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 w-96 z-50`}
      >
        <button
          onClick={handleCloseCart}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl"
        >
          ✕
        </button>
        <div className="p-4">
          <h2 className="text-lg font-bold mb-4">Shopping Cart</h2>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between mb-4"
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-16 h-20 rounded"
                />
                <div className="flex-1 ml-4">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.color}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <button
                      className="bg-gray-300 text-gray-700 px-2 py-1 rounded hover:bg-gray-400 focus:outline-none"
                      onClick={() =>
                        item.quantity > 1 &&
                        dispatch(updateQuantity({id: item.id,quantity: item.quantity - 1,}))
                      }
                    >
                      -
                    </button>
                    <p className="text-sm font-medium">{item.quantity}</p>
                    <button
                      className="bg-gray-300 text-gray-700 px-2 py-1 rounded hover:bg-gray-400 focus:outline-none"
                      onClick={() =>
                        dispatch(updateQuantity({id: item.id,quantity: item.quantity + 1,}))
                      }
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-bold">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="text-sm text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Your cart is empty.</p>
          )}
          <hr className="my-4" />
          <div className="flex justify-between font-semibold">
            <span>Subtotal</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
          <button className="w-full bg-blue-500 text-white py-2 mt-4 rounded-lg hover:bg-blue-600">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
