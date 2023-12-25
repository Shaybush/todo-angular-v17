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
  @Input({ required: true }) tasks!: WritableSignal<TodosModel[]>;
}
