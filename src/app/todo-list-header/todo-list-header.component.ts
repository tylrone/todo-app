import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Todo } from '../todo';

@Component({
  selector: 'app-todo-list-header',
  templateUrl: './todo-list-header.component.html',
})
export class TodoListHeaderComponent implements OnInit {
  newTodo: Todo = new Todo();

  @Output() add:EventEmitter<Todo> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  addTodo(){
    this.add.emit(this.newTodo);
    this.newTodo = new Todo();
  }

}
