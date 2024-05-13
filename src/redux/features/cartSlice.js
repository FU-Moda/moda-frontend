import { createSlice } from "@reduxjs/toolkit";

const storedCartList =
  localStorage.getItem("cartList") !== null
    ? JSON.parse(localStorage.getItem("cartList"))
    : [];

const initialState = {
  cartList: storedCartList,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const productToAdd = action.payload.product;
      const quantity = action.payload.num;
    
      const productExit = state.cartList.find(
        (item) => item.product?.id === productToAdd?.product?.id
      );
      console.log(productExit)
      if (productExit) {
        state.cartList = state.cartList.map((item) =>
          item.product?.id === productExit.product?.id
            ? { ...productExit, qty: productExit.qty + action.payload.num }
            : item
        );
      } else {
        state.cartList.push({ ...productToAdd, qty: quantity });
      }
    },
    decreaseQty: (state, action) => {
      const productTodecreaseQnty = action.payload;
      const productExit = state.cartList.find(
        (item) => item.product?.id === productTodecreaseQnty?.product?.id
      );
      console.log(productExit)
      if (productExit.qty === 1) {
        state.cartList = state.cartList.filter(
          (item) => item.product?.id !== productExit?.product?.id
        );
      } else {
        state.cartList = state.cartList.map((item) =>
          item.product?.id === productExit?.product?.id
            ? { ...productExit, qty: productExit.qty - 1 }
            : item
        );
      }
    },
    deleteProduct: (state, action) => {
      const productToDelete = action.payload;
      state.cartList = state.cartList.filter(
        (item) => item.product?.id !== productToDelete.product?.id
      );
    },
  },
});

export const cartMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  if (action.type?.startsWith("cart/")) {
    const cartList = store.getState().cart.cartList;
    localStorage.setItem("cartList", JSON.stringify(cartList));
  }
  return result;
};

export const { addToCart, decreaseQty, deleteProduct } = cartSlice.actions;

export default cartSlice.reducer;
