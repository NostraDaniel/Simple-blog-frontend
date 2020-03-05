import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificatorService } from './core/services/notificator.service';
import { AuthService } from './core/services/auth.services';
import { Router } from '@angular/router';
import { PostsService } from './core/services/posts.service';
import { IPost } from './common/interfaces/post';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private isLogged = false;
  private subscriptionAuth: Subscription;
  private subscriptionPosts: Subscription;
  public newestPosts: IPost[];
  public showMenu: boolean = false;

  constructor(
    private readonly notificator: NotificatorService,
    private readonly auth: AuthService,
    private readonly router: Router,
    private readonly postsService: PostsService
  ) {
  }

  ngOnInit() {
    this.subscriptionAuth = this.auth.user$.subscribe(
      username => {
        if (username === null) {
          this.isLogged = false;
        } else {
          this.isLogged = true;
        }
      }
    );

    this.subscriptionPosts = this.postsService.newestPosts$.subscribe(
      posts => {
        this.newestPosts = posts;
      }
    )
  }

  ngOnDestroy() {
    this.subscriptionAuth.unsubscribe();
    this.subscriptionPosts.unsubscribe();
  }

  toggleMobile() {
    this.showMenu = !this.showMenu;
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['home']);
    this.notificator.success(`You have logged out.`);
  }
}
