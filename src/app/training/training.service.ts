import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { props, Store } from '@ngrx/store';
import { Subject, Subscription } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { UIService } from '../shared/ui.service';
import { IExercise } from './exercise.interface';
import * as fromTraining from './store/training.reducer';
import * as UI from '../shared/ui.actions';
import * as Training from './store/training.actions';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  fsSubscriptions$?: Subscription[] = [];

  constructor(
    private dataBase: AngularFirestore,
    private uiService: UIService,
    private store: Store<fromTraining.State>
  ) {}

  fetchExercises() {
    this.store.dispatch(UI.START_LOADING());
    this.fsSubscriptions$?.push(
      this.dataBase
        .collection<IExercise>('availableExercises')
        .snapshotChanges()
        .pipe(
          map((docArray) => {
            return docArray.map((mock) => {
              return {
                ...mock.payload.doc.data(),
                id: mock.payload.doc['id'],
              };
            });
          })
        )
        .subscribe(
          (payload: IExercise[]) => {
            this.store.dispatch(UI.STOP_LOADING());
            this.store.dispatch(Training.SET_AVAILABLE_TRAININGS({ payload }));
          },
          (_err) => {
            this.store.dispatch(UI.STOP_LOADING());
            this.uiService.showSnackBar(
              'خطایی رخ داده لطفا مجدداً امتحان کنید',
              'باشه',
              5000
            );
          }
        )
    );
  }

  startExercise(selectedId: string) {
    console.log(selectedId);
    this.store.dispatch(Training.START_TRAINING({ payload: selectedId }));
  }

  completeExercise() {
    this.store
      .select(fromTraining.getActiveTraining)
      .pipe(take(1))
      .subscribe((ex) => {
        this._addDataToDatabase({
          ...ex!,
          date: new Date(),
          state: 'کامل شده',
        });
        this.store.dispatch(Training.STOP_TRAINING());
      });
  }

  canselExercise(progress: number) {
    this.store
      .select(fromTraining.getActiveTraining)
      .pipe(take(1))
      .subscribe((ex) => {
        this._addDataToDatabase({
          ...ex!,
          date: new Date(),
          state: 'انصراف',
          calories: ex?.calories! * (progress / 100),
          duration: ex?.duration! * (progress / 100),
        });
        this.store.dispatch(Training.STOP_TRAINING());
      });
  }

  private _addDataToDatabase(exercise: IExercise) {
    this.store
      .pipe(
        map((state) => state.auth.uid),
        take(1)
      )
      .subscribe((uid) => {
        console.log(exercise);
        this.dataBase.collection('finishedExercises-' + uid).add(exercise);
      });
  }

  fetchCompletedOrCancelledExercises() {
    this.fsSubscriptions$?.push(
      this.store
        .pipe(
          take(1),
          map((state) => state.auth.uid),
          switchMap((uid) => {
            return this.dataBase
              .collection('finishedExercises-' + uid)
              .valueChanges();
          })
        )
        .subscribe((exercises: any[]) => {
          this.store.dispatch(
            Training.SET_FINISHED_TRAININGS({ payload: exercises })
          );
        })
    );
  }

  canselSubscriptions() {
    this.fsSubscriptions$?.forEach((sub) => sub.unsubscribe());
  }
}
