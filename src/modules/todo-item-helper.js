import { TodoItem } from "./todo-item";

function createNewTodo(title, dueDate, id, done) {
  let todo = new TodoItem(title, dueDate, id, done);
  return todo;
}

export { createNewTodo };
