import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromTraining from './store/training.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss'],
})
export class TrainingComponent implements OnInit {
  isTraining$!: Observable<boolean>;

  constructor(private store: Store<fromTraining.State>) {}

  ngOnInit(): void {
    this.isTraining$ = this.store.select(fromTraining.getIsTraining);
  }
}
