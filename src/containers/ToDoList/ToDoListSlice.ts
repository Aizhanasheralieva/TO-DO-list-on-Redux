import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosApi from "../../axiosAPI.ts";

interface ToDoList {
  id?: string;
  title: string;
  status: boolean;
}

interface ToDoListState {
  toDoLists: ToDoList[];
  isLoading: boolean;
  error: false;
}

const initialState: ToDoListState = {
  toDoLists: [],
  isLoading: false,
  error: false,
};

// export const fetchToDoList = createAsyncThunk('toDoLists/fetchToDoList', async () => {
//     const {data: toDoLists} = await axiosApi<string | null>('toDoLists.json');
//
// });

export const addToDoList = createAsyncThunk(
  "toDoLists/addToDoList",
  async (title: string) => {
    const response = await axiosApi.post("/toDoLists.json", {
      title,
      status: false,
    });
    return { name: response.data.name };
  },
);

export const toDoListSlice = createSlice({
  name: "toDoLists",
  initialState,
  reducers: {
    writeNewTask: (state, action: PayloadAction<ToDoList>) => {
      state.toDoLists.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToDoList.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(addToDoList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.toDoLists = action.payload;
      })
      .addCase(addToDoList.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });
  },
});

export const toDoListReducer = toDoListSlice.reducer;
export const { writeNewTask } = toDoListSlice.actions;
