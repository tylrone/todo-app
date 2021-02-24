import { TodoDataService } from './TodoData.service';
import { Component } from '@angular/core';
import { Todo } from './todo';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [],
})
export class AppComponent {
  //newTodo: Todo = new Todo();

  constructor(private todoDataService: TodoDataService){}

  // addTodo(){
  //   this.todoDataService.addTodo(this.newTodo);
  //   this.newTodo = new Todo();
  // }
  onAddTodo(todo: Todo){
    this.todoDataService.addTodo(todo);
  }

  onToggleTodoComplete(todo){
    this.todoDataService.toggleTodoComlete(todo);
  }
  onRemoveTodo(todo){
    this.todoDataService.deleteTodoById(todo.id);
  }
  get todos(){
    return this.todoDataService.getAllTodos();
  }
}
