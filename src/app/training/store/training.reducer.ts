import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
  props,
} from '@ngrx/store';

import { IExercise } from '../exercise.interface';
import * as fromRoot from '../../store/app.state';
import * as TrainingActions from './training.actions';

export interface TrainingState {
  availableExercises: IExercise[];
  finishedExercises: IExercise[];
  activeTraining: IExercise | null;
}

export interface State extends fromRoot.AppState {
  training: TrainingState;
}

const initialState: TrainingState = {
  availableExercises: [],
  finishedExercises: [],
  activeTraining: null,
};

export const trainingReducer = createReducer(
  initialState,

  on(TrainingActions.SET_AVAILABLE_TRAININGS, (state, { payload }) => ({
    ...state,
    availableExercises: payload,
  })),

  on(TrainingActions.SET_FINISHED_TRAININGS, (state, { payload }) => ({
    ...state,
    finishedExercises: payload,
  })),

  on(TrainingActions.START_TRAINING, (state, { payload }) => ({
    ...state,
    activeTraining: {
      ...state.availableExercises.find((ex) => {
        return ex.name == payload;
      })!,
    },
  })),

  on(TrainingActions.STOP_TRAINING, (state) => ({
    ...state,
    activeTraining: null,
  }))
);

export const getTrainingState =
  createFeatureSelector<TrainingState>('training');

export const getAvailableExercises = createSelector(
  getTrainingState,
  (state: TrainingState) => state.availableExercises
);
export const getFinishedExercises = createSelector(
  getTrainingState,
  (state: TrainingState) => state.finishedExercises
);
export const getActiveTraining = createSelector(
  getTrainingState,
  (state: TrainingState) => state.activeTraining
);
export const getIsTraining = createSelector(
  getTrainingState,
  (state: TrainingState) => state.activeTraining != null
);
