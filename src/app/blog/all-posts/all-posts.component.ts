import { Component, OnInit, OnDestroy } from '@angular/core';
import { IPost } from 'src/app/common/interfaces/post';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { NotificatorService } from 'src/app/core/services/notificator.service';
import { AuthService } from 'src/app/core/services/auth.services';
import { Router, ActivatedRoute } from '@angular/router';
import { PostsService } from 'src/app/core/services/posts.service';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.scss']
})
export class AllPostsComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  private isLogged: boolean = false;

  public posts: IPost[] = [];
  public postsCount: number;
  public filter: string = '';
  public pageEvent: PageEvent;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly postsService: PostsService,
    private readonly notificator: NotificatorService,
    private readonly auth: AuthService
  ) { }

  ngOnInit() {
    this.getAllPosts();
    
    this.subscription = this.auth.user$.subscribe(
      username => {
        if (username === null) {
          this.isLogged = false;
          this.posts = this.posts.filter(post => post.isPublished);
        } else {
          this.isLogged = true;
        }
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  delete(id: string): void {
    this.postsService.delete(id).subscribe(
      (data) => {
        this.getAllPosts();
        this.notificator.success('Post was successfully deleted!');
      },
      (err) => {
        this.notificator.error('There was an error while deleting the post!');
      }
    );
  }

  private getAllPosts() {
    this.route.data.subscribe(
      (data) => {
        this.postsCount = data.posts.postsCount;
        this.posts = data.posts.posts
      }
    );
  }

  changePage(event) {
    const pageIndex = event.pageIndex + 1;
    const pageSize = event.pageSize;

    this.postsService.getAllPosts(pageIndex, pageSize, this.filter).subscribe(
      (posts) => {
        this.posts = posts.posts;
      },
      (error) => {
        this.notificator.error('There was an error while changing the pages!');
      }
    )
  }

  search(searchStr) {
    this.filter = searchStr;
    
    this.postsService.getAllPosts(1, 12, this.filter).subscribe(
      (posts) => {
        this.posts = posts.posts;
      },
      (error) => {
        this.notificator.error('There was an error while searching!');
      }
    )
  }
}
