import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';

import { IExercise } from '../exercise.interface';
import { TrainingService } from '../training.service';
import * as fromTraining from '../store/training.reducer';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.scss'],
})
export class PastTrainingComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<IExercise>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) matPaginator!: MatPaginator;
  displayedColumns: string[] = [
    'date',
    'name',
    'duration',
    'calories',
    'state',
  ];

  constructor(
    private trainingServiec: TrainingService,
    private store: Store<fromTraining.State>
  ) {}

  ngOnInit(): void {
    this.store
      .select(fromTraining.getFinishedExercises)
      .subscribe((exercises: IExercise[]) => {
        this.dataSource.data = exercises;
      });
    this.trainingServiec.fetchCompletedOrCancelledExercises();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.matPaginator._intl.itemsPerPageLabel = 'تعداد ردیف';
    this.matPaginator._intl.lastPageLabel = 'صفحه قبل';
    this.matPaginator._intl.previousPageLabel = 'صفحه قبل';
    this.matPaginator._intl.nextPageLabel = 'صفحه بعد';
    this.dataSource.paginator = this.matPaginator;
  }

  doFilterTableData(event: any) {
    this.dataSource.filter = event.target.value.trim().toLowerCase();
  }
}
