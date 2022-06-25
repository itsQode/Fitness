import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import * as fromRoot from '../store/app.state';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    private store: Store<fromRoot.AppState>,
    private router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.store.select(fromRoot.getIsAuth).pipe(
      take(1),
      map((auth) => {
        if (auth) {
          return true;
        } else {
          return this.router.createUrlTree(['/signin']);
        }
      })
    );
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.store.select(fromRoot.getIsAuth).pipe(
      take(1),
      map((auth) => {
        if (auth) {
          return true;
        } else {
          return this.router.createUrlTree(['/signin']);
        }
      })
    );
  }
}
