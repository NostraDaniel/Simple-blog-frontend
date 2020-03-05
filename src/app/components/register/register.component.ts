import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.services';
import { NotificatorService } from 'src/app/core/services/notificator.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private readonly auth: AuthService,
    private readonly notificator: NotificatorService,
    private readonly router: Router,
  ) { }

  ngOnInit() {
  }

  register(name: string, email: string, password: string) {
    this.auth.register(name, email, password).subscribe(
      result => {
        this.auth.login(email, password).subscribe(
          response => {
            this.notificator.success(`Welcome, ${response.user.name}!`);
            this.router.navigate(['home']);
          },
          error => this.notificator.error('There was problem logging you in!'),
        );
      },
      error => {
        this.notificator.error(error.error);
      },
    );
  }

}
