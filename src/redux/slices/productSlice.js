import { createSlice } from "@reduxjs/toolkit";
import { getProducts } from "../middlewares/productsMiddleware";

const initialState = {
  products: [],
  status: "idle",
  error: null,
  quantityTotal: 0,
  buyProducts: [],
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    incrementProduct: (state, action) => {
      const prod = action.payload;
      const productExist = state.buyProducts.find(
        (product) => product._id === prod._id
      );
      if (productExist) {
        productExist.quantityBuy += 1;
      } else {
        state.buyProducts.push({ ...prod, quantityBuy: 1 });
      }
      state.quantityTotal += 1;
    },
    incrementProductQuantity: (state, action) => {
      state.quantityTotal += 1;
      const productId = action.payload;
      const productExist = state.buyProducts.find(
        (product) => product._id === productId
      );
      if (productExist) {
        productExist.quantityBuy += 1;
      }
    },
    decrementProductQuantity: (state, action) => {
      const productId = action.payload;
      const product = state.buyProducts.find(
        (product) => product._id === productId
      );
      if (product && product.quantityBuy > 1) {
        state.quantityTotal -= 1;
        product.quantityBuy -= 1;
      }
    },
    removeProductQuantity: (state, action) => {
      const productId = action.payload;
      const product = state.buyProducts.find(
        (product) => product._id === productId
      );
      if (product) {
        state.quantityTotal -= product.quantityBuy;
        state.buyProducts = state.buyProducts.filter(
          (product) => product._id !== productId
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.products = action.payload;
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const {
  incrementProduct,
  incrementProductQuantity,
  decrementProductQuantity,
  removeProductQuantity,
} = productsSlice.actions;
export default productsSlice.reducer;
