import { TodoDataService } from './TodoData.service';
import { Component, OnInit } from '@angular/core';
import { Todo } from './todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TodoDataService],
})
export class AppComponent implements OnInit {
  //newTodo: Todo = new Todo();
  todos: Todo[] = [];
  constructor(private todoDataService: TodoDataService) {}

  ngOnInit() {
    this.todoDataService.getAllTodos().subscribe((todos) => {
      this.todos = todos;
    });
  }

  onAddTodo(todo) {
    this.todoDataService.addTodo(todo).subscribe((newtodo) => {
      this.todos = this.todos.concat(newtodo);
    });
  }

  onToggleTodoComplete(todo) {
    this.todoDataService.toggleTodoComlete(todo).subscribe((updateTodo) => {
      todo = updateTodo;
    });
  }
  onRemoveTodo(todo) {
    this.todoDataService.deleteTodoById(todo.id).subscribe((_) => {
      this.todos = this.todos.filter((t) => t.id !== todo.id);
    });
  }
  // get todos() {
  //   return this.todoDataService.getAllTodos();
  // }
}
