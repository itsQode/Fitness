import {
  Component,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import { AuthService } from 'src/app/auth/auth.service';
import * as fromRoot from '../../store/app.state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() toggleSideNav = new EventEmitter<void>();
  isAuth$ : Observable<boolean> = of(false);
  constructor(
    private authService: AuthService,
    private store: Store<fromRoot.AppState>
  ) {}

  ngOnInit(): void {
   this.isAuth$ = this.store.select(fromRoot.getIsAuth)
  }

  onToggleSideNav() {
    this.toggleSideNav.emit();
  }

  onLogout() {
    this.authService.logOut();
  }

}
