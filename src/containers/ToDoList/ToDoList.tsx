import React, {useEffect, useState} from "react";
import {addToDoList, fetchToDoLists, changeToDoList, deleteToDoList} from "./ToDoListSlice.ts";
import {AppDispatch, RootState} from "../../app/store.ts";
import {useDispatch, useSelector} from "react-redux";

const ToDoList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [newTask, setNewTask] = useState<{ title: string }>({ title: "" });
  const {toDoLists} = useSelector((state: RootState) => state.toDoLists);

  useEffect(() => {
    dispatch(fetchToDoLists());
  }, [dispatch]);

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


      // await dispatch(writeNewTask({ id: "", title: newTask.title, status: false }));
      await dispatch(addToDoList(newTask.title));
    setNewTask({ title: "" });
  };

  const controlChangeOfToDoList = (id: string) => {
    dispatch(changeToDoList(id));
  };

  const controlDeleteToDoList = (id: string) => {
    dispatch(deleteToDoList(id));
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
        <ul>
          {toDoLists.map((toDoList) => (
              <li className="list-unstyled mb-2" key={toDoList.id}>
                <input
                    className="me-2"
                    type="checkbox"
                    checked={toDoList.status}
                    onChange={() => controlChangeOfToDoList(toDoList.id)}
                />
                {toDoList.title}
                <button onClick={() => controlDeleteToDoList(toDoList.id)} className="btn btn-danger btn-sm ms-2">Delete</button>

              </li>
          ))}
        </ul>
    </div>
  );
};

export default ToDoList;
