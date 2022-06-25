import { createReducer, on } from '@ngrx/store';

import * as AuthActions from './auth.actions';

export interface State {
  isAuthenticated: boolean;
  uid: string;
}

const initialState: State = {
  isAuthenticated: false,
  uid: 'default',
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.SET_AUTHENTICATED, (state) => ({
    ...state,
    isAuthenticated: true,
  })),
  on(AuthActions.SET_UNAUTHENTICATED, (state) => ({
    ...state,
    isAuthenticated: false,
  })),
  on(
    AuthActions.SET_UID,
    (state,{payload}) => ({...state,uid:payload})
  )
);
