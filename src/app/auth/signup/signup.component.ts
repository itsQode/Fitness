import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

import { UIService } from 'src/app/shared/ui.service';
import { AuthService } from '../auth.service';
import * as fromRoot from '../../store/app.state'
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  maxDate?: Date;
  isLoading$!: Observable<boolean> ;

  constructor(private authService: AuthService, private uiService: UIService,private store:Store<fromRoot.AppState>) {}

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading)
  }

  onSubmit(form: NgForm) {
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password,
    });
  }
}
