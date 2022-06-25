import { EventEmitter, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class UIService {
  constructor(private matSnackBar: MatSnackBar) {}
  loadingStateChanged = new EventEmitter<boolean>();

  showSnackBar(message: string, action: string | undefined, duration: number) {
    this.matSnackBar.open(message, action, {
      duration,
    });
  }
}
