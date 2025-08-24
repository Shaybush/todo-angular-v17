import { Routes } from '@angular/router';
import { TodosViewComponent } from './views/todos-view/todos-view.component';

export const routes: Routes = [
    {
        path: '',
        component: TodosViewComponent,
    },
    {
        path: 'history',
        loadComponent: () => import('./views/todos-history-view/todos-history-view.component').then(c => c.TodosHistoryViewComponent),
    },
    {
        path: 'posts',
        loadComponent: () => import('./views/posts-view/posts-view.component').then(c => c.PostsViewComponent),
    },
    {
        path: 'unpermission', // 403
        // loadComponent: () => import('./views/unpermission-view/unpermission-view.component').then(c
    }
];
