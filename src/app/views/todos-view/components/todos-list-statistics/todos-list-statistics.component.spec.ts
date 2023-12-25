import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosListStatisticsComponent } from './todos-list-statistics.component';

describe('TodosListStatisticsComponent', () => {
  let component: TodosListStatisticsComponent;
  let fixture: ComponentFixture<TodosListStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodosListStatisticsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TodosListStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
