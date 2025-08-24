import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post, User } from '../views/posts-view/models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsPromiseService {
  private readonly baseUrl = 'https://jsonplaceholder.typicode.com';
  private _loading = false;
  private _error: string | null = null;

  get loading(): boolean {
    return this._loading;
  }

  get error(): string | null {
    return this._error;
  }

  constructor(private http: HttpClient) {}

  private async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getPosts(): Promise<Post[]> {
    try {
      this._loading = true;
      this._error = null;
      
      await this.delay(500); // Simulate network delay
      const posts = await this.http.get<Post[]>(`${this.baseUrl}/posts`).toPromise();
      
      this._loading = false;
      return posts || [];
    } catch (error) {
      this._loading = false;
      this._error = 'Failed to load posts';
      return [];
    }
  }

  async getPost(id: number): Promise<Post | null> {
    try {
      this._loading = true;
      this._error = null;
      
      await this.delay(300);
      const post = await this.http.get<Post>(`${this.baseUrl}/posts/${id}`).toPromise();
      
      this._loading = false;
      return post || null;
    } catch (error) {
      this._loading = false;
      this._error = 'Failed to load post';
      return null;
    }
  }

  async getUsers(): Promise<User[]> {
    try {
      this._loading = true;
      this._error = null;
      
      await this.delay(400);
      const users = await this.http.get<User[]>(`${this.baseUrl}/users`).toPromise();
      
      this._loading = false;
      return users || [];
    } catch (error) {
      this._loading = false;
      this._error = 'Failed to load users';
      return [];
    }
  }

  async createPost(post: Omit<Post, 'id'>): Promise<Post | null> {
    try {
      this._loading = true;
      this._error = null;
      
      await this.delay(600);
      const newPost = await this.http.post<Post>(`${this.baseUrl}/posts`, post).toPromise();
      
      this._loading = false;
      return newPost || null;
    } catch (error) {
      this._loading = false;
      this._error = 'Failed to create post';
      return null;
    }
  }

  async updatePost(post: Post): Promise<Post | null> {
    try {
      this._loading = true;
      this._error = null;
      
      await this.delay(500);
      const updatedPost = await this.http.put<Post>(`${this.baseUrl}/posts/${post.id}`, post).toPromise();
      
      this._loading = false;
      return updatedPost || null;
    } catch (error) {
      this._loading = false;
      this._error = 'Failed to update post';
      return null;
    }
  }

  async deletePost(id: number): Promise<boolean> {
    try {
      this._loading = true;
      this._error = null;
      
      await this.delay(400);
      await this.http.delete(`${this.baseUrl}/posts/${id}`).toPromise();
      
      this._loading = false;
      return true;
    } catch (error) {
      this._loading = false;
      this._error = 'Failed to delete post';
      return false;
    }
  }
}