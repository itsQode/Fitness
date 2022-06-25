import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import { IExercise } from '../exercise.interface';
import { TrainingService } from '../training.service';
import * as fromTraining from '../store/training.reducer';
import * as fromRoot from '../../store/app.state';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss'],
})
export class NewTrainingComponent implements OnInit {
  availableExercises$: Observable<IExercise[]> = of([]);
  isLoading$?: Observable<boolean>;

  constructor(
    private trainingService: TrainingService,
    private store: Store<fromTraining.State>
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.availableExercises$ = this.store.select(
      fromTraining.getAvailableExercises
    );
    this.fetchExercises();
  }

  fetchExercises() {
    this.trainingService.fetchExercises();
  }

  onFetchExercises() {
    this.fetchExercises();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }
}
