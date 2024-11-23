import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    total: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;

      const existingProduct = state.items.find((item) => item.id === product._id);   // Check if  already exists 
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.items.push({  // PUSH PRODUCT INTO ARRAY 
          id: product._id, 
          name: product.name, 
          price: product.price, 
          quantity: 1, 
          imageUrl: product.imageUrl, 
        });
      }
      state.total += product.price;
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      const existingProduct = state.items.find((item) => item.id === productId);

      if (existingProduct) {
        state.total -= existingProduct.price * existingProduct.quantity;

        state.items = state.items.filter((item) => item.id !== productId);
      }
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
    
      const item = state.items.find((item) => item.id === id);
    
      if (item) {
        item.quantity = quantity; //UPDATE QUANTITY
    
        state.total = state.items.reduce(
          (acc, curr) => acc + curr.price * curr.quantity,
          0
        );
      } else {
        console.error(`Item with id  not found`);
      }
    },
    
    

  },
});

export const { addToCart, removeFromCart , updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
