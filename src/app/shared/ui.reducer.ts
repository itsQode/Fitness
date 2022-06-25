import { createReducer, on } from '@ngrx/store';

import * as authActions from './ui.actions';

export interface State {
  isLoading: boolean;
}

export const initialState: State = {
  isLoading: false,
};

export const uiReducer = createReducer(
  initialState,
  on(authActions.START_LOADING, (state) => ({ ...state, isLoading: true })),
  on(authActions.STOP_LOADING, (state) => ({ ...state, isLoading: false }))
);
