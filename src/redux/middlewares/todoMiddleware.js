import { createAsyncThunk } from "@reduxjs/toolkit";
import { setTodos, setError } from "../slices/todoSlice";

// const getTodos = () => {
//   return async (dispatch) => {
//     try {
//       const res = await fetch(`https://jsonplaceholder.typicode.com/todos`);

//       if (!res.ok) throw new Error(res.statusText);

//       const todos = await res.json();
//       dispatch(setTodos(todos));
//     } catch (error) {
//       dispatch(setError(error.message));
//     }
//   };
// };

// export default getTodos;
//Thunk Middleware

export const getTodos = createAsyncThunk("fetchTodos", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");

  const todos = await response.json();
  return todos;
});
