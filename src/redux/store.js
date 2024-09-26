import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./slices/counterSlice";
import todoSlice from "./slices/todoSlice";
import productSlice from "./slices/productSlice";
export const store = configureStore({
  reducer: {
    counter: counterSlice,
    todo: todoSlice,
    productList: productSlice,
  },
});
