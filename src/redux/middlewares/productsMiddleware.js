import { createAsyncThunk } from "@reduxjs/toolkit";

export const getProducts = createAsyncThunk("getProducts", async () => {
  const res = await fetch(
    `https://api-exercise-sopi.vercel.app/api/v1/products`
  );
  if (!res.ok) throw new Error(res.statusText);
  const products = await res.json();
  return products;
});
