import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input()
  public loggedIn;

  @Output() public logout = new EventEmitter<undefined>();
  
  constructor() { }

  ngOnInit() {
  }

  triggerLogout() {
    this.logout.emit();
  }
}
