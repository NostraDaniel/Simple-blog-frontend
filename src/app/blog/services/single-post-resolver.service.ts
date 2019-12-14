import { Injectable } from '@angular/core';
import { PostsService } from 'src/app/core/services/posts.service';
import { NotificatorService } from 'src/app/core/services/notificator.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SinglePostResolverService {

  constructor(
    private readonly postsService: PostsService,
    private readonly notificator: NotificatorService
  ) { }

  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    return this.postsService.getSinglePost(route.params.id)
      .pipe(catchError(res => {
        this.notificator.error(res.error.error);
        return of ({post: {}});
      }
      ))
  }
}
