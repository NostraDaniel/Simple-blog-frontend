import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from 'src/app/core/services/posts.service';
import { IPost } from 'src/app/common/interfaces/post';
import { Lightbox } from 'ngx-lightbox';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent implements OnInit {

  public post: IPost;
  private subscriptionNewestPosts: Subscription;
  public newestPosts: IPost[];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly postsService: PostsService,
    private readonly lightbox: Lightbox
  ) {}

  open(index: number): void {
    this.lightbox.open(this.post['__gallery__'], index);
  }

  close(): void {
    this.lightbox.close();
  }

  ngOnInit() {
    this.route.data.subscribe(
      data => {
         this.post = data.post
      }
    );

    this.subscriptionNewestPosts = this.postsService.newestPosts$.subscribe(
      posts => {
        this.newestPosts = posts;
      }
    )
  }
}
