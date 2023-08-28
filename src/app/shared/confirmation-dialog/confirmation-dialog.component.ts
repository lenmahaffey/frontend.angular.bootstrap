import { Component, Inject, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogOptions } from './confirmation-dialog-options';
import { Subject } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent {

  constructor(private dialogRef: MatDialogRef<ConfirmationDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ConfirmationDialogOptions)
  {}
  @Output() response: Subject<boolean | null> = new Subject()

  onKeyDown(event: any)
  {
    if (event.key === "Escape") {
      this.response.next(null)
    }
  }
  yes(){
    this.response.next(true);
  }

  no(){
    this.response.next(false);
  }

  dismiss(){
    this.response.next(null);
  }
}
