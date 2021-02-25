import { SignInComponent } from './sign-in/sign-in.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TodosResolver } from 'src/todos.resolver';
import { TodosComponent } from './todos/todos.component';
import { CanActivateTodosGuard } from './can-activate-todos.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'sign-in',
    pathMatch: 'full'
  },
  {
    path: 'sign-in',
    component: SignInComponent
  },
  {
    path: 'todos',
    component: TodosComponent,
    canActivate:[CanActivateTodosGuard],
    resolve: {
      todos: TodosResolver
    }
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [TodosResolver, CanActivateTodosGuard]
})
export class AppRoutingModule {
}
