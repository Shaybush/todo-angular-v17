import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IsDoneDirective } from '../../directives/is-done.directive';
import { TodosService } from '../../../../services/todos.service';

@Component({
  selector: 'app-todos-list',
  standalone: true,
  imports: [
    IsDoneDirective
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './todos-list.component.html',
  styleUrl: './todos-list.component.scss'
})
export class TodosListComponent {
  constructor(public todosService: TodosService) {}

  updateTask(id: string): void {
    this.todosService.updateTask(id);
  }
}
