import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axiosApi from "../../axiosAPI.ts";

interface ToDoList {
  id: string;
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

export const addToDoList = createAsyncThunk(
  "toDoLists/addToDoList",
  async (title: string) => {
    const response = await axiosApi.post("/toDoLists.json", {
      title,
      status: false,
    });
    const newTask: ToDoList = {
      id: response.data.name,
      title,
      status: false,
    };

    return newTask;
  },
);

export const fetchToDoLists = createAsyncThunk(
  "toDoLists/fetchToDoList",
  async () => {
    const response: { data: { [key: string]: ToDoList } } =
      await axiosApi("toDoLists.json");

    if (response.data) {
      const toDoListsFromAPI: ToDoList[] = Object.keys(response.data).map(
        (toDoListKey)  => {
          return {
            ...response.data[toDoListKey],
            id: toDoListKey,
          };
        },
      );

      return toDoListsFromAPI;
    } else {
      return [];
    }
  },
);

export const changeToDoList = createAsyncThunk(
  "toDoLists/changeToDoList",
  async (id: string) => {
    const response = await axiosApi(`/toDoLists/${id}.json`);
    const currentStatus = response.data.status;

    const updatedStatus = !currentStatus;
    await axiosApi.put(`/toDoLists/${id}.json`, { status: updatedStatus });
    return { id, status: updatedStatus };
  },
);

export const deleteToDoList = createAsyncThunk(
  "toDoLists/deleteToDoList",
  async (id: string) => {
    await axiosApi.delete(`/toDoLists/${id}.json`);
    return id;
  },
);

export const toDoListSlice = createSlice({
  name: "toDoLists",
  initialState,
  reducers: {
    writeNewTask: (state, action: PayloadAction<ToDoList>) => {
      state.toDoLists.push({
         ...action.payload,
        title: action.payload.title,
        status: false,
      });
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
        state.toDoLists.push(action.payload);
      })
      .addCase(addToDoList.rejected, (state) => {
        state.isLoading = false;
        state.error = false;
      })
      .addCase(fetchToDoLists.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(
        fetchToDoLists.fulfilled,
        (state, action: PayloadAction<ToDoList[]>) => {
          state.isLoading = false;
          state.toDoLists = action.payload;
        },
      )
      .addCase(fetchToDoLists.rejected, (state) => {
        state.isLoading = false;
        state.error = false;
      })
      .addCase(
        changeToDoList.fulfilled,
        (state, action: PayloadAction<{ id: string; status: boolean }>) => {
          const { id, status } = action.payload;
          const index = state.toDoLists.findIndex(
            (toDoList) => toDoList.id === id,
          );
          if (index !== -1) {
            state.toDoLists[index].status = status;
          }
        },
      )
      .addCase(
        deleteToDoList.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.toDoLists = state.toDoLists.filter(
            (toDoList) => toDoList.id !== action.payload,
          );
        },
      );
  },
});

export const toDoListReducer = toDoListSlice.reducer;
export const { writeNewTask } = toDoListSlice.actions;
