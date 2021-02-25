import { SessionService } from './session.service';
import { HttpClient,  HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Todo } from './todo';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/catch';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private http: HttpClient,
    private session: SessionService
  ) {}

  private handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return error;
  }
  // API GET /todos
  public getAllTodos(): Observable<Todo[]> {
    return this.http
      .get(API_URL + '/todos', {headers: this.getRequestOptions()})
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
      .post(API_URL + '/todos/',todo, {headers: this.getRequestOptions()})
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
      .get(API_URL + '/todos/' + todoId, {headers: this.getRequestOptions()})
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
      .put(API_URL + '/todos/' + todo.id, todo, {headers: this.getRequestOptions()})
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
      .delete(API_URL + '/todos/' + todoId, {headers: this.getRequestOptions()})
      .pipe(map((response) => null))
      .catch(this.handleError);
  }

  public SignIn(username: string, password: string) {
    return this.http
      .post(API_URL + '/sign-in', { username, password })
      .pipe(map((response: any) => response))
      .catch(this.handleError);
  }

  private getRequestOptions(){
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.session.accessToken);
    return headers;
  }
}
