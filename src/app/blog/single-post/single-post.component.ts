import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from 'src/app/core/services/posts.service';
import { IPost } from 'src/app/common/interfaces/post';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent implements OnInit {

  public post: IPost;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly postsService: PostsService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.postsService.getSinglePost(params.id).subscribe(res => {
        console.log(res);
        this.post = res;
      });
    });
  }
}
