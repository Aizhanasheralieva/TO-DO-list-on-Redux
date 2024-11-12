import {configureStore} from "@reduxjs/toolkit";
import {toDoListReducer} from "../containers/ToDoList/ToDoListSlice.ts";

export const store = configureStore({
    reducer: {
        toDoLists: toDoListReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;