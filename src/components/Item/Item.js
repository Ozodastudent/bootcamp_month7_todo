import { Button } from "../Button/Button";

export const Item = ({
  id,
  name,
  isCompleted,
  completeTodoFunc,
  editTodoFunc,
  deleteTodoFunc,
}) => {
  return (
    <li className="d-flex align-items-center justify-content-between">
      <div className="d-flex align-items-center justify-content-between">
        <strong className="me-2">ID: {id}</strong>
        <input
          onChange={() => completeTodoFunc(id)}
          defaultChecked={isCompleted}
          className="form-check"
          type="checkbox"
        />
        <p className="mt-2 ms-3">{name}</p>
      </div>
      <div>
        <Button
          onClick={() => editTodoFunc(id, name)}
          className="btn btn-warning me-3"
        >
          Edit
        </Button>
        <Button onClick={() => deleteTodoFunc(id)} className="btn btn-danger">
          Delete
        </Button>
      </div>
    </li>
  );
};
