import { Injectable, signal, computed } from '@angular/core';
import { TodosModel } from '../views/todos-view/models/todos.model';


@Injectable({
  providedIn: 'root'
})
export class TodosService {
  private _tasks = signal<TodosModel[]>([
    {
      text: 'Buy Water',
      done: true,
      id: crypto.randomUUID()
    },
    {
      text: 'Go to the gym',
      done: false,
      id: crypto.randomUUID()
    },
    {
      text: 'Drink beer with friends',
      done: false,
      id: crypto.randomUUID()
    }
  ]);

  readonly tasks = this._tasks.asReadonly();

  readonly completedTasks = computed(() =>
    this._tasks().filter(task => task.done)
  );

  readonly pendingTasks = computed(() =>
    this._tasks().filter(task => !task.done)
  );

  readonly totalTasks = computed(() => this._tasks().length);

  addTask(task: TodosModel): void {
    this._tasks.update(tasks => [...tasks, task]);
  }

  updateTask(id: string): void {
    this._tasks.update(tasks =>
      tasks.map(task => {
        if (task.id === id) {
          return {
            ...task,
            done: !task.done
          };
        }
        return task;
      })
    );
  }

  removeTask(id: string): void {
    this._tasks.update(tasks => tasks.filter(task => task.id !== id));
  }

  clearCompleted(): void {
    this._tasks.update(tasks => tasks.filter(task => !task.done));
  }
}