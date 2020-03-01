import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { IImage } from 'src/app/common/interfaces/image';

@Component({
  selector: 'app-drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.scss']
})
export class DragAndDropComponent implements OnInit {

  @Output() public filesEvent = new EventEmitter<any[]>();
  @Output() public deletedImgEvent = new EventEmitter< IImage[]>();
  @Input() public galleryFilesEdit: IImage[] = [];
  public files: any[] = [];
  public imgPreviewArr: any[] = [];
  private deletedImg: IImage[] = [];

  constructor() { }

  ngOnInit() {
    this.imgPreviewArr = this.galleryFilesEdit.map(img =>  img.src);
    this.files = this.galleryFilesEdit;
  }

  uploadFile(event) {

    for (let index = 0; index < event.length; index++) {
      const el = event[index];
      const reader = new FileReader();

      this.files.push(el);

      reader.readAsDataURL(el);
      reader.onload = (_event) => {
        this.imgPreviewArr.push(reader.result);
      };
    }

    this.filesEvent.emit(this.files);
  }

  deleteAttachment(index) {
    const deleted = this.files.splice(index, 1);
    this.imgPreviewArr.splice(index, 1);

    if(deleted[0].hasOwnProperty('id')) {
      this.deletedImg.push(deleted[0]);
    }

    this.deletedImgEvent.emit(this.deletedImg);
    this.filesEvent.emit(this.files);
  }
}
