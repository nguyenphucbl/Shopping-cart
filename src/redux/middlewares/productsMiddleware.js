import { createAsyncThunk } from "@reduxjs/toolkit";
const API = import.meta.env.VITE_API_SHOP;
export const getProducts = createAsyncThunk("getProducts", async () => {
  const res = await fetch(`${API}/products`);
  if (!res.ok) throw new Error(res.statusText);
  const products = await res.json();
  return products;
});
