import { NgStyle } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-loader',
  templateUrl: 'loader.html',
  imports: [NgStyle],
})
export class Loader {
  readonly dialogRef = inject(MatDialogRef<Loader>);

  onNoClick(): void {
    this.dialogRef.close();
  }
}
