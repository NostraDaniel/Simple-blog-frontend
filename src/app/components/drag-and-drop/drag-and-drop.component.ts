import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.scss']
})
export class DragAndDropComponent implements OnInit {

  @Output() public filesEvent = new EventEmitter<any[]>();
  public files: any[] = [];

  constructor() { }

  ngOnInit() {
  }

  uploadFile(event) {
    for (let index = 0; index < event.length; index++) {
      const element = event[index];
      this.files.push(element)
    }
    console.log(this.files);
    this.filesEvent.emit(this.files);
  }

  deleteAttachment(index) {
    this.files.splice(index, 1);

    this.filesEvent.emit(this.files);
  }
}
