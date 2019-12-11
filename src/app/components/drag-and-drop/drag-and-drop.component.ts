import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.scss']
})
export class DragAndDropComponent implements OnInit {

  @Output() filesEvent = new EventEmitter<any[]>();
  files: any[] = [];

  constructor() { }

  ngOnInit() {
  }

  uploadFile(event) {
    for (let index = 0; index < event.length; index++) {
      const element = event[index];
      this.files.push(element)
    }

    this.filesEvent.emit(this.files);
  }

  deleteAttachment(index) {
    this.files.splice(index, 1);

    this.filesEvent.emit(this.files);
  }
}
