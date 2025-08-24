import { Component, OnInit, OnDestroy, signal, computed, AfterViewInit, inject, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PostsObservableService } from '../../services/posts-observable.service';
import { PostsPromiseService } from '../../services/posts-promise.service';
import { Post, User } from './models/post.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-posts-view',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './posts-view.component.html',
  styleUrls: ['./posts-view.component.scss']
})
export class PostsViewComponent implements OnInit {
  private postsObservableService = inject(PostsObservableService);
  private postsPromiseService = inject(PostsPromiseService);
  private destroyRef = inject(DestroyRef);

  // Observable approach signals
  observablePosts = signal<Post[]>([]);
  observableUsers = signal<User[]>([]);
  observableLoading = signal(false);
  observableError = signal<string | null>(null);

  // Promise approach state
  promisePosts = signal<Post[]>([]);
  promiseUsers = signal<User[]>([]);
  promiseLoading = signal(false);
  promiseError = signal<string | null>(null);

  // UI state
  activeTab = signal<'observable' | 'promise'>('observable');
  newPostTitle = signal('');
  newPostBody = signal('');
  selectedUserId = signal(1);

  // Computed values
  postsCount = computed(() =>
    this.activeTab() === 'observable'
      ? this.observablePosts().length
      : this.promisePosts().length
  );

  ngOnInit(): void {
    this.loadDataWithObservables();
    this.loadDataWithPromises();
  }

  // Observable Pattern Methods
  loadDataWithObservables() {
    this.postsObservableService.loading$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(
      loading => this.observableLoading.set(loading)
    );

    this.postsObservableService.error$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(
      error => this.observableError.set(error)
    );

    this.postsObservableService.getPosts().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(
      posts => {
        console.log(posts);
        this.observablePosts.set(posts)
      }
    );

    this.postsObservableService.getUsers().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(
      users => this.observableUsers.set(users)
    );
  }

  refreshObservableData() {
    this.loadDataWithObservables();
  }

  createPostWithObservable() {
    if (!this.newPostTitle() || !this.newPostBody()) return;

    const newPost: Omit<Post, 'id'> = {
      title: this.newPostTitle(),
      body: this.newPostBody(),
      userId: this.selectedUserId()
    };

    const createSub = this.postsObservableService.createPost(newPost).subscribe(
      post => {
        if (post) {
          this.observablePosts.update(posts => [post, ...posts]);
          this.clearForm();
        }
      }
    );
  }

  deletePostWithObservable(id: number) {
    const deleteSub = this.postsObservableService.deletePost(id).subscribe(
      success => {
        if (success) {
          this.observablePosts.update(posts => posts.filter(p => p.id !== id));
        }
      }
    );

  }

  // Promise Pattern Methods
  async loadDataWithPromises() {
    try {
      this.promiseLoading.set(this.postsPromiseService.loading);
      this.promiseError.set(this.postsPromiseService.error);

      const [posts, users] = await Promise.all([
        this.postsPromiseService.getPosts(),
        this.postsPromiseService.getUsers()
      ]);

      this.promisePosts.set(posts);
      this.promiseUsers.set(users);
      this.promiseLoading.set(this.postsPromiseService.loading);
      this.promiseError.set(this.postsPromiseService.error);
    } catch (error) {
      this.promiseError.set('Failed to load data');
      this.promiseLoading.set(false);
    }
  }

  async refreshPromiseData() {
    await this.loadDataWithPromises();
  }

  async createPostWithPromise() {
    if (!this.newPostTitle() || !this.newPostBody()) return;

    const newPost: Omit<Post, 'id'> = {
      title: this.newPostTitle(),
      body: this.newPostBody(),
      userId: this.selectedUserId()
    };

    const post = await this.postsPromiseService.createPost(newPost);
    this.promiseLoading.set(this.postsPromiseService.loading);
    this.promiseError.set(this.postsPromiseService.error);

    if (post) {
      this.promisePosts.update(posts => [post, ...posts]);
      this.clearForm();
    }
  }

  async deletePostWithPromise(id: number) {
    const success = await this.postsPromiseService.deletePost(id);
    this.promiseLoading.set(this.postsPromiseService.loading);
    this.promiseError.set(this.postsPromiseService.error);

    if (success) {
      this.promisePosts.update(posts => posts.filter(p => p.id !== id));
    }
  }

  // Utility methods
  switchTab(tab: 'observable' | 'promise') {
    this.activeTab.set(tab);
  }

  clearForm() {
    this.newPostTitle.set('');
    this.newPostBody.set('');
    this.selectedUserId.set(1);
  }

  getUserName(userId: number): string {
    const users = this.activeTab() === 'observable'
      ? this.observableUsers()
      : this.promiseUsers();

    const user = users.find(u => u.id === userId);
    return user ? user.name : 'Unknown User';
  }
}