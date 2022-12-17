import "./assets/styles/index.css";
import { List } from "./components/List";
import { Item } from "./components/Item";
import { useRef, useState } from "react";
import { Button } from "./components/Button/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const inputValue = useRef();
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );
  const deleteTodoFunc = (todoId) => {
    console.log(todoId);
    const filteredTodo = todos.filter((item) => item.id !== todoId);
    setTodos([...filteredTodo]);
    toast.error("Item deleted");
  };

  const editTodoFunc = (todoId, todoText) => {
    const editPrompt = prompt("Edit your text", todoText);
    console.log(editPrompt);

    const findTodo = todos.find((item) => item.id === todoId);
    findTodo.name = editPrompt;
    setTodos([...todos]);
    toast.warning("Item edited");
  };

  const completeTodoFunc = (todoId) => {
    const findTodo = todos.find((item) => item.id === todoId);
    findTodo.isCompleted = !findTodo.isCompleted;
    setTodos([...todos]);
  };

  const handleInput = (evt) => {
    evt.preventDefault();
    const newObject = {
      id: todos.length ? todos.at(-1).id + 1 : 1,
      name: inputValue.current.value,
      isCompleted: false,
    };
    setTodos([...todos, newObject]);
    inputValue.current.value = "";
    toast.success("New item added");
  };

  window.localStorage.setItem("toods", JSON.stringify(todos));
  return (
    <div className="app pt-5">
      <h1 className="app_title text-center">Todo App</h1>
      <div className="container">
        <div className="row">
          <div className="todo_item col-6 offset-3 shadow p-2 p-md-5 bg-light">
            <form onSubmit={handleInput}>
              <div className="input-group todo_inputs">
                <input
                  ref={inputValue}
                  className="form-control"
                  type="text"
                  placeholder="Todos"
                />
                <Button className="btn btn-success">Add</Button>
              </div>
            </form>
            {todos.length ? (
              <List>
                {todos.map((item) => (
                  <Item
                    deleteTodoFunc={deleteTodoFunc}
                    editTodoFunc={editTodoFunc}
                    completeTodoFunc={completeTodoFunc}
                    key={item.id}
                    {...item}
                  />
                ))}
              </List>
            ) : (
              <h2 className="text-center mt-3">Create your todos</h2>
            )}
          </div>
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default App;
