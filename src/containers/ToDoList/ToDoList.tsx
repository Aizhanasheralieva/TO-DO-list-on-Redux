import React, { useState } from "react";
import { addToDoList, writeNewTask } from "./ToDoListSlice.ts";
import { AppDispatch } from "../../app/store.ts";
import { useDispatch } from "react-redux";

const ToDoList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [newTask, setNewTask] = useState<{ title: string }>({ title: "" });

  const changeTask = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newTask.title.trim().length === 0) {
      alert("Заполните все поля!");
    }

    try {
      dispatch(writeNewTask({ id: "", title: newTask.title, status: false }));
      await dispatch(addToDoList(newTask.title));
    } catch (error) {
      console.error(error);
    }

    setNewTask({ title: "" });
  };

  return (
    <div className="container mt-5">
      <h1>To Do List</h1>
      <form className="row" onSubmit={onSubmit}>
        <div className="col-6">
          <label htmlFor="taskInput">To do list</label>
          <input
            className="form-control"
            id="taskInput"
            type="text"
            name="title"
            value={newTask.title}
            placeholder="Enter To Do List"
            onChange={changeTask}
          />
        </div>
        <div className="col-3 mt-4">
          <button className="btn btn-primary mb-3" type="submit">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default ToDoList;
