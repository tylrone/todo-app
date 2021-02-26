import { Title } from '@angular/platform-browser';
import { map } from 'rxjs/operators';
import { TodoDataService } from '../TodoData.service';
import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls:['./todos.component.css'],
  providers: [TodoDataService],
})
export class TodosComponent implements OnInit {
  todos: Todo[] = [];

  constructor(
    private todoDataService: TodoDataService,
    private route: ActivatedRoute,
    private auth: AuthService,
    private router: Router,
    private title: Title
  ) {}

  public ngOnInit() {
    this.title.setTitle('Todos list');
    this.route.data
      .pipe(map((data) => data['todos']))
      .subscribe((todos) => {
        this.todos = todos;
      });
  }

  onAddTodo(todo) {
    this.todoDataService.addTodo(todo).subscribe((newtodo) => {
      this.todos = this.todos.concat(newtodo);
    },(error:any) =>{console.log(error)}, () =>{console.log("done")});// observable.subscribe(next, error, complete)
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

  doSignOut(){
    this.auth.doSignOut();
    this.router.navigate(['/sign-in']);
  }
}
