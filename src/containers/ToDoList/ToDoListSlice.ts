import {createSlice} from "@reduxjs/toolkit";

type ToDoList = {
    id: number;
    title: string;
    status: boolean;
}

interface ToDoListState {
    toDoLists: ToDoList[],
    isLoading: boolean,
    error: false,
}

const initialState: ToDoListState = {
  toDoLists: [],
  isLoading: false,
  error: false,
};

export const toDoListSlice = createSlice({
  name: 'toDoLists',
  initialState,
  reducers: {},
    extraReducers: (builder) => {
      builder
          .addCase()
    }
});

export const toDoListReducer = toDoListSlice.reducer;
// export {} = toDoListSlice.actions;
