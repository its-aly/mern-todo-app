import React, { useEffect, useState } from "react";
import axios from "axios";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [editId, setEditId] = useState(null); // To track which todo is being edited by id
  const [editText, setEditText] = useState(""); // To track new text for editing from the input
  // console.log(text);

  // GETTING ALL TODOS
  useEffect(() => {
    axios
      .get("http://localhost:5000/todos/")
      .then((response) => {
        setTodos(response.data);
        // console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  // ADDING TODOS(event handlers)
  const handleAddTodo = () => {
    const newTodo = { text };

    axios
      .post("http://localhost:5000/todos/add", newTodo)
      .then((res) => {
        setTodos([...todos, res.data]); //... spread operator is used to copy array or object and then add some new data
        setText("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // DELETE TODO FROM TODOS(event handler)
  const handleDeleteTodo = (id) => {
    axios
      .delete(`http://localhost:5000/todos/${id}`)
      .then((res) => {
        setTodos(todos.filter((todo) => todo._id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEditTodo = (id, text) => {
    setEditId(id); //set the todo being edited by id
    setEditText(text); // this code is used so that when an edit mode opens it will pre-fill thr form with the current value it has
  };

  const handleUpdateTodo = (id) => {
    console.log("update triggered");
    console.log(editText);

    const updatedTodo = { text: editText };

    axios
      .put(`http://localhost:5000/todos/update/${id}`, updatedTodo)
      .then((res) => {
        setTodos(
          todos.map((todo) =>
            todo._id === id ? { ...todo, text: editText } : todo
          )
        );
        setEditId(null);
        setEditText("");
      });
  };
  // ===================================
  //  CODE FOR MARK COMPLETE AND UNMARK

  const handleToggleComplete = (id, completed) => {
    const updateToggleComplete = { completed: !completed };
    axios
      .put(`http://localhost:5000/todos/update/${id}`, updateToggleComplete)
      .then((response) => {
        setTodos(
          todos.map((todo) =>
            todo._id === id
              ? { ...todo, completed: response.data.completed }
              : todo
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // ////////////////////////////////////////////////
  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center justify-center py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h1 className="text-center text-3xl font-extrabold text-gray-900">
          Todo List
        </h1>
        <div className="space-y-6">
          <input
            className="w-full px-4 py-2 border border-gray-300 shadow-md rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm "
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="add a new task..."
          />
          <button
            onClick={handleAddTodo}
            className="w-full flex justify-center py-2 px-4 border border-transparent bg-indigo-600 rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-offset-2 focus:ring-red-500 "
          >
            Add Task
          </button>
          {/* LIST */}
          <ul className="divide-y divide-gray-300 mt-8">
            {/* CODE IF A USER CLICKED ON EDIT THIS WILL EXECUTE */}
            {todos.map((todo) => (
              <li key={todo._id} className="py-4 flex flex-col">
                {editId === todo._id ? (
                  //Edit Mode: Show input and save/cancel buttons
                  <div className="flex space-x-4">
                    <input
                      className=" flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                    ></input>
                    <button
                      onClick={() => handleUpdateTodo(todo._id)}
                      className="px-4 py-2 border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditId(null)}
                      className="px-4 py-2 border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  //View Mode: Show todo text and edit/delete/completed buttons
                  <div className="flex justify-between items-center">
                    <span
                      className={`flex-1 ${
                        todo.completed ? "line-through text-gray-500" : ""
                      }`}
                    >
                      {todo.text}
                    </span>
                    <div className="flex space-x-2">
                      <button
                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400"
                        onClick={() => handleEditTodo(todo._id, todo.text)}
                      >
                        {" "}
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteTodo(todo._id)}
                        className="ml-4 bg-red-500 px-2 py-1 border border-transparent rounded-md  shadow-sm text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 "
                      >
                        Delete
                      </button>
                      <button
                        onClick={() =>
                          handleToggleComplete(todo._id, todo.completed)
                        }
                        className={`ml-4  ${
                          todo.completed ? "bg-blue-400" : "bg-green-600"
                        } px-2 py-1 border border-transparent rounded-md  shadow-sm text-sm font-medium text-white hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500`}
                      >
                        {todo.completed
                          ? "Mark As Incomplete"
                          : "Mark As completed"}
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default TodoList;

//
{
  /* <li
                key={todo._id}
                className="py-2 flex justify-between items-center"
              >
                <span className="text-gray-500">{todo.text}</span>
                <button
                  onClick={() => handleDeleteTodo(todo._id)}
                  className="ml-4 bg-red-500 px-2 py-1 border border-transparent rounded-md  shadow-sm text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 "
                >
                  Delete
                </button>
              </li> */
}
