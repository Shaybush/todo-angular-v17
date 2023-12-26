import { Component, Input, WritableSignal } from '@angular/core';
import { TodosModel } from '../../models/todos.model';

@Component({
  selector: 'app-todos-list',
  standalone: true,
  imports: [],
  templateUrl: './todos-list.component.html',
  styleUrl: './todos-list.component.scss'
})
export class TodosListComponent {
  @Input({required: true}) tasks!: WritableSignal<TodosModel[]>;

  updateTask(id: string): void {
    this.tasks.update(tasks => tasks.map(task => {
      if (task.id === id) {
        return {
          text: task.text,
          done: !task.done,
          id: task.id
        };
      }
      return task;
    }));
  }
}
