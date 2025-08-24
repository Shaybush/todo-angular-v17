import { Component } from '@angular/core';
import { TodosHeaderComponent } from './components/todos-header/todos-header.component';
import { TodosInputComponent } from './components/todos-input/todos-input.component';
import { TodosListComponent } from './components/todos-list/todos-list.component';
import { TodosListStatisticsComponent } from './components/todos-list-statistics/todos-list-statistics.component';
import { TodosService } from '../../services/todos.service';

@Component({
  selector: 'app-todos-view',
  standalone: true,
  imports: [
    TodosHeaderComponent,
    TodosInputComponent,
    TodosListComponent,
    TodosListStatisticsComponent,
  ],
  templateUrl: './todos-view.component.html',
  styleUrl: './todos-view.component.scss'
})
export class TodosViewComponent {
  constructor(public todosService: TodosService) {}
}
