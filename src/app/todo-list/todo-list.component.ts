import { Todo } from './../todo';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
})
export class TodoListComponent implements OnInit {

  @Input() todos: Todo[];

  @Output() remove: EventEmitter<Todo> = new EventEmitter();

  @Output() toggleComplete: EventEmitter<Todo> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onToggleComplete(todo: Todo){
    this.toggleComplete.emit(todo);
  }

  onRemoveTodo(todo: Todo){
    this.remove.emit(todo);
  }

}
