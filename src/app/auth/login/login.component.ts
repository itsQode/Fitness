import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AuthService } from '../auth.service';
import * as fromRoot from '../../store/app.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading$?: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private store: Store<fromRoot.AppState>
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);

    this.loginForm = new FormGroup({
      userData: new FormGroup({
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, {
          validators: [Validators.required, Validators.minLength(6)],
        }),
      }),
    });
  }

  onSubmit() {
    this.authService.loginUser({
      email: this.loginForm.value.userData.email,
      password: this.loginForm.value.userData.password,
    });
  }
}
