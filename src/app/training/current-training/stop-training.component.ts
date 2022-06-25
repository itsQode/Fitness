import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-stop-training',
  template: `
    <h1 mat-dialog-title dir="rtl">مطمئنی؟</h1>
    <mat-dialog-content dir="rtl">
      <p>{{ passedData.progress }}% تمرین رو پیش بردی!</p>
    </mat-dialog-content>
    <mat-dialog-actions dir="rtl">
      <button mat-icon-button [mat-dialog-close]="false">ادامه</button>
      <button mat-icon-button [mat-dialog-close]="true">آره</button>
    </mat-dialog-actions>
  `,
})
export class StopTrainingComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public passedData: any) {}
}
