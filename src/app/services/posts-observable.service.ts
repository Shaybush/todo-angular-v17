import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, map, catchError, of, delay, tap } from 'rxjs';
import { Post, User } from '../views/posts-view/models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsObservableService {
  private http = inject(HttpClient)

  private readonly baseUrl = 'https://jsonplaceholder.typicode.com';
  private _loading = new BehaviorSubject<boolean>(false);
  private _error = new BehaviorSubject<string | null>(null);

  readonly loading$ = this._loading.asObservable();
  readonly error$ = this._error.asObservable();

  getPosts(): Observable<Post[]> {
    this._loading.next(true);
    this._error.next(null);


    // TODO: move to resovler to load before component init
    return this.http.get<Post[]>(`${this.baseUrl}/posts`).pipe(
      delay(500), // Simulate network delay
      map(posts => posts.map(post => ({
        ...post,
        message: post.body // Example of data transformation
      }))),
      tap(() => this._loading.next(false)),
      catchError(error => {
        this._loading.next(false);
        this._error.next('Failed to load posts');
        return of([]);
      })
    );
  }

  getPost(id: number): Observable<Post | null> {
    this._loading.next(true);
    this._error.next(null);

    // TODO: move to resovler to load before component init
    return this.http.get<Post>(`${this.baseUrl}/posts/${id}`).pipe(
      delay(300),
      tap(() => this._loading.next(false)),
      catchError(error => {
        this._loading.next(false);
        this._error.next('Failed to load post');
        return of(null);
      })
    );
  }

  getUsers(): Observable<User[]> {
    this._loading.next(true);
    this._error.next(null);

    return this.http.get<User[]>(`${this.baseUrl}/users`).pipe(
      delay(400),
      tap(() => this._loading.next(false)),
      catchError(error => {
        this._loading.next(false);
        this._error.next('Failed to load users');
        return of([]);
      })
    );
  }

  createPost(post: Omit<Post, 'id'>): Observable<Post | null> {
    this._loading.next(true);
    this._error.next(null);

    return this.http.post<Post>(`${this.baseUrl}/posts`, post).pipe(
      delay(600),
      tap(() => this._loading.next(false)),
      catchError(error => {
        this._loading.next(false);
        this._error.next('Failed to create post');
        return of(null);
      })
    );
  }

  updatePost(post: Post): Observable<Post | null> {
    this._loading.next(true);
    this._error.next(null);

    return this.http.put<Post>(`${this.baseUrl}/posts/${post.id}`, post).pipe(
      delay(500),
      tap(() => this._loading.next(false)),
      catchError(error => {
        this._loading.next(false);
        this._error.next('Failed to update post');
        return of(null);
      })
    );
  }

  deletePost(id: number): Observable<boolean> {
    this._loading.next(true);
    this._error.next(null);

    return this.http.delete(`${this.baseUrl}/posts/${id}`).pipe(
      delay(400),
      map(() => true),
      tap(() => this._loading.next(false)),
      catchError(error => {
        this._loading.next(false);
        this._error.next('Failed to delete post');
        return of(false);
      })
    );
  }
}