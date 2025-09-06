import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Common {

  private sharedData = new BehaviorSubject<any>(null);
  sharedData$ = this.sharedData.asObservable();
  IsUserSignedIn:boolean = false;

  constructor(private snackBar: MatSnackBar) {}


  setSharedData(data: any) {
    this.sharedData.next(data);
  }

 
  showSuccess(message: string, duration: number = 3000) {
    this.snackBar.open(message, 'Close', {
      duration,
      panelClass: ['snackbar-success']
    });
  }

  showError(message: string, duration: number = 3000) {
    this.snackBar.open(message, 'Close', {
      duration,
      panelClass: ['snackbar-error']
    });
  }

  showInfo(message: string, duration: number = 3000) {
    this.snackBar.open(message, 'Close', {
      duration,
      panelClass: ['snackbar-info']
    });
  }
}
