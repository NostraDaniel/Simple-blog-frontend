import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.services';
import { NotificatorService } from 'src/app/core/services/notificator.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private readonly auth: AuthService,
    private readonly notificator: NotificatorService,
    private readonly routed: Router,
  ) { }

  ngOnInit() {
  }

  triggerLogin(email: string, password: string) {
    this.auth.login(email, password).subscribe(
      (result: any) => {
        this.notificator.success(`Welcome, ${result.user.name}!`);
        this.routed.navigate(['home']);
      },
      error => this.notificator.error(error.message),
    );
  }

}
