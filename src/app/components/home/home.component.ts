import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/core/services/posts.service';
import { IPost } from 'src/app/common/interfaces/post';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  frontPagePosts: IPost[] = [];

  constructor(
    private readonly postsService: PostsService 
  ) { }

  ngOnInit() {
    this.postsService.getFrontPagePosts().subscribe(posts => {
      this.frontPagePosts = posts;
    });
  }
}
