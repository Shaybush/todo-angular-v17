import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-todos-header',
  standalone: true,
  imports: [
    DatePipe
  ],
  templateUrl: './todos-header.component.html',
  styleUrl: './todos-header.component.scss'
})
export class TodosHeaderComponent {
  date_now = new Date();
}
