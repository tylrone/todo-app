import { HttpClient } from '@angular/common/http';
//import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Todo } from './todo';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
//import { Observable } from 'rxjs/Observable';
//import 'rxjs/add/operator/map';
//import { map } from 'rxjs';
import 'rxjs/add/operator/catch';
//import 'rxjs/Rx';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  private handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return error;
  }
  // API GET /todos
  public getAllTodos(): Observable<Todo[]> {
    return this.http
      .get(API_URL + '/todos')
      .pipe(
        map((response: any) => {
          const todos = response;
          return todos.map((todo) => new Todo(todo));
        })
      )
      .catch(this.handleError);
  }

  // API POST /todos
  public createTodo(todo: Todo): Observable<Todo> {
    return this.http
      .post(API_URL + '/todos/', todo)
      .pipe(
        map((response: any) => {
          return new Todo(response);
        })
      )
      .catch(this.handleError);
  }

  // API GET /todos/:id
  public getTodoById(todoId: number): Observable<Todo> {
    return this.http
      .get(API_URL + '/todos/' + todoId)
      .pipe(
        map((response: any) => {
          return new Todo(response);
        })
      )
      .catch(this.handleError);
  }

  // API PUT /todos/:id
  public updateTodo(todo: Todo): Observable<Todo> {
    return this.http
      .put(API_URL + '/todos/' + todo.id, todo)
      .pipe(
        map((response: any) => {
          return new Todo(response);
        })
      )
      .catch(this.handleError);
  }

  // API DELETE /todos/:id
  public deleteTodoById(todoId: number): Observable<null> {
    return this.http
      .delete(API_URL + '/todos/' + todoId)
      .pipe(map(response => null))
      .catch(this.handleError);
  }
}
