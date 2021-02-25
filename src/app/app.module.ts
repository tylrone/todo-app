import { SessionService } from './session.service';
import { ApiService } from './Api.service';
import { TodoDataService } from './TodoData.service';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TodoListHeaderComponent } from './todo-list-header/todo-list-header.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoListItemComponent } from './todo-list-item/todo-list-item.component';
import { TodoListFooterComponent } from './todo-list-footer/todo-list-footer.component';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { TodosComponent } from './todos/todos.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthService } from './auth.service';
import { SignInComponent } from './sign-in/sign-in.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
      TodoListHeaderComponent,
      TodoListComponent,
      TodoListItemComponent,
      TodoListFooterComponent,
      TodosComponent,
      PageNotFoundComponent,
      SignInComponent
   ],
  imports: [
    BrowserModule,FormsModule,HttpClientModule, AppRoutingModule, ReactiveFormsModule
  ],
  providers: [TodoDataService, ApiService, SessionService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
