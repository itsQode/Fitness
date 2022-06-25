import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';

import * as fromUi from '../shared/ui.reducer';
import * as fromAuth from '../auth/store/auth.reducer';

export interface AppState {
  ui: fromUi.State;
  auth: fromAuth.State;
}

export const reducers: ActionReducerMap<AppState> = {
  ui: fromUi.uiReducer,
  auth: fromAuth.authReducer,
};

// Ui Selectors
export const getUiState = createFeatureSelector<fromUi.State>('ui');

export const getIsLoading = createSelector(
  getUiState,
  (state: fromUi.State) => state.isLoading
);

// Auth Selectors
export const getAuthState = createFeatureSelector<fromAuth.State>('auth');

export const getIsAuth = createSelector(
  getAuthState,
  (state: fromAuth.State) => state.isAuthenticated
);
