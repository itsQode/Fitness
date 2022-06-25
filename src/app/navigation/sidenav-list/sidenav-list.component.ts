import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import { AuthService } from 'src/app/auth/auth.service';
import * as fromRoot from '../../store/app.state';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss'],
})
export class SidenavListComponent implements OnInit {
  @Output() closeSideNav = new EventEmitter<void>();
  isAuth$: Observable<boolean> = of(false);

  constructor(
    private authService: AuthService,
    private store: Store<fromRoot.AppState>
  ) {}

  ngOnInit(): void {
    this.isAuth$ = this.store.select(fromRoot.getIsAuth);
  }

  onCloseSideNav() {
    this.closeSideNav.emit();
  }
  onLogout() {
    this.authService.logOut();
    this.onCloseSideNav();
  }
}
