import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TodosModel } from '../../models/todos.model';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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
  @Output() addTodo: EventEmitter<TodosModel> = new EventEmitter<TodosModel>();

  // form
  todosForm: FormGroup<ITodosFormModel>;

  constructor(private fb: FormBuilder) {
  }

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
    this.addTodo.emit({text: this.todosForm.controls.text.value, done: false, id: crypto.randomUUID()});
    this.createTodoForm()
  }
}
