import { Routes } from '@angular/router';
import { TodosViewComponent } from './views/todos-view/todos-view.component';

export const routes: Routes = [
    {
        path:'',
        component: TodosViewComponent,
    },
    {
        path: 'history',
        loadComponent: () => import('./views/todos-history-view/todos-history-view.component').then(c => c.TodosHistoryViewComponent),
    }
];
