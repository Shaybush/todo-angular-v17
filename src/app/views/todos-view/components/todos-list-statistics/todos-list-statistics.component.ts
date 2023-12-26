import { Component, computed, Input, OnInit, Signal, WritableSignal } from '@angular/core';
import { TodosModel } from '../../models/todos.model';

@Component({
  selector: 'app-todos-list-statistics',
  standalone: true,
  imports: [],
  templateUrl: './todos-list-statistics.component.html',
  styleUrl: './todos-list-statistics.component.scss'
})
export class TodosListStatisticsComponent{
  @Input({ required: true }) tasks!: WritableSignal<TodosModel[]>;
  totalTasks: Signal<number> = computed(() => this.tasks().length);
  completedTasks: Signal<number> = computed(() => this.tasks().filter(task => task.done === true).length);
  leftTasks: Signal<number> = computed(() => this.totalTasks() - this.completedTasks());
}
