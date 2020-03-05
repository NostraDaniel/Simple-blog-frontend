import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { IPost } from 'src/app/common/interfaces/post';
import { EditPostDialogComponent } from '../edit-post-dialog/edit-post-dialog.component';

@Component({
  selector: 'app-post-options',
  templateUrl: './post-options.component.html',
  styleUrls: ['./post-options.component.scss']
})
export class PostOptionsComponent {

  @Input() post: IPost;
  @Output() public deleteOptionEvent: EventEmitter<any> = new EventEmitter();
  @Output() public editPostEvent: EventEmitter<any> = new EventEmitter();

  constructor(
    public dialog: MatDialog
    ) { }

  editPost(post: IPost): void {
    const dialogRef = this.dialog.open(EditPostDialogComponent, {
      width: '600px',
      height: '780px',
      data: this.post
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!result) {
        return;
      }

      this.editPostEvent.emit(result);
    });
  }

  delete(id: string) {
    this.deleteOptionEvent.emit(id);
  }
}
