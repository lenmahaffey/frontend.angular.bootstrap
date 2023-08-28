import { Component, Inject } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { SpinnerOptions } from 'src/app/shared/spinner/SpinnerOptions';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {

  color: ThemePalette = 'accent';
  mode: ProgressSpinnerMode = 'determinate';
  value = 50;
  message = "Spinning"

  constructor(private dialogRef: MatDialogRef<SpinnerComponent>,
    @Inject(MAT_DIALOG_DATA) private data: SpinnerOptions)
  {
      this.message = data.message
  }

  closeDialog(): void {
    this.dialogRef.close()
  }
}
