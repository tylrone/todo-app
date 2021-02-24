import { Todo } from './../todo';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo-list-footer',
  templateUrl: './todo-list-footer.component.html',
})
export class TodoListFooterComponent implements OnInit {

  @Input() todos: Todo[];

  constructor() { }

  ngOnInit() {
  }

}
