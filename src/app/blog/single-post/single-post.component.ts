import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from 'src/app/core/services/posts.service';
import { IPost } from 'src/app/common/interfaces/post';
import { Lightbox } from 'ngx-lightbox';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent implements OnInit {

  public post: IPost | Object = {};
  
  constructor(
    private readonly route: ActivatedRoute,
    private readonly postsService: PostsService,
    private readonly lightbox: Lightbox
  ) { 

   
  }

  open(index: number): void {
    this.lightbox.open(this.post['__gallery__'], index);
  }

  close(): void {
    this.lightbox.close();
  }

  ngOnInit() {
    this.route.data.subscribe(
      
      data => {
        console.log(data)
         this.post = data.post
      }
    );
  }
}
