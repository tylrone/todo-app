import { map } from 'rxjs/operators';
import { TodoDataService } from '../TodoData.service';
import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  providers: [TodoDataService],
})
export class TodosComponent implements OnInit {
  todos: Todo[] = [];

  constructor(
    private todoDataService: TodoDataService,
    private route: ActivatedRoute
  ) {}

  public ngOnInit() {
    this.route.data
      .pipe(map((data) => data['todos']))
      .subscribe((todos) => {
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
}
