import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { PostsService } from 'src/app/core/services/posts.service';
import { NotificatorService } from 'src/app/core/services/notificator.service';
// import { NotificatorService } from 'src/app/core/services/notificator.service';
// import { Post } from 'src/app/common/interfaces/post';
// import { PostsService } from 'src/app/core/services/posts.service';

@Injectable()
export class PostsResolverService implements Resolve<{posts: any[]}> {

  constructor(
    private readonly postsService: PostsService,
    private readonly notificator: NotificatorService,
    ) { }

  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ) {
    return this.postsService.getAllPosts()
      .pipe(catchError(
        res => {
          // todo: add notification if error
          // Alternativle, if the res.error.code === 401, you can logout the user and redirect to /home
          return of({posts: []});
        }
      ),);
  }
}
