import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { IPost } from 'src/app/common/interfaces/post';
import { PostsService } from 'src/app/core/services/posts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newest-posts',
  templateUrl: './newest-posts.component.html',
  styleUrls: ['./newest-posts.component.scss']
})
export class NewestPostsComponent implements OnInit, OnDestroy {

  private subscriptionPosts: Subscription;
  public newestPosts: IPost[];
  
  constructor(
    private readonly postsService: PostsService,
    private readonly router: Router
  ) { }

  ngOnInit() {
    this.subscriptionPosts = this.postsService.newestPosts$.subscribe(
      posts => {
        this.newestPosts = posts;
      }
    )
  }


  showPost(id: string): void {
    this.router.navigate([`/blog/post/${id}`]);
  }

  ngOnDestroy() {
    this.subscriptionPosts.unsubscribe();
  }
}
