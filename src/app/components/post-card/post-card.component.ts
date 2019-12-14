import { Component, OnInit, Input } from '@angular/core';
import { IPost } from 'src/app/common/interfaces/post';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {

  @Input() post: IPost;

  constructor(
    private readonly router: Router
  ) { }

  ngOnInit() {
  }

  showPost(id: string): void {
    console.log(id);
    this.router.navigate([`/blog/${id}`]);
  }
}
