import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PostsViewComponent } from './posts-view.component';

describe('PostsViewComponent', () => {
  let component: PostsViewComponent;
  let fixture: ComponentFixture<PostsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostsViewComponent, HttpClientTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with observable tab active', () => {
    expect(component.activeTab()).toBe('observable');
  });

  it('should switch tabs correctly', () => {
    component.switchTab('promise');
    expect(component.activeTab()).toBe('promise');
    
    component.switchTab('observable');
    expect(component.activeTab()).toBe('observable');
  });

  it('should clear form data', () => {
    component.newPostTitle.set('Test Title');
    component.newPostBody.set('Test Body');
    component.selectedUserId.set(5);
    
    component.clearForm();
    
    expect(component.newPostTitle()).toBe('');
    expect(component.newPostBody()).toBe('');
    expect(component.selectedUserId()).toBe(1);
  });
});