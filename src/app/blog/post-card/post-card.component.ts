import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IPost } from 'src/app/common/interfaces/post';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {

  @Input() post: IPost;
  @Output() deleteCardEvent = new EventEmitter();

  constructor(
    private readonly router: Router,
  ) { }

  ngOnInit() {}

  showPost(id: string): void {
    this.router.navigate([`/blog/post/${id}`]);
  }

  delete(id: string): void {
    this.deleteCardEvent.emit(id);
  }

  editPost(editedPost): void {
    this.post = editedPost;
  }
}

