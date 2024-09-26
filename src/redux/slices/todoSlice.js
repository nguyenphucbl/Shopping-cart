import { createSlice } from "@reduxjs/toolkit";
import { getTodos } from "../middlewares/todoMiddleware";

export const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todoList: [],
    status: "idle",
    error: null,
  },
  reducers: {
    // setTodos: (state, action) => {
    //   state.todoList = action.payload;
    // },
    // setError: (state, action) => {
    //   state.error = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(getTodos.pending, (state) => {
      state.status = "pending";
    });

    builder.addCase(getTodos.fulfilled, (state, action) => {
      state.todoList = action.payload;
      state.status = "idle";
    });

    builder.addCase(getTodos.rejected, (state, action) => {
      state.error = action.payload;
      state.status = "failed";
    });
  },
});

export const { setTodos, setError } = todoSlice.actions;

export default todoSlice.reducer;
