import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosHistoryViewComponent } from './todos-history-view.component';

describe('TodosHistoryViewComponent', () => {
  let component: TodosHistoryViewComponent;
  let fixture: ComponentFixture<TodosHistoryViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodosHistoryViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TodosHistoryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
