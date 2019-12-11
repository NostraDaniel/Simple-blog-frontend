import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPost } from 'src/app/common/interfaces/post';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(
    private readonly http: HttpClient
  ) {}

  public getSinglePost(id: string): Observable<IPost> {
    return this.http.get<IPost>(`http://localhost:4202/posts/${id}`);
  }

  public getAllPosts(pageIndex = 1, pageSize = 12, filter = ''): Observable<{postsCount: number, posts: IPost[]}> {
    return this.http.get<{postsCount: number, posts: IPost[]}>(`http://localhost:4202/posts?page=${pageIndex}&posts_per_page=${pageSize}&filter=${filter}`);
  };

  public getFrontPagePosts(): Observable<IPost[]> {
    return this.http.get<IPost[]>('http://localhost:4202/posts/front-page');
  }

  public getNewestPosts(): Observable<IPost[]> {
    return this.http.get<IPost[]>('http://localhost:4202/posts/newest');
  }

  public delete(id: string): Observable<any> {
    return this.http.delete(`http://localhost:4202/api/posts/${id}`);
  }
}
