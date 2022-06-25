import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { TrainingService } from '../training.service';
import { StopTrainingComponent } from './stop-training.component';
import * as fromTraining from '../store/training.reducer';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss'],
})
export class CurrentTrainingComponent implements OnInit {
  dialogRefSubcription$?: Subscription;
  progress = 0;
  timeSet: any;
  constructor(
    private dialog: MatDialog,
    private trainingService: TrainingService,
    private store: Store<fromTraining.State>
  ) {}

  ngOnInit(): void {
    this._startOrResumeTraining();
  }

  private _startOrResumeTraining() {
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe((ex) => {
      const step = (ex?.duration! / 100) * 1000;
      this.timeSet = setInterval(() => {
        this.progress += 1;
        if (this.progress >= 100) {
          this.trainingService.completeExercise();
          clearInterval(this.timeSet);
        }
      }, step);
    });
  }

  onStop() {
    clearInterval(this.timeSet);
    const dialogRef = this._openDialog();
    this._afterCloseDialog(dialogRef);
  }

  _openDialog() {
    return this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress,
      },
    });
  }

  _afterCloseDialog(dialogRef: MatDialogRef<StopTrainingComponent, any>) {
    this.dialogRefSubcription$ = dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.trainingService.canselExercise(this.progress);
      }
      if (!result) {
        this._startOrResumeTraining();
      }
      this.dialogRefSubcription$?.unsubscribe();
    });
  }
}
