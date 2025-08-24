import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TodosViewComponent } from './views/todos-view/todos-view.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TodosViewComponent, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'angular-v17-todo-app';

  /** TODO:
   * 1. add resolvers to posts and users.
   * 2. add guard to todos route for example you can manually write token example in local storage.
   * 3. add 403 unpermission page and route.
   * 4. add 404 not found page and route.
   * 5. try to use switchMap, mergeMap, concatMap in observable service.
   * 6. use ngrx state management (bonus).
   *  */
}
