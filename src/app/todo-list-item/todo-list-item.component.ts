import { Todo } from './../todo';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-todo-list-item',
  templateUrl: './todo-list-item.component.html',
})
export class TodoListItemComponent implements OnInit {

  @Input() todo: Todo;

  @Output() remove: EventEmitter<Todo> = new EventEmitter();

  @Output() toggleComplete: EventEmitter<Todo> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  removeTodo(todo: Todo){
    this.remove.emit(todo);
  }

  toggleTodoComplete(todo: Todo){
    this.toggleComplete.emit(todo);
  }

}
