import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { IPost } from 'src/app/common/interfaces/post';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private readonly newestPostsSubject$ = new BehaviorSubject<IPost[] | null>([])
  private readonly defautlImageUrl: string = '../../../assets/images/branding-small.png';

  constructor(
    private readonly http: HttpClient
  ) {
    this.refreshNewestPosts();
  }

  public get newestPosts$(): Observable<IPost[] | null> {
    return this.newestPostsSubject$.asObservable();
  }

  public refreshNewestPosts():void {
    this.http.get<IPost[]>('http://localhost:4202/posts/newest').subscribe(posts =>  {

      this.newestPostsSubject$.next(posts.map(post => {
        if(!post['__frontImage__']) {
          post['__frontImage__'] = {};
          post['__frontImage__']['src'] = this.defautlImageUrl;
        }

        return post;
      }));
    });
  }

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

  public createPost(postData) {
    return this.http.post('http://localhost:4202/posts', postData);
  }

  public updatePost(updatedData) {
    return this.http.put('http://localhost:4202/posts', updatedData);
  }

  public async uploadImage(image) {
    return this.http.post('http://localhost:4202/posts/image', image).toPromise();
  }

  public async uploadGalleryImages(images) {
    return this.http.post('http://localhost:4202/posts/images', images).toPromise();
  }

  public delete(id: string): Observable<any> {
    console.log(id);
    return this.http.delete(`http://localhost:4202/posts/${id}`);
  }
}
