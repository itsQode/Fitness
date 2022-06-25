import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

import { UIService } from '../shared/ui.service';
import { TrainingService } from '../training/training.service';
import { IAuthData } from './auth.interface';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.state';
import * as UI from '../shared/ui.actions';
import * as Auth from './store/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private router: Router,
    private afauth: AngularFireAuth,
    private trainingService: TrainingService,
    private uiService: UIService,
    private store: Store<fromApp.AppState>
  ) {}

  initAuthListener() {
    this.afauth.authState.subscribe((user) => {
      if (user) {
        this.store.dispatch(Auth.SET_UID({payload:user.uid}))
        this._afterAuthSuccessfully();
      }
      if (!user) {
        this.store.dispatch(Auth.SET_UID({payload:'default'}))
        this.trainingService.canselSubscriptions();
        this.store.dispatch(Auth.SET_UNAUTHENTICATED());
        this._afterLogoutNavigate();
      }
    });
  }

  registerUser(authData: IAuthData) {
    this.store.dispatch(UI.START_LOADING());
    this.afauth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        this.store.dispatch(UI.STOP_LOADING());
      })
      .catch((err) => {
        this._handleError(err.message);
        this.store.dispatch(UI.STOP_LOADING());
      });
  }

  loginUser(authData: IAuthData) {
    this.store.dispatch(UI.START_LOADING());

    this.afauth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then((_res) => {
        this.store.dispatch(UI.STOP_LOADING());
      })
      .catch((err) => {
        this._handleError(err.message);
        this.store.dispatch(UI.STOP_LOADING());
      });
  }
  private _afterAuthSuccessfully() {
    this.router.navigate(['training']);
    this.store.dispatch(Auth.SET_AUTHENTICATED());
  }

  logOut() {
    this.afauth.signOut();
  }

  private _afterLogoutNavigate() {
    this.router.navigate(['/signin']);
  }

  private _handleError(error: string) {
    let errorMessage = 'خطایی رخ داده است';
    if (error.includes('email-already-in-use')) {
      errorMessage = 'این ایمیل قبلا ثبت شده است';
    }
    if (error.includes('invalid-email')) {
      errorMessage = 'ایمیل وارد شده معتبر نمیباشد';
    }
    if (error.includes('user-not-found') || error.includes('wrong-password')) {
      errorMessage = 'ایمیل یا پسورد وارد شده نامعتبر است';
    }
    this.uiService.showSnackBar(errorMessage, 'بستن', 5000);
  }
}
