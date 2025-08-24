import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TodosService } from '../../../../services/todos.service';

interface ITodosFormModel {
  text: FormControl<string>;
}

@Component({
  selector: 'app-todos-input',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './todos-input.component.html',
  styleUrl: './todos-input.component.scss'
})

export class TodosInputComponent implements OnInit {
  todosForm: FormGroup<ITodosFormModel>;

  constructor(
    private fb: FormBuilder,
    private todosService: TodosService
  ) { }

  ngOnInit(): void {
    this.createTodoForm();
  }

  createTodoForm(): void {
    this.todosForm = this.fb.group({
      text: ['',
        [Validators.required, Validators.minLength(2)]]
    });
  }

  onSubmit(): void {
    if (this.todosForm.valid) {
      this.todosService.addTask({
        text: this.todosForm.controls.text.value,
        done: false,
        id: crypto.randomUUID()
      });
      this.createTodoForm();
    }
  }
}
