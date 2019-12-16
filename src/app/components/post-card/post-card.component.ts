import { Component, OnInit, Input, Inject } from '@angular/core';
import { IPost } from 'src/app/common/interfaces/post';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EditPostDialogComponent } from 'src/app/blog/edit-post-dialog/edit-post-dialog.component';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {

  @Input() post: IPost;

  constructor(
    private readonly router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    console.log(this.post);
  }

  showPost(id: string): void {
    this.router.navigate([`/blog/post/${id}`]);
  }

  editPost(post: IPost): void {
    const dialogRef = this.dialog.open(EditPostDialogComponent, {
      width: '350px',
      height: '350px',
      data: {name: 'Dani', animal: 'Maimuna'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }
}

