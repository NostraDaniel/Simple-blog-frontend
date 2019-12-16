import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Output() searchEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  search(input) {
    this.searchEvent.emit(input.value.trim());
  }
}
