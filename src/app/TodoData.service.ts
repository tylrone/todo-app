import { Todo } from './todo';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TodoDataService {
  lastId: number = 0;

  todos: Todo[] = [];

  constructor() {}

  // add new todo,  POST /todos
  addTodo(todo: Todo): TodoDataService {
    if (!todo.id) {
      todo.id = ++this.lastId;
    }
    this.todos.push(todo);
    return this;
  }

  // xoa mot item todo   DELETE /todos/:id
  deleteTodoById(id: number): TodoDataService {
    this.todos = this.todos.filter((todo) => todo.id !== id);
    return this;
  }
  // cap nhat mot item , PUT /todos/:id
  updateTodoById(id: number, values: Object = {}): Todo {
    let todo = this.getTodoById(id);
    if (!todo) {
      return null;
    }
    Object.assign(todo, values);
    return todo;
  }

  // Get all todo, GET /todos
  getAllTodos(): Todo[] {
    return this.todos;
  }

  // Get todo by id, GET /todos/:id
  getTodoById(id: number): Todo {
    return this.todos.filter((todo) => todo.id === id).pop();
  }

  // Toggle todo complete
  toggleTodoComlete(todo: Todo) {
    let updateTodo = this.updateTodoById(todo.id, { complete: !todo.complete });
    return updateTodo;
  }
}
