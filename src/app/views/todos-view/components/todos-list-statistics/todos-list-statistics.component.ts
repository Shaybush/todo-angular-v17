import { Component, computed, Signal } from '@angular/core';
import { TodosService } from '../../../../services/todos.service';

@Component({
  selector: 'app-todos-list-statistics',
  standalone: true,
  imports: [],
  templateUrl: './todos-list-statistics.component.html',
  styleUrl: './todos-list-statistics.component.scss'
})
export class TodosListStatisticsComponent {
  leftTasks: Signal<number> = computed(() => this.todosService.totalTasks() - this.todosService.completedTasks().length);

  constructor(public todosService: TodosService) {}
}
