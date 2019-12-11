import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificatorService } from './core/services/notificator.service';
import { AuthService } from './core/services/auth.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private isLogged = false;
  private subscription: Subscription;

  constructor(
    private readonly notificator: NotificatorService,
    private readonly auth: AuthService,
    private readonly router: Router,
  ) {
  }

  ngOnInit() {

    this.subscription = this.auth.user$.subscribe(
      username => {
        if (username === null) {
          this.isLogged = false;
        } else {
          this.isLogged = true;
        }
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['home']);
    this.notificator.success(`You have logged out.`);
  }
}
